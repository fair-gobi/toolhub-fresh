"use client"
import { useState, useEffect } from "react"

export default function QRGenerator() {
  const [type, setType] = useState("url")
  const [data, setData] = useState({ url:"https://toolhub-fresh.vercel.app", ssid:"", pass:"", name:"", phone:"" })
  const [qr, setQr] = useState("")

  const getText = () => {
    if (type==="url") return data.url
    if (type==="wifi") return `WIFI:T:WPA;S:${data.ssid};P:${data.pass};;`
    if (type==="contact") return `BEGIN:VCARD\nFN:${data.name}\nTEL:${data.phone}\nEND:VCARD`
    return ""
  }

  const generate = async () => {
    const QRCode = (await import("qrcode")).default
    const url = await QRCode.toDataURL(getText(), { width: 400, margin: 2 })
    setQr(url)
  }

  useEffect(() => { generate() }, [type, data])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">QR Code Generator</h1>
      <div className="flex gap-2 mb-6">
        {['url','wifi','contact'].map(t => (
          <button key={t} onClick={()=>setType(t)} className={`px-4 py-2 rounded-lg capitalize ${type===t?'bg-blue-600 text-white':'bg-gray-100'}`}>{t}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          {type==="url" && <input value={data.url} onChange={e=>setData({...data,url:e.target.value})} placeholder="https://..." className="w-full p-4 border-2 rounded-xl" />}
          {type==="wifi" && (<>
            <input value={data.ssid} onChange={e=>setData({...data,ssid:e.target.value})} placeholder="WiFi Name" className="w-full p-4 border-2 rounded-xl" />
            <input value={data.pass} onChange={e=>setData({...data,pass:e.target.value})} placeholder="Password" className="w-full p-4 border-2 rounded-xl" />
          </>)}
          {type==="contact" && (<>
            <input value={data.name} onChange={e=>setData({...data,name:e.target.value})} placeholder="Full Name" className="w-full p-4 border-2 rounded-xl" />
            <input value={data.phone} onChange={e=>setData({...data,phone:e.target.value})} placeholder="Phone" className="w-full p-4 border-2 rounded-xl" />
          </>)}
        </div>
        <div className="text-center">
          {qr && <><img src={qr} className="mx-auto border p-4 rounded-xl bg-white" width={260} /><a href={qr} download="qr.png" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg">Download</a></>}
        </div>
      </div>
    </div>
  )
}
