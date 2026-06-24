'use client'

import { useEffect, useState } from 'react'

export default function ProfitMarginCalculator() {
  const [cost, setCost] = useState(500)
  const [revenue, setRevenue] = useState(800)
  const [mode, setMode] = useState<'margin' | 'markup'>('margin')
  
  const [profit, setProfit] = useState(0)
  const [margin, setMargin] = useState(0)
  const [markup, setMarkup] = useState(0)

  useEffect(() => {
    const c = Number(cost)
    const r = Number(revenue)

    if (c > 0 && r > 0) {
      const p = r - c
      const marginCalc = (p / r) * 100
      const markupCalc = (p / c) * 100

      setProfit(Math.round(p))
      setMargin(Number(marginCalc.toFixed(2)))
      setMarkup(Number(markupCalc.toFixed(2)))
    }
  }, [cost, revenue])

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  // Calculate selling price from cost + desired margin/markup
  const calculatePrice = (targetPercent: number) => {
    const c = Number(cost)
    if (mode === 'margin') {
      return c / (1 - targetPercent / 100)
    } else {
      return c * (1 + targetPercent / 100)
    }
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Profit Margin Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate gross profit margin, markup percentage, and optimal selling price</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="profit-inputs-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="profit-inputs-heading" className="text-xl font-semibold mb-6">Cost & Revenue</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="cost-price" className="block text-sm font-medium mb-2">
                  Cost Price: {formatINR(cost)}
                </label>
                <input
                  id="cost-price"
                  type="range"
                  min="10"
                  max="100000"
                  step="10"
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="selling-price" className="block text-sm font-medium mb-2">
                  Selling Price (Revenue): {formatINR(revenue)}
                </label>
                <input
                  id="selling-price"
                  type="range"
                  min="10"
                  max="200000"
                  step="10"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t">
                <label className="block text-sm font-medium mb-3">Calculate Price From:</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="mode"
                      checked={mode === 'margin'}
                      onChange={() => setMode('margin')}
                      className="mr-2"
                    />
                    Desired Margin
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="mode"
                      checked={mode === 'markup'}
                      onChange={() => setMode('markup')}
                      className="mr-2"
                    />
                    Desired Markup
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[20, 30, 50].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => setRevenue(Math.round(calculatePrice(percent)))}
                    className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  >
                    {percent}% {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="profit-results-heading">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 rounded-xl p-6 shadow-sm">
            <h2 id="profit-results-heading" className="text-xl font-semibold mb-6">Profit Analysis</h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Profit Amount</p>
                <p className="text-3xl font-bold text-emerald-600">{formatINR(profit)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Profit Margin</p>
                  <p className="text-2xl font-bold text-emerald-600">{margin}%</p>
                  <p className="text-xs text-gray-500 mt-1">(Profit ÷ Revenue)</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Markup</p>
                  <p className="text-2xl font-bold text-green-600">{markup}%</p>
                  <p className="text-xs text-gray-500 mt-1">(Profit ÷ Cost)</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-600">Cost vs Profit</p>
                  <p className="text-xs text-gray-500">{((cost / revenue) * 100).toFixed(0)}% / {((profit / revenue) * 100).toFixed(0)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 flex overflow-hidden">
                  <div 
                    className="bg-gray-400 h-3" 
                    style={{ width: `${(cost / revenue) * 100}%` }}
                    title="Cost"
                  ></div>
                  <div 
                    className="bg-emerald-500 h-3" 
                    style={{ width: `${(profit / revenue) * 100}%` }}
                    title="Profit"
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Cost: {formatINR(cost)}</span>
                  <span>Profit: {formatINR(profit)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}