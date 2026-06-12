'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [quality, setQuality] = useState(80)
  const [result, setResult] = useState<{blob: Blob, size: number} | null>(null)

  const compress = async () => {
    if (!file) return
    const img = new Image()
    img.src = URL.createObjectURL(file)
    await new Promise(r => img.onload = r)
    
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)
    
    canvas.toBlob((blob) => {
      if (blob) setResult({ blob, size: blob.size })
    }, 'image/jpeg', quality / 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold">T</div>
            <span className="font-semibold">ToolHub</span>
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-white">← Back</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-green-500/20 items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3">Image Compressor</h1>
          <p className="text-slate-400">Reduce file size by up to 80% with no visible loss.</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-8">
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" id="img" />
          <label htmlFor="img" className="block border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-green-500 cursor-pointer">
            <p>{file ? file.name : 'Choose image'}</p>
          </label>

          {file && (
            <div className="mt-6">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400">Quality</span>
                  <span className="text-sm text-green-400">{quality}%</span>
                </div>
                <input type="range" min="10" max="95" value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full" />
              </div>
              <button onClick={compress} className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 font-medium">Compress</button>
              
              {result && (
                <div className="mt-4 p-4 bg-slate-900/50 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-sm">Original: {(file.size/1024).toFixed(1)} KB</p>
                    <p className="text-sm text-green-400">Compressed: {(result.size/1024).toFixed(1)} KB ({Math.round(100 - result.size/file.size*100)}% saved)</p>
                  </div>
                  <a href={URL.createObjectURL(result.blob)} download="compressed.jpg" className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm">Download</a>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}