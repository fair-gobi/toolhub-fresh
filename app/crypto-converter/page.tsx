"use client"
import { useState, useEffect } from "react"

export default function Crypto() {
  const [btc,setBtc]=useState(0); const [eth,setEth]=useState(0); const [amount,setAmount]=useState(1); const [coin,setCoin]=useState("BTC")

  useEffect(()=>{ fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd").then(r=>r.json()).then(d=>{ setBtc(d.bitcoin.usd); setEth(d.ethereum.usd) }) },[])

  const price = coin==="BTC"? btc : eth
  const value = amount * price

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">Crypto Converter</h1>
      <p className="text-gray-600 mb-6">Live BTC & ETH prices</p>
      <div className="bg-gray-900 text-white rounded-2xl p-8">
        <div className="flex gap-4 mb-6">
          <button onClick={()=>setCoin("BTC")} className={`px-6 py-3 rounded-xl ${coin==="BTC"?"bg-orange-500":"bg-gray-800"}`}>Bitcoin ${btc.toLocaleString()}</button>
          <button onClick={()=>setCoin("ETH")} className={`px-6 py-3 rounded-xl ${coin==="ETH"?"bg-blue-500":"bg-gray-800"}`}>Ethereum ${eth.toLocaleString()}</button>
        </div>
        <input type="number" value={amount} onChange={e=>setAmount(+e.target.value)} className="w-full bg-gray-800 p-4 rounded-xl text-3xl mb-4" />
        <div className="text-5xl font-bold">${value.toLocaleString()}</div>
        <div className="text-gray-400 mt-2">{amount} {coin} = USD</div>
      </div>
    </div>
  )
}
