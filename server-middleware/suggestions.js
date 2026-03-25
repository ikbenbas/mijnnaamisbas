const https = require('https')
const { URL } = require('url')

/**
 * Makes an HTTPS POST request and returns parsed JSON.
 * @param {string} url
 * @param {Record<string, string>} headers
 * @param {string} body
 * @returns {Promise<{status: number, data: unknown}>}
 */
function httpsPost(url, headers, body) {
    return new Promise((resolve, reject) => {
        const parsed = new URL(url)
        const options = {
            hostname: parsed.hostname,
            port: parsed.port || 443,
            path: parsed.pathname + parsed.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body),
                ...headers,
            },
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
        req.write(body)
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
 * AI Suggestions server middleware.
 * Proxies requests to the OpenAI Chat Completions API to keep the API key server-side.
 *
 * Routes:
 *   POST /api/suggestions — Generate playlist suggestions from playlist context + user prompt
 *
 * Request body:
 *   {
 *     prompt: string,           // User's requirements, e.g. "post hardcore bands"
 *     playlists: TidalPlaylist[], // User's existing playlists
 *     tracks: TidalTrack[],     // Tracks from user's playlists (for taste analysis)
 *   }
 */
module.exports = async function suggestionsMiddleware(req, res, next) {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY

    res.setHeader('Content-Type', 'application/json')

    if (req.method !== 'POST') {
        return next()
    }

    if (!OPENAI_API_KEY) {
        res.statusCode = 500
        return res.end(JSON.stringify({ error: 'OPENAI_API_KEY not configured' }))
    }

    const body = await readBody(req)
    const { prompt, playlists = [], tracks = [] } = body

    if (!prompt) {
        res.statusCode = 400
        return res.end(JSON.stringify({ error: 'prompt is required' }))
    }

    // Build context from user's playlists and tracks
    const playlistContext = playlists
        .map((p) => `- "${p.title}" (${p.numberOfTracks} tracks)`)
        .join('\n')

    const artistCounts = {}
    tracks.forEach((track) => {
        track.artists?.forEach((artist) => {
            artistCounts[artist.name] = (artistCounts[artist.name] || 0) + 1
        })
    })

    const topArtists = Object.entries(artistCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 30)
        .map(([name, count]) => `${name} (${count} tracks)`)
        .join(', ')

    const systemMessage = [
        'You are a music expert and playlist curator.',
        "You analyze a user's Tidal music library to understand their taste, then suggest personalized playlists.",
        'Respond ONLY with a valid JSON object — no markdown, no prose, no extra text.',
    ].join('\n')

    const userMessage = `Here is information about my music library on Tidal:

My playlists:
${playlistContext || '(No playlists available)'}

My most-listened artists (based on playlist tracks):
${topArtists || '(No track data available)'}

Please suggest a playlist based on this requirement: "${prompt}"

Return a JSON object with this exact structure:
{
  "name": "Playlist name",
  "description": "A short description of the playlist",
  "reasoning": "Why this playlist suits my taste based on my library",
  "tracks": [
    {
      "title": "Song title",
      "artist": "Artist name",
      "album": "Album name (optional)",
      "reason": "Why this track fits (optional)"
    }
  ]
}

Include 10-15 track suggestions. Mix tracks from artists already in my library with new discoveries that match my taste and the requirements.`

    const requestBody = JSON.stringify({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 2000,
    })

    try {
        const result = await httpsPost(
            'https://api.openai.com/v1/chat/completions',
            { Authorization: `Bearer ${OPENAI_API_KEY}` },
            requestBody
        )

        if (result.status !== 200) {
            res.statusCode = result.status
            return res.end(JSON.stringify({ error: 'OpenAI API error', details: result.data }))
        }

        const content = result.data?.choices?.[0]?.message?.content
        if (!content) {
            res.statusCode = 500
            return res.end(JSON.stringify({ error: 'Empty response from OpenAI' }))
        }

        let suggestion
        try {
            suggestion = JSON.parse(content)
        } catch {
            res.statusCode = 500
            return res.end(JSON.stringify({ error: 'Failed to parse OpenAI response as JSON', raw: content }))
        }

        res.statusCode = 200
        return res.end(JSON.stringify(suggestion))
    } catch (error) {
        res.statusCode = 500
        return res.end(JSON.stringify({ error: 'Failed to call OpenAI API', details: error.message }))
    }
}
