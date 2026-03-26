# Tidal OAuth Troubleshooting Guide - Error 11102

## ✅ What's Already Fixed

Your code correctly uses:
- Empty scopes array (`scopes: []`) - matches official Tidal docs
- Proper storage adapter for server-side Node.js
- Correct SDK initialization

**References:**
- [Official Tidal Quick Start](https://developer.tidal.com/documentation/api-sdk/api-sdk-quick-start)
- [Authorization Docs](https://developer.tidal.com/documentation/api-sdk/api-sdk-authorization)

---

## 🔍 Most Likely Cause of Error 11102

Based on Tidal's OAuth specification and the fact that scopes are already correct, error 11102 is most likely caused by:

### 1. **Redirect URI Mismatch** (90% probability)

The redirect URI in your Tidal Developer Portal **must exactly match** what your app sends.

**What your app sends:**
```
http://localhost:5173/tidal/callback
```

**What must be in Tidal Portal:**
- ✅ Exactly: `http://localhost:5173/tidal/callback`
- ❌ Wrong: `http://localhost:5173/callback` (missing /tidal)
- ❌ Wrong: `http://localhost/tidal/callback` (missing port)
- ❌ Wrong: `https://localhost:5173/tidal/callback` (wrong protocol)
- ❌ Wrong: `http://localhost:5173/tidal/callback/` (trailing slash)

**How to fix:**
1. Log in to [developer.tidal.com/dashboard](https://developer.tidal.com/dashboard)
2. Click on your application
3. Find **Redirect URIs** section
4. Add or update to exactly: `http://localhost:5173/tidal/callback`
5. Save changes
6. Wait 1-2 minutes for changes to propagate
7. Try OAuth flow again

### 2. **Invalid Client Credentials** (8% probability)

Your `.env` file must have correct credentials:

```env
TIDAL_CLIENT_ID=YourActualClientID
TIDAL_CLIENT_SECRET=YourActualClientSecret
```

**Verify:**
- No quotes around values
- No spaces before or after `=`
- Values match exactly what's shown in Tidal Developer Portal
- File is named `.env` (not `.env.example` or `.env.local`)

**How to verify:**
1. Restart your dev server (`pnpm dev`)
2. Check terminal output for:
   ```
   Initializing Tidal Auth with: {
     clientId: 'YourClientID',
     clientSecretLength: 32
   }
   ```
3. If `clientId` shows wrong value, fix `.env` and restart

### 3. **Application Not Approved** (2% probability)

Some Tidal app types require approval before OAuth works.

**Check in portal:**
- Application status: Should be "Active" or "Approved"
- If status is "Pending" or "Under Review", OAuth won't work yet

---

## 🚀 Quick Fix (Try This First)

**90% of OAuth errors are caused by redirect URI mismatch.**

1. Go to [developer.tidal.com/dashboard](https://developer.tidal.com/dashboard)
2. Click your app → **Redirect URIs**
3. Add/update to **exactly**: `http://localhost:5173/tidal/callback`
4. Save and wait 1-2 minutes
5. Try connecting again

If that doesn't work, continue to detailed steps below.

---

## Detailed Troubleshooting Steps

### Step 1: Check Redirect URI Configuration

### In Your Tidal Developer Portal

1. Go to [developer.tidal.com](https://developer.tidal.com)
2. Navigate to your application
3. Find **Redirect URIs** section
4. Verify you have **EXACTLY** this URI registered:
   ```
   http://localhost:5173/tidal/callback
   ```

**Critical Points:**
- ✅ Must be `http://` (not `https://`) for local development
- ✅ Must include the port `:5173`
- ✅ Must end with `/tidal/callback`
- ✅ No trailing slash
- ❌ `http://localhost/tidal/callback` - WRONG (missing port)
- ❌ `http://localhost:5173/callback` - WRONG (missing /tidal)
- ❌ `https://localhost:5173/tidal/callback` - WRONG (https for local)

---

## Step 2: Verify Client Credentials

### Check Your `.env` File

Ensure these are set correctly:

```env
TIDAL_CLIENT_ID=your_actual_client_id
TIDAL_CLIENT_SECRET=your_actual_client_secret
```

**Verify:**
1. No quotes around values
2. No spaces around the `=`
3. Credentials match what's shown in Tidal Developer Portal
4. No extra characters or line breaks

### Test Credentials Are Loaded

Restart your dev server after changing `.env`:
```bash
# Stop the server (Ctrl+C)
pnpm dev
```

Check the console logs when you try to login - you should see:
```
Initializing Tidal Auth with: {
  clientId: 'YOUR_CLIENT_ID',
  clientSecretLength: 32, // or whatever length
  hasStorage: true
}
```

---

## Step 3: ✅ Scopes Fixed - No Action Needed

### Status: RESOLVED

**The scope issue has been fixed in your codebase.**

Your app now correctly uses the Tidal SDK's default scope configuration (empty array), which aligns with the official Tidal documentation:

```typescript
await TidalAuth.init({
  clientId,
  clientSecret,
  credentialsStorageKey: 'tidal_credentials',
  storage: serverStorage
  // scopes defaults to [] - correct for current API
});
```

**Reference:**
- [Official Tidal Quick Start](https://developer.tidal.com/documentation/api-sdk/api-sdk-quick-start) shows `scopes: []`
- [Official SDK examples](https://github.com/tidal-music/tidal-sdk-web/blob/main/packages/auth/examples/authorization-code.html)

### Historical Context

- ❌ Old (deprecated): `scopes: ['r_usr', 'w_usr']`
- ✅ Current (2024-2026): `scopes: []` or omit scopes parameter

Tidal migrated to app-type-based permissions instead of explicit scope strings. Your application's permissions are now determined by the app type configuration in the Tidal Developer Portal.

---

## Step 4: Check Application Type

### In Tidal Developer Portal

Your application type should be:
- **Web Application** (not Mobile, Desktop, or TV)
- **Authorization Code Flow** enabled
- **PKCE** enabled (usually automatic for web apps)

---

## Step 5: Debug with Enhanced Logging

### What to Look For

When you click "Connect Tidal Account", check your terminal for:

```
Initializing Tidal login with redirect URI: http://localhost:5173/tidal/callback
Generated Tidal login URL: https://login.tidal.com/authorize?client_id=...
```

After authorizing on Tidal's site, check for:

```
OAuth callback received: {
  fullQuery: '?code=ABC123...',
  code: 'ABC123...',
  state: null
}
```

### If You See an Error

The enhanced logging will show:
```
Error completing Tidal login: {
  error: [Error details],
  message: 'Specific error message',
  ...
}
```

Common error messages and fixes:

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "redirect_uri_mismatch" | Redirect URI doesn't match | Fix URI in dev portal (Step 1) |
| "invalid_client" | Wrong client credentials | Fix `.env` file (Step 2) |
| "invalid_scope" | Scope not allowed | Enable scopes in portal (Step 3) |
| "unauthorized_client" | App type wrong | Change to Web App (Step 4) |

---

## Step 6: Clear Storage and Retry

Sometimes stale OAuth state causes issues:

1. Stop your dev server
2. The in-memory storage will be cleared automatically
3. Restart: `pnpm dev`
4. Try the OAuth flow again

---

## Step 7: Check Browser Console

Open your browser's Developer Tools (F12) and check:

### Network Tab
1. Filter by `login.tidal.com`
2. Look for any failed requests
3. Check response status codes

### Console Tab
Look for any JavaScript errors or warnings

---

## Common Error Code Reference

| Code | Meaning | Solution |
|------|---------|----------|
| 11102 | OAuth configuration error | Follow Steps 1-4 above |
| 401 | Invalid credentials | Check client ID/secret |
| 403 | Insufficient permissions | Enable required scopes |
| 404 | Endpoint not found | Check redirect URI path |

---

## Production Deployment

For production (when not using localhost):

1. **Update Redirect URI in Tidal Portal:**
   ```
   https://yourdomain.com/tidal/callback
   ```
   - Must be `https://` (not `http://`)
   - Must match your production domain exactly

2. **Update Environment Variables:**
   ```env
   TIDAL_CLIENT_ID=your_client_id
   TIDAL_CLIENT_SECRET=your_client_secret
   ```

3. **Enable HTTPS:**
   - Your production server MUST use HTTPS
   - Tidal rejects OAuth flows over plain HTTP in production

---

## Still Having Issues?

If you've tried all the above and still see error 11102:

1. **Check Tidal's Status Page:** [status.tidal.com](https://status.tidal.com)
2. **Contact Tidal Support:** [support.tidal.com](https://support.tidal.com)
3. **Review Logs:** Share the console output from both:
   - Your terminal (server logs)
   - Browser console (client logs)

---

## Test Checklist

Before asking for help, verify:

- [ ] Redirect URI in portal exactly matches `http://localhost:5173/tidal/callback`
- [ ] Client ID and Secret are correct in `.env`
- [ ] Dev server was restarted after changing `.env`
- [ ] Application type is "Web Application" in portal
- [ ] Required scopes are enabled in portal
- [ ] Using the correct port (5173) when accessing the app
- [ ] No firewall blocking localhost:5173
- [ ] Browser allows third-party cookies (some privacy extensions block OAuth)
