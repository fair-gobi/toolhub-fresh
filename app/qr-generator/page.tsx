'use client';
import { useState } from 'react';
export default function QRGen() {
  const [type,setType]=useState('url'); const [data,setData]=useState('https://promptoolhub.com');
  const getData = ()=> type==='wifi'? `WIFI:S:${data.split(',')[0]};T:WPA;P:${data.split(',')[1]};;` : type==='contact'? `MECARD:N:${data};;` : data;
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(getData())}`;
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Advanced QR Generator</h1>
        <select value={type} onChange={e=>setType(e.target.value)} className="border rounded px-3 py-2 mb-4"><option value="url">URL</option><option value="wifi">WiFi (SSID,password)</option><option value="contact">Contact (Name)</option></select>
        <input value={data} onChange={e=>setData(e.target.value)} placeholder={type==='wifi'?'MyWiFi,password123':type==='contact'?'Gobinda Subedi':'https://...'} className="w-full border rounded px-3 py-2 mb-4" />
        <div className="text-center"><img src={qr} className="mx-auto border p-4 rounded-lg" /><a href={qr} download="qr.png" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded">Download PNG</a></div>
      </div>
    </main>
  );
}
