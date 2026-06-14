'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function YTThumb() {
  const [url, setUrl] = useState('')
  const [thumbs, setThumbs] = useState<string[]>([])

  const getThumb = () => {
    const id = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)?.[1]
    if (!id) return
    setThumbs([
      `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${id}/mqdefault.jpg`
    ])
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600">← Back</Link>
        <h1 className="text-3xl font-bold mt-4">YouTube Thumbnail Downloader</h1>
        <div className="bg-white p-6 rounded-xl shadow mt-4">
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste YouTube URL" className="w-full border p-3 rounded mb-3" />
          <button onClick={getThumb} className="w-full bg-red-600 text-white py-3 rounded">Get Thumbnails</button>
          <div className="grid gap-4 mt-4">
            {thumbs.map((t,i) => (
              <a key={i} href={t} download target="_blank" className="block">
                <img src={t} className="w-full rounded border" />
                <p className="text-center text-sm mt-1">Download {['HD','HQ','MQ'][i]}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
