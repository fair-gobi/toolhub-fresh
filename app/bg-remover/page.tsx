'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function BgRemover(){
  const [img,setImg]=useState<string|null>(null)
  const [out,setOut]=useState<string|null>(null)
  const [loading,setLoading]=useState(false)

  async function removeBg(e:any){
    const file = e.target.files[0]
    if(!file) return
    setImg(URL.createObjectURL(file))
    setLoading(true)

    const fd = new FormData()
    fd.append('file', file)

    try {
      // Free HuggingFace model - no key needed
      const res = await fetch('https://api-inference.huggingface.co/models/briaai/RMBG-1.4', {
        method: 'POST',
        body: file
      })
      const blob = await res.blob()
      setOut(URL.createObjectURL(blob))
    } catch {
      alert('Try again in 20 seconds - model is loading')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">AI Background Remover</h1>

        <div className="bg-white p-6 rounded-xl shadow mt-4">
          <input type="file" accept="image/*" onChange={removeBg} className="mb-4" />

          {loading && <p className="text-blue-600">Removing background... (10-20 sec first time)</p>}

          <div className="grid grid-cols-2 gap-4 mt-4">
            {img && <div><p className="text-sm mb-2">Original</p><img src={img} className="rounded border" /></div>}
            {out && <div><p className="text-sm mb-2">Removed</p><img src={out} className="rounded border" /><a href={out} download="no-bg.png" className="block mt-2 text-center bg-green-600 text-white py-2 rounded">Download PNG</a></div>}
          </div>
        </div>
      </div>
    </div>
  )
}
