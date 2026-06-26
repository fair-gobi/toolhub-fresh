'use client'
import { useState } from 'react'

export default function ReadingTime() {
  const [text, setText] = useState('Paste your article here. This tool calculates reading time based on average reading speed of 200 words per minute.')

  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(words / 200)
  const seconds = Math.ceil((words / 200) * 60)

  const speeds = [
    { label: 'Slow (150 wpm)', time: Math.ceil(words / 150) },
    { label: 'Average (200 wpm)', time: minutes },
    { label: 'Fast (250 wpm)', time: Math.ceil(words / 250) },
  ]

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">⏱️ Reading Time Calculator</h1>
      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-48 border rounded-lg p-3 mb-6" />

      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl p-8 text-center mb-6">
        <div className="text-6xl font-bold">{minutes}</div>
        <div className="text-xl">minute{minutes!==1?'s':''} read</div>
        <div className="text-sm opacity-80 mt-2">{words} words • {seconds} seconds</div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {speeds.map(s => (
          <div key={s.label} className="bg-gray-50 p-3 rounded text-center">
            <div className="font-bold text-lg">{s.time}m</div>
            <div className="text-xs text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
