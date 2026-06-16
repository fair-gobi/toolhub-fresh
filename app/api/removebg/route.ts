export async function POST(req: Request) {
  try {
    const token = process.env.HUGGINGFACE_TOKEN
    const file = await req.blob()

    const res = await fetch('https://api-inference.huggingface.co/models/NotAnotherTech/bg-removal', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: file
    })

    if (!res.ok) {
      const text = await res.text()
      return new Response(JSON.stringify({ error: text }), { status: 500 })
    }

    const blob = await res.blob()
    return new Response(blob, { headers: { 'Content-Type': 'image/png' } })
  } catch (e:any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
