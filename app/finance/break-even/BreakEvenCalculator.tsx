'use client'

import { useEffect, useState } from 'react'

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState(50000)
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(200)
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState(500)
  
  const [breakEvenUnits, setBreakEvenUnits] = useState(0)
  const [breakEvenSales, setBreakEvenSales] = useState(0)
  const [contributionMargin, setContributionMargin] = useState(0)
  const [contributionMarginPercent, setContributionMarginPercent] = useState(0)

  useEffect(() => {
    const fixed = Number(fixedCosts)
    const variable = Number(variableCostPerUnit)
    const price = Number(sellingPricePerUnit)

    if (price > variable && fixed >= 0) {
      const cm = price - variable
      const cmPercent = (cm / price) * 100
      const beUnits = fixed / cm
      const beSales = beUnits * price

      setContributionMargin(Math.round(cm))
      setContributionMarginPercent(Number(cmPercent.toFixed(1)))
      setBreakEvenUnits(Math.ceil(beUnits))
      setBreakEvenSales(Math.round(beSales))
    } else {
      setBreakEvenUnits(0)
      setBreakEvenSales(0)
      setContributionMargin(0)
      setContributionMarginPercent(0)
    }
  }, [fixedCosts, variableCostPerUnit, sellingPricePerUnit])

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Break-Even Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate how many units you need to sell to cover all your costs</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="be-inputs-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="be-inputs-heading" className="text-xl font-semibold mb-6">Business Costs</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="fixed-costs" className="block text-sm font-medium mb-2">
                  Fixed Costs (Monthly): {formatINR(fixedCosts)}
                </label>
                <input
                  id="fixed-costs"
                  type="range"
                  min="1000"
                  max="500000"
                  step="1000"
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Rent, salaries, insurance, etc.</p>
              </div>

              <div>
                <label htmlFor="variable-cost" className="block text-sm font-medium mb-2">
                  Variable Cost per Unit: {formatINR(variableCostPerUnit)}
                </label>
                <input
                  id="variable-cost"
                  type="range"
                  min="10"
                  max="5000"
                  step="10"
                  value={variableCostPerUnit}
                  onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Materials, packaging, commission</p>
              </div>

              <div>
                <label htmlFor="selling-price" className="block text-sm font-medium mb-2">
                  Selling Price per Unit: {formatINR(sellingPricePerUnit)}
                </label>
                <input
                  id="selling-price"
                  type="range"
                  min="10"
                  max="10000"
                  step="10"
                  value={sellingPricePerUnit}
                  onChange={(e) => setSellingPricePerUnit(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Price you charge customers</p>
              </div>

              {sellingPricePerUnit <= variableCostPerUnit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">⚠️ Selling price must be higher than variable cost to break even</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section aria-labelledby="be-results-heading">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 shadow-sm">
            <h2 id="be-results-heading" className="text-xl font-semibold mb-6">Break-Even Analysis</h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Break-Even Point</p>
                <p className="text-3xl font-bold text-blue-600">{breakEvenUnits.toLocaleString('en-IN')} units</p>
                <p className="text-xs text-gray-500 mt-1">Units you must sell</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Break-Even Sales</p>
                <p className="text-2xl font-bold text-indigo-600">{formatINR(breakEvenSales)}</p>
                <p className="text-xs text-gray-500 mt-1">Revenue needed to break even</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Contribution Margin</p>
                  <p className="text-lg font-semibold">{formatINR(contributionMargin)}</p>
                  <p className="text-xs text-gray-500">per unit</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Margin %</p>
                  <p className="text-lg font-semibold text-blue-600">{contributionMarginPercent}%</p>
                  <p className="text-xs text-gray-500">of selling price</p>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-200">
                <h3 className="text-sm font-medium mb-3">Profit at different sales levels:</h3>
                <div className="space-y-2 text-sm">
                  {[
                    Math.floor(breakEvenUnits * 0.5),
                    breakEvenUnits,
                    Math.ceil(breakEvenUnits * 1.5),
                    Math.ceil(breakEvenUnits * 2)
                  ].map((units) => {
                    const profit = (units * contributionMargin) - fixedCosts
                    return (
                      <div key={units} className="flex justify-between">
                        <span className="text-gray-600">{units.toLocaleString('en-IN')} units:</span>
                        <span className={profit >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          {formatINR(profit)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}