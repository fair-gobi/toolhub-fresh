'use client'
import { useState } from 'react'

export default function Summarizer() {
  const [text, setText] = useState(`Artificial intelligence is transforming how we work. Free online tools powered by AI can now handle tasks that once took hours. From writing emails to generating images, these tools are becoming essential for small businesses and creators.

The problem is most tools are expensive or require signups. That's why we built Promptoolhub - a collection of 16 free tools that work instantly in your browser. No accounts, no credit cards, just results.

Our most popular tools include the ad copy generator, which helps marketers create Facebook ads in seconds, and the reading time calculator, which is used by over 5,000 bloggers monthly.

The future of work is not about working harder, but working smarter with the right tools.`)

  const [mode, setMode] = useState('medium')
  const [style, setStyle] = useState('paragraph')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState('')
  const [keyPoints, setKeyPoints] = useState<string[]>([])

  const summarize = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
    const words = text.split(/\s+/).length

    // Extract key sentences (first, ones with numbers, ones with keywords)
    const important = sentences.filter(s =>
      s.toLowerCase().includes('free') ||
      s.toLowerCase().includes('tool') ||
      s.toLowerCase().includes('built') ||
      /\d/.test(s) ||
      s.length > 50
    ).slice(0, 5)

    // Generate based on mode
    const ratios: any = { short: 0.15, medium: 0.3, long: 0.5 }
    const targetSentences = Math.max(1, Math.floor(sentences.length * ratios[mode]))

    let result = ''
    if (style === 'paragraph') {
      result = important.slice(0, targetSentences).join(' ').trim()
      if (mode === 'short') result = result.split('.').slice(0,1).join('.') + '.'
    } else {
      // Bullet points
      result = important.slice(0, targetSentences + 1).map(s => `• ${s.trim()}`).join('\n')
    }

    // Extract key points
    const points = text.split(/[.!?]/)
     .filter(s => s.length > 30 && s.length < 120)
     .slice(0, 4)
     .map(s => s.trim())

    setSummary(result)
    setKeyPoints(points)
    setLoading(false)
  }

  const originalWords = text.split(/\s+/).filter(Boolean).length
  const summaryWords = summary.split(/\s+/).filter(Boolean).length
  const saved = Math.max(0, Math.round((1 - summaryWords/originalWords) * 100))
  const timeSaved = Math.ceil((originalWords - summaryWords) / 225)

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">📝 AI Text Summarizer</h1>
        <p className="opacity-90">Extract key ideas instantly</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold">Original Text</label>
            <span className="text-sm text-gray-500">{originalWords} words • ~{Math.ceil(originalWords/225)} min read</span>
          </div>
          <textarea
            value={text}
            onChange={e=>setText(e.target.value)}
            className="w-full h-80 border-2 border-gray-200 rounded-xl p-4 focus:border-green-500 outline-none"
            placeholder="Paste your article, research paper, or long text here..."
          />

          <div className="flex gap-3 mt-3">
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              {['short','medium','long'].map(m => (
                <button key={m} onClick={()=>setMode(m)} className={`px-3 py-1.5 rounded text-sm capitalize ${mode===m?'bg-white shadow':' '}`}>{m}</button>
              ))}
            </div>
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              {['paragraph','bullets'].map(s => (
                <button key={s} onClick={()=>setStyle(s)} className={`px-3 py-1.5 rounded text-sm capitalize ${style===s?'bg-white shadow':' '}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Output */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold">Summary</label>
            {summary && <span className="text-sm text-green-600 font-medium">{saved}% shorter • save {timeSaved} min</span>}
          </div>

          <div className="h-80 border-2 border-gray-200 rounded-xl p-4 bg-gray-50 relative">
            {loading? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent mb-3"></div>
                <p className="text-gray-600">Analyzing text structure...</p>
                <p className="text-xs text-gray-500 mt-1">Extracting key sentences</p>
              </div>
            ) : summary? (
              <div className="h-full overflow-auto">
                <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed">{summary}</pre>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Click Summarize to generate
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-3">
            <button onClick={summarize} disabled={!text || loading} className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-medium disabled:opacity-50">
              {loading? 'Summarizing...' : '✨ Summarize'}
            </button>
            {summary && (
              <button onClick={()=>navigator.clipboard.writeText(summary)} className="px-4 py-2.5 border rounded-lg">Copy</button>
            )}
          </div>
        </div>
      </div>

      {/* Key Points */}
      {keyPoints.length > 0 &&!loading && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-semibold text-amber-900 mb-3">🔑 Key Points Extracted</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {keyPoints.map((point,i)=>(
              <div key={i} className="flex gap-2">
                <span className="text-amber-600 font-bold">{i+1}.</span>
                <span className="text-sm text-amber-900">{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      {summary && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            {label: 'Original', value: `${originalWords}w`},
            {label: 'Summary', value: `${summaryWords}w`},
            {label: 'Compression', value: `${saved}%`},
          ].map(s=>(
            <div key={s.label} className="bg-white border rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-green-600">{s.value}</div>
              <div className="text-xs text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
