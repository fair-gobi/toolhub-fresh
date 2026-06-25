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
      <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl p-6 mb-6">
  <div className="flex items-center gap-3">
    <span className="text-4xl">💡</span>
    <div>
      <h1 className="text-3xl font-bold">Startup Idea Generator</h1>
      <p className="opacity-90">Get unique, actionable startup ideas instantly</p>
    </div>
  </div>
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
