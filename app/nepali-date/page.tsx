'use client';
import { useState, useEffect } from 'react';
import { ADToBS, BSToAD } from 'bikram-sambat-js';

export default function NepaliDateConverter() {
  const [bs, setBs] = useState('2082-03-08');
  const [ad, setAd] = useState('2025-06-22');
  const [mode, setMode] = useState('bs2ad');

  // BS to AD
  useEffect(() => {
    if (mode !== 'bs2ad') return;
    try {
      const [y,m,d] = bs.split('-').map(Number);
      const result = BSToAD(`${y}-${m}-${d}`);
      setAd(result);
    } catch {}
  }, [bs, mode]);

  // AD to BS
  useEffect(() => {
    if (mode !== 'ad2bs') return;
    try {
      const result = ADToBS(ad);
      setBs(result);
    } catch {}
  }, [ad, mode]);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-2">Nepali Date Converter</h1>
        <p className="text-gray-600 mb-6">Bikram Sambat ↔ English Date</p>
        
        <div className="flex gap-2 mb-6">
          <button onClick={()=>setMode('bs2ad')} className={`px-4 py-2 rounded-lg ${mode==='bs2ad'?'bg-blue-600 text-white':'bg-gray-200'}`}>BS → AD</button>
          <button onClick={()=>setMode('ad2bs')} className={`px-4 py-2 rounded-lg ${mode==='ad2bs'?'bg-blue-600 text-white':'bg-gray-200'}`}>AD → BS</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">Bikram Sambat</label>
            <input 
              value={bs} 
              onChange={e=>{setBs(e.target.value); setMode('bs2ad')}} 
              className="w-full border rounded-lg px-4 py-3 text-lg font-mono"
              placeholder="2082-03-08"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">English Date</label>
            <input 
              value={ad} 
              onChange={e=>{setAd(e.target.value); setMode('ad2bs')}} 
              type="date"
              className="w-full border rounded-lg px-4 py-3 text-lg"
            />
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border text-center">
          <div className="text-2xl font-bold">{bs} BS</div>
          <div className="text-gray-500 my-2">⇅</div>
          <div className="text-2xl font-bold">{ad} AD</div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={()=>{ const today=new Date().toISOString().split('T')[0]; setAd(today); setMode('ad2bs'); }} className="px-4 py-2 bg-green-600 text-white rounded-lg">Today</button>
          <button onClick={()=>navigator.clipboard.writeText(`${bs} BS = ${ad} AD`)} className="px-4 py-2 bg-gray-200 rounded-lg">Copy</button>
        </div>

        <a href="/utility" className="inline-block mt-8 text-blue-600">← Back</a>
      </div>
    </main>
  );
}
