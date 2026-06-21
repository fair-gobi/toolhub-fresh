"use client"
import { useState, useEffect } from "react"

export default function PaymentQR() {
  const [method, setMethod] = useState("esewa")
  const [id, setId] = useState("98XXXXXXXX")
  const [name, setName] = useState("Mero Pasal")
  const [amount, setAmount] = useState("")
  const [purpose, setPurpose] = useState("")
  const [qr, setQr] = useState("")

  const generate = async () => {
    const QRCode = (await import("qrcode")).default
    let data = method === "esewa"
      ? `esewa:${id}?amt=${amount||0}`
      : `khalti:${id}?amount=${amount||0}`
    const url = await QRCode.toDataURL(data, { width: 400, margin: 2 })
    setQr(url)
  }

  useEffect(() => { generate() }, [method, id, name, amount])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold">Nepal Payment QR Generator</h1>
      <p className="text-gray-600 mb-8">Create eSewa, Khalti QR with fixed amount.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex gap-2">
            {["esewa","khalti","fonepay"].map(m => (
              <button key={m} onClick={()=>setMethod(m)} className={`flex-1 py-3 rounded-xl capitalize ${method===m?"bg-green-600 text-white":"bg-gray-100"}`}>{m}</button>
            ))}
          </div>
          <input value={id} onChange={e=>setId(e.target.value)} placeholder="eSewa ID" className="w-full p-4 border-2 rounded-xl" />
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Business Name" className="w-full p-4 border-2 rounded-xl" />
          <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" placeholder="Amount (optional)" className="w-full p-4 border-2 rounded-xl" />
          <input value={purpose} onChange={e=>setPurpose(e.target.value)} placeholder="Purpose" className="w-full p-4 border-2 rounded-xl" />
        </div>

        <div className="text-center">
          <div className="bg-white border-2 rounded-2xl p-8 inline-block">
            {qr && <img src={qr} width={240} height={240} alt="QR" />}
            <div className="mt-4 font-bold">{name}</div>
            <div className="text-sm text-gray-600">{method.toUpperCase()} {id}</div>
            {amount && <div className="text-xl font-bold text-green-600 mt-2">Rs. {amount}</div>}
            <a href={qr} download="payment-qr.png" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg">Download</a>
          </div>
        </div>
      </div>
    </div>
  )
}
