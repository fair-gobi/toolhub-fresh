'use client'
import { useState } from 'react'

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setLoading(true)
    const pdfjs = await import('pdfjs-dist')
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
    const buf = await f.arrayBuffer()
    const pdf = await pdfjs.getDocument({ data: buf }).promise
    let out = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      out += content.items.map((it: any) => it.str).join(' ') + '\n\n'
    }
    setText(out)
    setLoading(false)
  }

  const download = () => {
    const blob = new Blob([text], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (file?.name.replace('.pdf', '') || 'document') + '.docx'
    a.click()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">PDF to Word</h1>
      <input type="file" accept="application/pdf" onChange={handleFile} className="mb-4" />
      {loading && <p>Extracting text...</p>}
      {text && (
        <>
          <textarea value={text} onChange={e => setText(e.target.value)} className="w-full h-64 border p-2 mb-4" />
          <button onClick={download} className="bg-blue-600 text-white px-4 py-2 rounded">Download.docx</button>
        </>
      )}
    </div>
  )
}
