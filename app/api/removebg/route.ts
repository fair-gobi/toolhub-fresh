export async function POST(req: Request) {
  try {
    const file = await req.blob()

    const res = await fetch('https://api-inference.huggingface.co/models/briaai/RMBG-1.4', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        'Content-Type': 'application/octet-stream'
      },
      body: file
    })

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Model error' }), { status: 500 })
    }

    const blob = await res.blob()
    return new Response(blob, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache'
      }
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed' }), { status: 500 })
  }
}
