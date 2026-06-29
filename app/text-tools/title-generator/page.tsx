'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function TitleGenerator() {
  const [content, setContent] = useState('')
  const [tone, setTone] = useState('seo')
  const [keywords, setKeywords] = useState('')
  const [titles, setTitles] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [modelLoading, setModelLoading] = useState(false)
  const [modelReady, setModelReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const workerRef = useRef<Worker | null>(null)

  const tones = [
    { value: 'seo', label: 'SEO Optimized', desc: 'Rank on Google' },
    { value: 'viral', label: 'Viral/Clickbait', desc: 'High CTR' },
    { value: 'professional', label: 'Professional', desc: 'LinkedIn/Business' },
    { value: 'youtube', label: 'YouTube', desc: 'Video titles' },
    { value: 'news', label: 'News Headline', desc: 'Journalistic' },
    { value: 'academic', label: 'Academic', desc: 'Research papers' },
  ]

  useEffect(() => {
    // Load Web Worker for Transformers.js
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL('./worker.ts', import.meta.url),
        { type: 'module' }
      )

      workerRef.current.onmessage = (e) => {
        if (e.data.status === 'progress') {
          setProgress(Math.round(e.data.progress))
        }
        if (e.data.status === 'ready') {
          setModelReady(true)
          setModelLoading(false)
        }
        if (e.data.status === 'complete') {
          setTitles(e.data.output)
          setLoading(false)
        }
        if (e.data.status === 'error') {
          console.error(e.data.error)
          setLoading(false)
          // Fallback to template generation
          generateFallbackTitles()
        }
      }
    }

    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  const loadModel = () => {
    if (!modelReady &&!modelLoading) {
      setModelLoading(true)
      workerRef.current?.postMessage({ 
        type: 'load',
        model: 'Xenova/Qwen1.5-0.5B-Chat' // 350MB - Best Overall Choice
      })
    }
  }

  const generateTitles = async () => {
    if (!content.trim() || content.length < 10) return
    
    setLoading(true)
    
    if (modelReady) {
      // Use Qwen 1.5-0.5B for real AI generation
      const systemPrompt = `You are an expert copywriter specializing in ${tone} titles. Generate exactly 5 unique, compelling titles.`
      const userPrompt = `Content: "${content.slice(0, 500)}"
${keywords? `Keywords to include: ${keywords}` : ''}
Style: ${tone}

Rules:
- Each title MUST be under 60 characters
- Make them engaging and specific
- No numbering or bullets
- Return only titles, one per line

Titles:`

      workerRef.current?.postMessage({
        type: 'generate',
        systemPrompt,
        userPrompt,
        maxTokens: 200
      })
    } else {
      // Fallback to advanced template engine
      generateFallbackTitles()
    }
  }

  const generateFallbackTitles = () => {
    const words = content.toLowerCase().split(/\s+/).filter(w => w.length > 3)
    const mainTopic = keywords || words[0] || 'topic'
    const year = new Date().getFullYear()
    
    const templates: Record<string, string[]> = {
      seo: [
        `${capitalize(mainTopic)}: Complete Guide ${year}`,
        `How to ${mainTopic} - Step by Step ${year}`,
        `Best ${mainTopic} Strategies & Tips`,
        `${capitalize(mainTopic)} for Beginners: Full Tutorial`,
        `Top 10 ${mainTopic} Mistakes to Avoid`
      ],
      viral: [
        `This ${capitalize(mainTopic)} Secret Changes Everything`,
        `Why Everyone's Wrong About ${capitalize(mainTopic)}`,
        `I Tried ${capitalize(mainTopic)} for 30 Days`,
        `The ${capitalize(mainTopic)} Hack Nobody Tells You`,
        `Stop Doing ${capitalize(mainTopic)} Like This`
      ],
      professional: [
        `Strategic ${capitalize(mainTopic)}: Industry Analysis ${year}`,
        `Leveraging ${capitalize(mainTopic)} for Growth`,
        `${capitalize(mainTopic)}: Best Practices & Insights`,
        `The Business Case for ${capitalize(mainTopic)}`,
        `${capitalize(mainTopic)} Implementation Guide`
      ],
      youtube: [
        `${capitalize(mainTopic)} Explained in 5 Minutes`,
        `I Tested ${capitalize(mainTopic)} So You Don't Have To`,
        `${capitalize(mainTopic)} Tutorial: Beginner to Pro`,
        `The ONLY ${capitalize(mainTopic)} Video You Need`,
        `${capitalize(mainTopic)} Tier List - Ranked`
      ],
      news: [
        `Breaking: ${capitalize(mainTopic)} Development ${year}`,
        `${capitalize(mainTopic)} Update: Key Findings`,
        `Report: ${capitalize(mainTopic)} Trends ${year}`,
        `Analysis: ${capitalize(mainTopic)} Impact Study`,
        `${capitalize(mainTopic)}: What Experts Say`
      ],
      academic: [
        `A Study of ${capitalize(mainTopic)} Applications`,
        `${capitalize(mainTopic)}: Theoretical Framework`,
        `Empirical Analysis of ${capitalize(mainTopic)}`,
        `${capitalize(mainTopic)}: Literature Review ${year}`,
        `Methodology in ${capitalize(mainTopic)} Research`
      ]
    }
    
    const selected = (templates[tone] || templates.seo)
     .map(t => t.length > 60? t.slice(0, 57) + '...' : t)
    
    setTitles(selected)
    setLoading(false)
  }

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/text" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Text Tools
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">⚡ AI Title Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Powered by Qwen 1.5-0.5B - Runs 100% in your browser</p>
          
          {!modelReady &&!modelLoading && (
            <button
              onClick={loadModel}
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
            >
              🚀 Load AI Model (350MB - One time)
            </button>
          )}
          
          {modelLoading && (
            <div className="mt-4">
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                Loading Qwen 1.5... {progress}%
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          
          {modelReady && (
            <p className="mt-2 text-xs text-green-600 dark:text-green-400">
              ✓ AI Model Ready - Free & Private
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Content or Topic <span className="text-red-500">*</span>
              </label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Example: How to start a dropshipping business with no money in Nepal using Facebook Marketplace"
                rows={4}
                className="w-full mt-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{content.length} chars (min 10)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title Style</label>
                <select
                  value={tone}
                  onChange={e => setTone(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  {tones.map(t => (
                    <option key={t.value} value={t.value}>{t.label} - {t.desc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Keywords <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={e => setKeywords(e.target.value)}
                  placeholder="dropshipping, Nepal, business"
                  className="w-full mt-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
            </div>

            <button
              onClick={generateTitles}
              disabled={content.trim().length < 10 || loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-300 dark:disabled:from-gray-700 dark:disabled:to-gray-700 text-white font-semibold py-3.5 rounded-lg transition-all disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
            >
              {loading? 'Generating with AI...' : modelReady? '✨ Generate with Qwen AI' : '✨ Generate Titles (Smart Mode)'}
            </button>
          </div>

          {titles.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Generated Titles</h3>
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 rounded-full">
                  {modelReady? 'AI Generated' : 'Smart Template'}
                </span>
              </div>
              <div className="space-y-3">
                {titles.map((title, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all"
                  >
                    <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-medium mb-1">{title}</p>
                      <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span>{title.length}/60 chars</span>
                        <span>•</span>
                        <span className={title.length <= 60? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}>
                          {title.length <= 60? 'SEO Optimal' : 'Too Long'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(title)}
                      className="flex-shrink-0 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">🎯 Why Qwen 1.5-0.5B?</p>
          <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
            <li>✓ Only 350MB - loads fast, runs on any device</li>
            <li>✓ Exceptional at following formatting instructions</li>
            <li>✓ 100% free, private, works offline after load</li>
            <li>✓ No API keys, no rate limits, no costs ever</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
