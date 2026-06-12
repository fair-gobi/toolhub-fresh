'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

export default function PDFToWord() {
  const [file, setFile] = useState<File | null>(null)
  const [converting, setConverting] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f?.type === 'application/pdf') setFile(f)
  }, [])

  const convert = async () => {
    if (!file) return
    setConverting(true)
    setProgress(0)
    
    // Simulate conversion (real implementation would use pdfjs-dist + docx)
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) {
          clearInterval(interval)
          return 90
        }
        return p + 10
      })
    }, 200)

    try {
      const { getDocument, GlobalWorkerOptions } = await import('pdfjs-dist')
      GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
      
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await getDocument({ data: arrayBuffer }).promise
      let fullText = ''
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map((item: any) => item.str).join(' ')
        fullText += pageText + '\n\n'
        setProgress(Math.round((i / pdf.numPages) * 90))
      }

      const { Document, Packer, Paragraph, TextRun } = await import('docx')
      const doc = new Document({
        sections: [{
          properties: {},
          children: fullText.split('\n').map(line => 
            new Paragraph({ children: [new TextRun(line)] })
          )
        }]
      })

      const blob = await Packer.toBlob(doc)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = file.name.replace('.pdf', '.docx')
      a.click()
      URL.revokeObjectURL(url)
      setProgress(100)
    } catch (err) {
      console.error(err)
      alert('Conversion failed. Try a text-based PDF.')
    } finally {
      setConverting(false)
      setTimeout(() => setProgress(0), 2000)
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
          <div className="inline-flex w-16 h-16 rounded-2xl bg-blue-500/20 items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3">PDF to Word</h1>
          <p className="text-slate-400">Convert PDF to editable DOCX. Runs in your browser — files never leave your device.</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-8">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-blue-500 transition cursor-pointer"
          >
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="pdf-input"
            />
            <label htmlFor="pdf-input" className="cursor-pointer">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-slate-700/50 flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-lg mb-1">{file ? file.name : 'Drop PDF here or click to browse'}</p>
              <p className="text-sm text-slate-500">Max 50MB • Text-based PDFs work best</p>
            </label>
          </div>

          {file && (
            <div className="mt-6">
              {converting && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Converting...</span>
                    <span className="text-blue-400">{progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}
              <button
                onClick={convert}
                disabled={converting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 font-medium hover:opacity-90 disabled:opacity-50 transition"
              >
                {converting ? 'Converting...' : 'Convert to Word'}
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          {[
            { title: 'Private', desc: 'Files processed locally' },
            { title: 'Fast', desc: 'No upload wait time' },
            { title: 'Free', desc: 'Unlimited conversions' },
          ].map((f) => (
            <div key={f.title} className="p-4">
              <h3 className="font-medium mb-1">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}