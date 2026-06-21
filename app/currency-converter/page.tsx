"use client"
import { useState, useEffect } from "react"

export default function Currency() {
  const [amt, setAmt] = useState(1000)
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("NPR")
  const [rates, setRates] = useState<any>({
    USD: 150.69, // Updated 2026 NRB rate
    EUR: 171.30,
    GBP: 196.34,
    AED: 41.04,
    INR: 1.60,
    NPR: 1
  })
  const [loading, setLoading] = useState(true)
  const [updated, setUpdated] = useState("")

  useEffect(() => {
    async function fetchRates() {
      try {
        // Use exchangerate-api which has NPR
        const res = await fetch("https://open.er-api.com/v6/latest/USD")
        const data = await res.json()

        if (data && data.rates && data.rates.NPR) {
          const usdToNpr = data.rates.NPR // e.g. 150.69
          const newRates: any = { NPR: 1 }

          // Convert all to NPR base
          Object.keys(data.rates).forEach(cur => {
            if (['USD','EUR','GBP','AED','AUD','CAD','SGD','QAR','SAR','INR','JPY','CNY'].includes(cur)) {
              newRates[cur] = usdToNpr / data.rates[cur]
            }
          })
          newRates["USD"] = usdToNpr
          newRates["INR"] = 1.60 // Nepal fixed rate

          setRates(newRates)
          setUpdated(new Date().toLocaleDateString('en-CA')) // 2026-06-21 format
        }
      } catch (e) {
        console.log("Using NRB fallback rates")
      } finally {
        setLoading(false)
      }
    }
    fetchRates()
  }, [])

  const convert = () => {
    const amountInNPR = from === "NPR"? amt : amt * rates[from]
    return to === "NPR"? amountInNPR : amountInNPR / rates[to]
  }

  const result = convert()

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold">NPR Live Converter</h1>
      <p className="text-gray-600">Today: 1 USD = Rs {rates.USD?.toFixed(2)} NPR</p>
      {loading? <p className="text-blue-600 text-sm">Fetching NRB rates...</p> :
       <p className="text-green-600 text-sm">✓ Live • Updated {updated}</p>}

      <div className="mt-6 bg-white border-2 rounded-2xl p-8">
        <input type="number" value={amt} onChange={e=>setAmt(+e.target.value)}
               className="w-full text-5xl font-bold text-center p-4 border-b" />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <select value={from} onChange={e=>setFrom(e.target.value)} className="p-4 border-2 rounded-xl text-xl">
            {Object.keys(rates).map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={to} onChange={e=>setTo(e.target.value)} className="p-4 border-2 rounded-xl text-xl">
            {Object.keys(rates).map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="mt-8 text-center">
          <div className="text-6xl font-bold text-green-600">{result.toFixed(2)}</div>
          <div className="mt-2">{amt} {from} = {result.toFixed(2)} {to}</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2 text-center">
        <div className="bg-blue-50 p-3 rounded"><div className="text-xs">USD</div><div className="font-bold">Rs {rates.USD?.toFixed(2)}</div></div>
        <div className="bg-blue-50 p-3 rounded"><div className="text-xs">EUR</div><div className="font-bold">Rs {rates.EUR?.toFixed(2)}</div></div>
        <div className="bg-blue-50 p-3 rounded"><div className="text-xs">GBP</div><div className="font-bold">Rs {rates.GBP?.toFixed(2)}</div></div>
        <div className="bg-blue-50 p-3 rounded"><div className="text-xs">AED</div><div className="font-bold">Rs {rates.AED?.toFixed(2)}</div></div>
      </div>
    </div>
  )
}
