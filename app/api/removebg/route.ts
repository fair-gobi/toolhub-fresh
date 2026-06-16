export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const file = await req.blob()
    
    const fd = new FormData()
    fd.append('image_file', file, 'image.jpg')
    fd.append('size', 'auto')
    
    // Free public API that works from Vercel
    const res = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'T8Kk3g6ZvQ6q8W7z'  // demo key - works for testing
      },
      body: fd
    })

    if (!res.ok) {
      const err = await res.text()
      return new Response(JSON.stringify({ error: err }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const blob = await res.blob()
    return new Response(blob, {
      headers: { 
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store'
      }
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
