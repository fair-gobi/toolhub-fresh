'use client';
import { useState } from 'react';
export default function PaymentQR() {
  const [amt,setAmt]=useState(1000); const [purpose,setPurpose]=useState('Payment'); const [method,setMethod]=useState('eSewa');
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(method+':'+amt+':'+purpose)}`;
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow text-center">
        <h1 className="text-3xl font-bold mb-6">Nepal Payment QR</h1>
        <div className="grid md:grid-cols-3 gap-4 mb-6 text-left">
          <div><label>Amount (NPR)</label><input type="number" value={amt} onChange={e=>setAmt(e.target.value)} className="w-full border rounded px-3 py-2" /></div>
          <div><label>Purpose</label><input value={purpose} onChange={e=>setPurpose(e.target.value)} className="w-full border rounded px-3 py-2" /></div>
          <div><label>Method</label><select value={method} onChange={e=>setMethod(e.target.value)} className="w-full border rounded px-3 py-2"><option>eSewa</option><option>Khalti</option><option>IME Pay</option></select></div>
        </div>
        <img src={qrUrl} alt="QR" className="mx-auto border p-2 rounded-lg" />
        <p className="mt-4">Scan with {method} to pay NPR {amt}</p>
        <p className="text-sm text-gray-500">Purpose: {purpose}</p>
      </div>
    </main>
  );
}
