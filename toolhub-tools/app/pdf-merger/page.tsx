'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

export default function PDFMerger() {
  const [files, setFiles] = useState<File[]>([])
  const [merging, setMerging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const newFiles = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf')
    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const merge = async () => {
    if (files.length < 2) return
    setMerging(true)
    try {
      const { PDFDocument } = await import('pdf-lib')
      const mergedPdf = await PDFDocument.create()
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        pages.forEach(page => mergedPdf.addPage(page))
      }
      
      const mergedBytes = await mergedPdf.save()
      const blob = new Blob([mergedBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'merged.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      alert('Merge failed')
    } finally {
      setMerging(false)
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
          <div className="inline-flex w-16 h-16 rounded-2xl bg-purple-500/20 items-center justify-center mb-4">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3">PDF Merger</h1>
          <p className="text-slate-400">Combine multiple PDFs into one. Drag to reorder.</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-8">
          <div onDrop={handleDrop} onDragOver={e => e.preventDefault()} className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-purple-500 transition">
            <input type="file" accept=".pdf" multiple onChange={e => setFiles(prev => [...prev, ...Array.from(e.target.files || [])])} className="hidden" id="pdfs" />
            <label htmlFor="pdfs" className="cursor-pointer">
              <p className="text-lg mb-1">Drop PDFs here or click to browse</p>
              <p className="text-sm text-slate-500">Select 2 or more files</p>
            </label>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <span className="text-sm truncate">{i+1}. {f.name}</span>
                  <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-slate-500 hover:text-red-400">×</button>
                </div>
              ))}
              <button onClick={merge} disabled={merging || files.length < 2} className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-medium hover:opacity-90 disabled:opacity-50">
                {merging ? 'Merging...' : `Merge ${files.length} PDFs`}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}