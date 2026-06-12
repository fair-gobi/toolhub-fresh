'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BackgroundRemover() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const remove = async () => {
    if (!file) return
    setLoading(true)
    try {
      const { removeBackground } = await import('@imgly/background-removal')
      const blob = await removeBackground(file)
      setResult(URL.createObjectURL(blob))
    } catch (e) {
      alert('Failed - try smaller image')
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-4xl font-bold mb-3">Background Remover</h1>
          <p className="text-slate-400">AI removes background in browser</p>
        </div>
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" id="bg" />
          <label htmlFor="bg" className="block border-2 border-dashed border-slate-600 rounded-xl p-12 text-center cursor-pointer">
            {file ? file.name : 'Choose photo'}
          </label>
          {file && <button onClick={remove} disabled={loading} className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 disabled:opacity-50">{loading ? 'Removing...' : 'Remove Background'}</button>}
          {result && <div className="mt-6 text-center"><img src={result} className="max-h-96 mx-auto rounded-lg" /><a href={result} download="no-bg.png" className="inline-block mt-4 px-4 py-2 bg-slate-700 rounded-lg">Download PNG</a></div>}
        </div>
      </main>
    </div>
  )
}