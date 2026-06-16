export async function POST(req: Request) {
  try {
    const token = process.env.HUGGINGFACE_TOKEN
    console.log('Token exists:', !!token)
    
    if (!token) {
      return new Response(JSON.stringify({ error: 'No token' }), { status: 500 })
    }

    const file = await req.blob()

    const res = await fetch('https://api-inference.huggingface.co/models/briaai/RMBG-1.4', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/octet-stream'
      },
      body: file
    })

    console.log('HF Status:', res.status)
    
    if (!res.ok) {
      const text = await res.text()
      console.log('HF Error:', text)
      return new Response(JSON.stringify({ error: text }), { status: 500 })
    }

    const blob = await res.blob()
    return new Response(blob, {
      headers: { 'Content-Type': 'image/png' }
    })
  } catch (e:any) {
    console.log('Crash:', e.message)
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
