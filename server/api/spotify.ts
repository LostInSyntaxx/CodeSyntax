export default defineEventHandler(async () => {
    const config = useRuntimeConfig()

    const { clientId, clientSecret, refreshToken } = config.spotify

    if (!refreshToken) {
        return { isPlaying: false, message: 'No refresh token configured' }
    }

    // Get a new access token using the refresh token
    const tokenRes = await $fetch<{ access_token: string }>('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }).toString(),
    }).catch(() => null)

    if (!tokenRes?.access_token) {
        return { isPlaying: false, message: 'Failed to refresh token' }
    }

    // Fetch currently playing track
    const res = await $fetch.raw('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            Authorization: `Bearer ${tokenRes.access_token}`,
        },
    }).catch(() => null)

    // 204 = no content (not playing)
    if (!res || res.status === 204 || !res._data) {
        return { isPlaying: false }
    }

    const data = res._data as any

    if (!data.item) {
        return { isPlaying: false }
    }

    return {
        isPlaying: data.is_playing ?? false,
        title: data.item.name,
        artist: data.item.artists?.map((a: any) => a.name).join(', '),
        album: data.item.album?.name,
        albumArt: data.item.album?.images?.[0]?.url,
        songUrl: data.item.external_urls?.spotify,
        progressMs: data.progress_ms,
        durationMs: data.item.duration_ms,
    }
})
