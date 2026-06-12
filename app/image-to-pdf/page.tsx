'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ImageToPDF() {
  const [files, setFiles] = useState<File[]>([])

  const convert = async () => {
    const { jsPDF } = await import('jspdf')
    const pdf = new jsPDF()
    
    for (let i = 0; i < files.length; i++) {
      if (i > 0) pdf.addPage()
      const img = await createImageBitmap(files[i])
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
      pdf.addImage(dataUrl, 'JPEG', 10, 10, 190, 0)
    }
    
    pdf.save('images.pdf')
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
          <h1 className="text-4xl font-bold mb-3">Image to PDF</h1>
          <p className="text-slate-400">Convert JPG, PNG to PDF</p>
        </div>
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
          <input type="file" accept="image/*" multiple onChange={e => setFiles(Array.from(e.target.files || []))} className="hidden" id="imgs" />
          <label htmlFor="imgs" className="block border-2 border-dashed border-slate-600 rounded-xl p-12 text-center cursor-pointer">
            {files.length ? `${files.length} images selected` : 'Choose images'}
          </label>
          {files.length > 0 && <button onClick={convert} className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400">Create PDF</button>}
        </div>
      </main>
    </div>
  )
}