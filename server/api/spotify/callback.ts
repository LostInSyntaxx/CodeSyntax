export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const query = getQuery(event)
    const code = query.code as string

    if (!code) {
        // Step 1: Redirect to Spotify authorization
        const scopes = 'user-read-currently-playing user-read-playback-state'
        const redirectUri = getRequestURL(event).origin + '/api/spotify/callback'
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${config.spotify.clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`
        return sendRedirect(event, authUrl)
    }

    // Step 2: Exchange code for tokens
    const redirectUri = getRequestURL(event).origin + '/api/spotify/callback'

    const tokenRes = await $fetch<{
        access_token: string
        refresh_token: string
    }>('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64')}`,
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
        }).toString(),
    }).catch((err) => {
        return { error: err.message, access_token: '', refresh_token: '' }
    })

    if (!tokenRes.refresh_token) {
        return {
            error: 'Failed to get refresh token',
            details: tokenRes,
        }
    }

    return {
        message: '✅ Success! Copy the refresh_token below and add it to your .env file as SPOTIFY_REFRESH_TOKEN',
        refresh_token: tokenRes.refresh_token,
        instruction: 'After adding it to .env and Vercel environment variables, you can delete this callback file.',
    }
})
