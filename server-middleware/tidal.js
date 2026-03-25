const https = require('https')
const { URL, URLSearchParams } = require('url')

/**
 * Makes an HTTPS request and returns parsed JSON.
 * @param {string} method
 * @param {string} url
 * @param {Record<string, string>} headers
 * @param {string|null} body
 * @returns {Promise<{status: number, data: unknown}>}
 */
function httpsRequest(method, url, headers = {}, body = null) {
    return new Promise((resolve, reject) => {
        const parsed = new URL(url)
        const options = {
            hostname: parsed.hostname,
            port: parsed.port || 443,
            path: parsed.pathname + parsed.search,
            method,
            headers: {
                ...headers,
            },
        }

        if (body) {
            options.headers['Content-Length'] = Buffer.byteLength(body)
        }

        const req = https.request(options, (res) => {
            let raw = ''
            res.on('data', (chunk) => { raw += chunk })
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(raw) })
                } catch {
                    resolve({ status: res.statusCode, data: raw })
                }
            })
        })

        req.on('error', reject)

        if (body) {
            req.write(body)
        }
        req.end()
    })
}

/**
 * Reads JSON body from an incoming request.
 * @param {import('http').IncomingMessage} req
 * @returns {Promise<unknown>}
 */
function readBody(req) {
    return new Promise((resolve, reject) => {
        let raw = ''
        req.on('data', (chunk) => { raw += chunk })
        req.on('end', () => {
            try {
                resolve(JSON.parse(raw))
            } catch {
                resolve({})
            }
        })
        req.on('error', reject)
    })
}

/**
 * Tidal API server middleware.
 * Proxies Tidal OAuth token exchange and API calls to keep credentials server-side.
 *
 * Routes:
 *   POST /api/tidal/token      — Exchange PKCE auth code for access token
 *   GET  /api/tidal/playlists  — Fetch the authenticated user's playlists
 *   GET  /api/tidal/playlists/:id/tracks — Fetch tracks for a playlist
 */
module.exports = async function tidalMiddleware(req, res, next) {
    const TIDAL_CLIENT_ID = process.env.TIDAL_CLIENT_ID
    const TIDAL_CLIENT_SECRET = process.env.TIDAL_CLIENT_SECRET

    res.setHeader('Content-Type', 'application/json')

    // POST /api/tidal/token
    if (req.method === 'POST' && req.url === '/token') {
        if (!TIDAL_CLIENT_ID || !TIDAL_CLIENT_SECRET) {
            res.statusCode = 500
            return res.end(JSON.stringify({ error: 'TIDAL_CLIENT_ID or TIDAL_CLIENT_SECRET not configured' }))
        }

        const body = await readBody(req)
        const { code, codeVerifier, redirectUri } = body

        if (!code || !codeVerifier || !redirectUri) {
            res.statusCode = 400
            return res.end(JSON.stringify({ error: 'code, codeVerifier and redirectUri are required' }))
        }

        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
            client_id: TIDAL_CLIENT_ID,
        })

        const credentials = Buffer.from(`${TIDAL_CLIENT_ID}:${TIDAL_CLIENT_SECRET}`).toString('base64')

        try {
            const result = await httpsRequest(
                'POST',
                'https://auth.tidal.com/v1/oauth2/token',
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${credentials}`,
                },
                params.toString()
            )
            res.statusCode = result.status
            return res.end(JSON.stringify(result.data))
        } catch (error) {
            res.statusCode = 500
            return res.end(JSON.stringify({ error: 'Failed to exchange token', details: error.message }))
        }
    }

    // GET /api/tidal/playlists
    if (req.method === 'GET' && req.url.startsWith('/playlists')) {
        const accessToken = (req.headers.authorization || '').replace('Bearer ', '')
        if (!accessToken) {
            res.statusCode = 401
            return res.end(JSON.stringify({ error: 'Authorization header required' }))
        }

        const parsedUrl = new URL(`https://x.com${req.url}`)
        const pathParts = parsedUrl.pathname.split('/')
        // /playlists/:id/tracks
        if (pathParts.length === 4 && pathParts[3] === 'tracks') {
            const playlistId = pathParts[2]
            const countryCode = parsedUrl.searchParams.get('countryCode') || 'US'

            try {
                const result = await httpsRequest(
                    'GET',
                    `https://api.tidal.com/v1/playlists/${playlistId}/tracks?limit=50&countryCode=${countryCode}`,
                    { Authorization: `Bearer ${accessToken}` }
                )
                res.statusCode = result.status
                return res.end(JSON.stringify(result.data))
            } catch (error) {
                res.statusCode = 500
                return res.end(JSON.stringify({ error: 'Failed to fetch tracks', details: error.message }))
            }
        }

        // /playlists — get user's playlists
        const userId = parsedUrl.searchParams.get('userId')
        const countryCode = parsedUrl.searchParams.get('countryCode') || 'US'

        if (!userId) {
            res.statusCode = 400
            return res.end(JSON.stringify({ error: 'userId query param is required' }))
        }

        try {
            const result = await httpsRequest(
                'GET',
                `https://api.tidal.com/v1/users/${userId}/playlists?limit=50&countryCode=${countryCode}`,
                { Authorization: `Bearer ${accessToken}` }
            )
            res.statusCode = result.status
            return res.end(JSON.stringify(result.data))
        } catch (error) {
            res.statusCode = 500
            return res.end(JSON.stringify({ error: 'Failed to fetch playlists', details: error.message }))
        }
    }

    next()
}
