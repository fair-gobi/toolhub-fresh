'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TitleGenerator() {
  const [content, setContent] = useState('')
  const [tone, setTone] = useState('professional')
  const [keywords, setKeywords] = useState('')
  const [titles, setTitles] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'clickbait', label: 'Clickbait' },
    { value: 'seo', label: 'SEO Optimized' },
    { value: 'creative', label: 'Creative' },
    { value: 'news', label: 'News Style' },
  ]

  const generateTitles = async () => {
    if (!content.trim()) return
    
    setLoading(true)
    
    // Browser-based AI generation using prompt engineering
    const prompt = `Generate 5 compelling ${tone} titles for this content: "${content}". ${keywords ? `Include keywords: ${keywords}.` : ''} 
    
    Rules:
    - Keep titles under 60 characters for SEO
    - Make them engaging and clear
    - Avoid generic phrases like "The Ultimate Guide"
    - Return only the titles, one per line, no numbering`

    try {
      // Using browser's built-in AI if available (Chrome AI)
      if ('ai' in window && 'languageModel' in (window as any).ai) {
        const session = await (window as any).ai.languageModel.create()
        const result = await session.prompt(prompt)
        const generatedTitles = result.split('\n').filter((t: string) => t.trim())
        setTitles(generatedTitles.slice(0, 5))
        session.destroy()
      } else {
        // Fallback: Smart template-based generation
        const templates = {
          professional: [
            `Understanding ${keywords || 'Key Concepts'} in ${content.slice(0, 30)}`,
            `How ${content.slice(0, 25)} Impacts Your Business`,
            `The Complete Guide to ${keywords || content.slice(0, 20)}`,
            `${content.slice(0, 30)}: Analysis and Insights`,
            `What You Need to Know About ${keywords || content.slice(0, 20)}`
          ],
          casual: [
            `${content.slice(0, 30)} - Let's Talk About It`,
            `So, What's the Deal with ${keywords || content.slice(0, 20)}?`,
            `${content.slice(0, 25)} Made Simple`,
            `Why ${keywords || content.slice(0, 20)} Actually Matters`,
            `The Truth About ${content.slice(0, 25)}`
          ],
          clickbait: [
            `You Won't Believe What ${content.slice(0, 20)} Can Do`,
            `${keywords || content.slice(0, 20)}: The Secret Nobody Tells You`,
            `This ${content.slice(0, 20)} Trick Changed Everything`,
            `Why Everyone's Wrong About ${keywords || content.slice(0, 15)}`,
            `${content.slice(0, 25)} - Number 3 Will Shock You`
          ],
          seo: [
            `${keywords || content.slice(0, 20)}: Complete Guide 2026`,
            `Best ${keywords || content.slice(0, 20)} Strategies & Tips`,
            `How to ${content.slice(0, 25)} - Step by Step`,
            `${keywords || content.slice(0, 20)} Benefits & Examples`,
            `Top ${keywords || content.slice(0, 20)} for Beginners`
          ],
          creative: [
            `Beyond ${content.slice(0, 25)}: A New Perspective`,
            `The Art of ${keywords || content.slice(0, 20)}`,
            `${content.slice(0, 20)}: Reimagined`,
            `Stories from ${keywords || content.slice(0, 20)}`,
            `The Hidden Beauty of ${content.slice(0, 20)}`
          ],
          news: [
            `${content.slice(0, 30)}: Latest Developments`,
            `Breaking: ${keywords || content.slice(0, 25)} Update`,
            `${content.slice(0, 25)} Report: Key Findings`,
            `Analysis: ${keywords || content.slice(0, 20)} Trends`,
            `${content.slice(0, 30)} - What Happened`
          ]
        }
        
        setTitles(templates[tone as keyof typeof templates] || templates.professional)
      }
    } catch (error) {
      console.error('Title generation failed:', error)
      setTitles([
        `${content.slice(0, 40)} - Title Option 1`,
        `Understanding ${content.slice(0, 30)}`,
        `${keywords || 'Key Insights'}: ${content.slice(0, 20)}`,
        `The Complete ${content.slice(0, 25)} Guide`,
        `Why ${content.slice(0, 30)} Matters`
      ])
    } finally {
      setLoading(false)
    }
  }

  const copyTitle = (title: string) => {
    navigator.clipboard.writeText(title)
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Link href="/text" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 inline-block">
          ← Back to Text Tools
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">✨ AI Title Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate compelling titles using browser-based AI</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Runs 100% in your browser - no data sent to servers</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Content or Topic</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Paste your article, blog post, or describe your topic..."
                rows={4}
                className="w-full mt-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{content.length} characters</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tone</label>
                <select
                  value={tone}
                  onChange={e => setTone(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  {tones.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Keywords (optional)</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={e => setKeywords(e.target.value)}
                  placeholder="SEO, marketing, etc"
                  className="w-full mt-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
            </div>

            <button
              onClick={generateTitles}
              disabled={!content.trim() || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {loading? 'Generating Titles...' : 'Generate 5 Titles'}
            </button>
          </div>

          {titles.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Generated Titles</h3>
              <div className="space-y-3">
                {titles.map((title, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                  >
                    <p className="text-sm sm:text-base font-medium flex-1 pr-4">{title}</p>
                    <button
                      onClick={() => copyTitle(title)}
                      className="opacity-0 group-hover:opacity-100 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900">
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  💡 Tip: Best titles are 50-60 characters for SEO. Click any title to copy.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Uses Chrome's built-in AI when available, falls back to smart templates
          </p>
        </div>
      </div>
    </main>
  )
}
