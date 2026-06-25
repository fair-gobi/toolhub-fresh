'use client'

import { useState } from 'react'

export default function BusinessPlanGenerator() {
  const [idea, setIdea] = useState('')
  const [industry, setIndustry] = useState('SaaS')
  const [audience, setAudience] = useState('')
  const [plan, setPlan] = useState('')

  const generate = () => {
    const biz = idea || 'AI productivity tool'
    const aud = audience || 'remote teams'
    const ind = industry

    const output = `# Business Plan: ${biz}

## 1. Executive Summary
${biz} is a ${ind} startup helping ${aud} solve critical workflow problems through AI automation.

## 2. Problem
${aud} waste 10+ hours weekly on manual tasks, losing $5,000+ annually in productivity.

## 3. Solution
We provide an intuitive platform that automates repetitive work, integrates with existing tools, and delivers results in minutes not hours.

## 4. Target Market
Primary: ${aud} (2.3M globally)
Market size: $${ind === 'SaaS' ? '200B' : '50B'} growing 25% YoY

## 5. Business Model
- Freemium: Free tier (1,000 users)
- Pro: $29/month
- Enterprise: $199/month

## 6. Go-to-Market
1. Product Hunt launch
2. Content marketing (SEO)
3. Partnerships with ${ind} tools

## 7. Financials (Year 1)
Revenue: $180K | Costs: $80K | Profit: $100K

## 8. Ask
Seeking $250K to reach 10,000 users in 12 months.`

    setPlan(output)
  }

  const copyPlan = () => navigator.clipboard.writeText(plan)

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">📋</span>
          <div>
            <h1 className="text-3xl font-bold">Business Plan Generator</h1>
            <p className="opacity-90">Generate a complete 1-page plan in seconds</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Business idea" className="border rounded-lg px-3 py-2" />
          <select value={industry} onChange={e=>setIndustry(e.target.value)} className="border rounded-lg px-3 py-2">
            {['SaaS','E-commerce','AI Tools','HealthTech','FinTech','EdTech'].map(i=> <option key={i}>{i}</option>)}
          </select>
          <input value={audience} onChange={e=>setAudience(e.target.value)} placeholder="Target audience" className="border rounded-lg px-3 py-2" />
        </div>
        <button onClick={generate} className="w-full bg-indigo-600 text-white rounded-lg py-3 font-medium hover:bg-indigo-700">
          Generate Business Plan
        </button>
      </div>

      {plan && (
        <div className="bg-gray-50 border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Your Business Plan</h2>
            <button onClick={copyPlan} className="text-sm bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Copy All</button>
          </div>
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{plan}</pre>
        </div>
      )}
    </main>
  )
}
