/**
 * Helper to get a Sociabuzz session with specific language/currency preference
 */
export async function getSociabuzzSession(lang: string = 'id') {
  try {
    // 1. Fetch the language endpoint which sets the session
    // We add a random cache buster to ensure we get a fresh session
    const unique = Date.now()
    const response = await fetch(`https://sociabuzz.com/int/lang?is_user=1&lang=${lang}&uri_redirect=https://sociabuzz.com&_=${unique}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      },
      cache: 'no-store'
    })

    // 2. Extract cookies
    const setCookieHeader = response.headers.get('set-cookie')
    if (!setCookieHeader) {
      console.warn('No Set-Cookie header found in Sociabuzz response')
      return { cookies: '', csrfToken: '' }
    }

    // 3. Parse specific cookies we need
    // Sociabuzz usually sets: SBsession, sociabuzz_sb_cookie_csrf
    const cookies: string[] = []
    let csrfToken = ''

    // Helper to parse set-cookie header which might be a single string or multiple
    // set-cookie can be comma separated but also dates use commas, so it's tricky.
    // In Node fetch, 'set-cookie' might be combined.
    // For simplicity, we just look for our target strings using regex
    
    // Find SBsession
    const sbSessionMatch = setCookieHeader.match(/SBsession=([^;]+)/)
    if (sbSessionMatch) {
      cookies.push(`SBsession=${sbSessionMatch[1]}`)
    }

    // Find CSRF cookie
    const csrfMatch = setCookieHeader.match(/sociabuzz_sb_cookie_csrf=([^;]+)/)
    if (csrfMatch) {
      cookies.push(`sociabuzz_sb_cookie_csrf=${csrfMatch[1]}`)
      csrfToken = csrfMatch[1]
    }

    // Combine for use in headers
    const cookieString = cookies.join('; ')

    return {
      cookies: cookieString,
      csrfToken
    }

  } catch (error) {
    console.error('Error fetching Sociabuzz session:', error)
    return { cookies: '', csrfToken: '' }
  }
}
