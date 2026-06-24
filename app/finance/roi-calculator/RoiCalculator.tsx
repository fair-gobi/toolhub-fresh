
'use client'

import { useEffect, useState } from 'react'

export default function RoiCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(100000)
  const [finalValue, setFinalValue] = useState(150000)
  const [investmentPeriod, setInvestmentPeriod] = useState(3)
  const [additionalCosts, setAdditionalCosts] = useState(5000)

  const [totalProfit, setTotalProfit] = useState(0)
  const [roi, setRoi] = useState(0)
  const [annualizedRoi, setAnnualizedRoi] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    const initial = Number(initialInvestment)
    const final = Number(finalValue)
    const costs = Number(additionalCosts)
    const years = Number(investmentPeriod)

    if (initial > 0) {
      const totalInvested = initial + costs
      const profit = final - totalInvested
      const roiPercent = (profit / totalInvested) * 100
      const annualized = years > 0 ? (Math.pow(final / totalInvested, 1 / years) - 1) * 100 : 0

      setTotalCost(totalInvested)
      setTotalProfit(Math.round(profit))
      setRoi(Number(roiPercent.toFixed(2)))
      setAnnualizedRoi(Number(annualized.toFixed(2)))
    }
  }, [initialInvestment, finalValue, investmentPeriod, additionalCosts])

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  const getRoiColor = () => {
    if (roi > 15) return 'text-green-600'
    if (roi > 0) return 'text-emerald-600'
    if (roi === 0) return 'text-gray-600'
    return 'text-red-600'
  }

  const getRoiLabel = () => {
    if (roi > 20) return 'Excellent'
    if (roi > 15) return 'Good'
    if (roi > 10) return 'Average'
    if (roi > 0) return 'Low'
    if (roi === 0) return 'Break-even'
    return 'Loss'
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">ROI Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate return on investment (ROI) and annualized return for any investment</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="roi-inputs-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="roi-inputs-heading" className="text-xl font-semibold mb-6">Investment Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="initial-investment" className="block text-sm font-medium mb-2">
                  Initial Investment: {formatINR(initialInvestment)}
                </label>
                <input
                  id="initial-investment"
                  type="range"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="final-value" className="block text-sm font-medium mb-2">
                  Final Value / Sale Price: {formatINR(finalValue)}
                </label>
                <input
                  id="final-value"
                  type="range"
                  min="0"
                  max="20000000"
                  step="1000"
                  value={finalValue}
                  onChange={(e) => setFinalValue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="additional-costs" className="block text-sm font-medium mb-2">
                  Additional Costs: {formatINR(additionalCosts)}
                </label>
                <input
                  id="additional-costs"
                  type="range"
                  min="0"
                  max="500000"
                  step="500"
                  value={additionalCosts}
                  onChange={(e) => setAdditionalCosts(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Fees, taxes, maintenance, etc.</p>
              </div>

              <div>
                <label htmlFor="investment-period" className="block text-sm font-medium mb-2">
                  Investment Period: {investmentPeriod} {investmentPeriod === 1 ? 'Year' : 'Years'}
                </label>
                <input
                  id="investment-period"
                  type="range"
                  min="0.25"
                  max="30"
                  step="0.25"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="roi-results-heading">
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-xl p-6 shadow-sm">
            <h2 id="roi-results-heading" className="text-xl font-semibold mb-6">ROI Analysis</h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Return on Investment (ROI)</p>
                <div className="flex items-baseline gap-3">
                  <p className={`text-3xl font-bold ${getRoiColor()}`}>{roi}%</p>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    roi > 0 ? 'bg-green-100 text-green-700' : roi < 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {getRoiLabel()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Annualized ROI</p>
                  <p className={`text-xl font-bold ${getRoiColor()}`}>{annualizedRoi}%</p>
                  <p className="text-xs text-gray-500">per year</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Total Profit</p>
                  <p className={`text-xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatINR(totalProfit)}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-medium mb-3 text-gray-700">Investment Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Initial Investment:</span>
                    <span>{formatINR(initialInvestment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Additional Costs:</span>
                    <span>{formatINR(additionalCosts)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-medium">
                    <span>Total Cost:</span>
                    <span>{formatINR(totalCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Final Value:</span>
                    <span className="text-green-600">{formatINR(finalValue)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Net Gain/Loss:</span>
                    <span className={totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatINR(totalProfit)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}