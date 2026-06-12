'use client'
import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

export default function PdfMerger() {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const merge = async () => {
    if (files.length < 2) return alert('Select at least 2 PDFs')
    setLoading(true)
    const merged = await PDFDocument.create()
    for (const f of files) {
      const buf = await f.arrayBuffer()
      const pdf = await PDFDocument.load(buf)
      const pages = await merged.copyPages(pdf, pdf.getPageIndices())
      pages.forEach(p => merged.addPage(p))
    }
    const bytes = await merged.save()
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'merged.pdf'
    a.click()
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">PDF Merger</h1>
      <input type="file" accept="application/pdf" multiple onChange={e => setFiles(Array.from(e.target.files || []))} className="mb-4" />
      <p className="mb-2">{files.length} files selected</p>
      <button onClick={merge} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
        {loading? 'Merging...' : 'Merge PDFs'}
      </button>
    </div>
  )
}
