'use client'

import { useState } from 'react'
import Link from 'next/link'

const tools = [
  { name: 'SIP Calculator', slug: 'sip-calculator', desc: 'Calculate returns on your Systematic Investment Plan' },
  { name: 'Compound Interest Calculator', slug: 'compound-interest', desc: 'Calculate compound interest on investments' },
  { name: 'Retirement Calculator', slug: 'retirement', desc: 'Plan your retirement savings' },
  { name: 'Investment Return Calculator', slug: 'investment-return', desc: 'Calculate annualized return on investments' },
  { name: 'FIRE Calculator', slug: 'fire', desc: 'Calculate Financial Independence number' },
  { name: 'Savings Goal Calculator', slug: 'savings-goal', desc: 'Find monthly savings needed for your goal' },
  { name: 'Profit Margin Calculator', slug: 'profit-margin', desc: 'Calculate gross, net, and operating margins' },
  { name: 'Break Even Calculator', slug: 'break-even', desc: 'Find your break-even point' },
  { name: 'ROI Calculator', slug: 'roi-calculator', desc: 'Calculate Return on Investment' },
  { name: 'Cash Flow Calculator', slug: 'cash-flow', desc: 'Track business inflows and outflows' },
  { name: 'Startup Runway Calculator', slug: 'startup-runway', desc: 'Calculate how long your cash will last' },
  { name: 'Crypto Profit Calculator', slug: 'crypto-profit', desc: 'Calculate profit/loss on crypto trades' },
  { name: 'Mining Profit Calculator', slug: 'mining-profit', desc: 'Calculate crypto mining profitability' },
  { name: 'DCA Calculator', slug: 'dca-calculator', desc: 'Calculate Dollar Cost Averaging' },
  { name: 'Inflation Calculator', slug: 'inflation', desc: 'See how inflation impacts purchasing power' },
  { name: 'Loan EMI Calculator', slug: 'loan-emi', desc: 'Calculate your monthly EMI for loans' }
]

export default function FinancePage() {
  const [search, setSearch] = useState('')
  
  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.desc.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-4xl font-bold mb-2">Finance Calculators</h1>
      <p className="text-gray-600 mb-8">16 free tools to plan your money better</p>
      
      <input
        type="text"
        placeholder="Search calculators..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg mb-8"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/finance/${tool.slug}`}
            className="block bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-gray-600 text-sm">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
