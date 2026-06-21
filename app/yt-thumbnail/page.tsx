"use client"
import { useState } from "react"

export default function YTThumbnail() {
  const [url, setUrl] = useState("")
  const [list, setList] = useState<any[]>([])

  const getId = (u:string) => u.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)?.[1] || ""

  const add = () => {
    const id = getId(url)
    if (!id) return
    setList([...list, { id, url, title: `Video ${list.length+1}` }])
    setUrl("")
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">YouTube Thumbnail Downloader</h1>
      <p className="text-gray-600 mb-6">Download HD thumbnails. Paste multiple URLs.</p>

      <div className="flex gap-2 mb-8">
        <input value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>e.key==='Enter'&&add()} placeholder="Paste YouTube URL and press Enter" className="flex-1 p-4 border-2 rounded-xl" />
        <button onClick={add} className="bg-red-600 text-white px-8 rounded-xl">Add</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((v,i) => (
          <div key={i} className="border rounded-xl overflow-hidden">
            <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} className="w-full aspect-video object-cover" />
            <div className="p-3">
              <div className="text-sm font-medium truncate">{v.id}</div>
              <div className="flex gap-2 mt-2">
                {['maxresdefault','hqdefault','mqdefault'].map(q => (
                  <a key={q} href={`https://img.youtube.com/vi/${v.id}/${q}.jpg`} download target="_blank" className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">{q.replace('default','')}</a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
