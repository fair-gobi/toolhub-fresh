'use client'

import { useState } from 'react'

const industries = ['SaaS', 'AI Tools', 'E-commerce', 'HealthTech', 'FinTech', 'EdTech', 'Creator Economy', 'Climate']
const problems = ['saves time', 'reduces cost', 'automates workflow', 'connects people', 'tracks data', 'simplifies finance']
const audiences = ['freelancers', 'small businesses', 'students', 'parents', 'developers', 'marketers']

export default function StartupIdea() {
  const [industry, setIndustry] = useState('SaaS')
  const [ideas, setIdeas] = useState<string[]>([])

  const generate = () => {
    const results = []
    for (let i = 0; i < 8; i++) {
      const problem = problems[Math.floor(Math.random() * problems.length)]
      const audience = audiences[Math.floor(Math.random() * audiences.length)]
      const idea = `${industry} tool that ${problem} for ${audience}`
      results.push(idea.charAt(0).toUpperCase() + idea.slice(1))
    }
    setIdeas(results)
  }

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Startup Idea Generator</h1>
      <p className="text-gray-600 mb-6">Get unique, actionable startup ideas instantly</p>
      
      <div className="bg-white border rounded-xl p-6 mb-6">
        <label className="block text-sm font-medium mb-2">Industry</label>
        <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-4">
          {industries.map(i => <option key={i}>{i}</option>)}
        </select>
        <button onClick={generate} className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700">
          Generate Ideas
        </button>
      </div>

      {ideas.length > 0 && (
        <div className="space-y-3">
          {ideas.map((idea, i) => (
            <div key={i} className="bg-white border rounded-lg p-4 flex justify-between">
              <span>{i+1}. {idea}</span>
              <button onClick={() => navigator.clipboard.writeText(idea)} className="text-blue-600 text-sm">Copy</button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
