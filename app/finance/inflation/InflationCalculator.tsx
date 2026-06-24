'use client'

import { useEffect, useState } from 'react'

export default function InflationCalculator() {
  const [currentAmount, setCurrentAmount] = useState(100000)
  const [inflationRate, setInflationRate] = useState(6)
  const [years, setYears] = useState(10)
  const [mode, setMode] = useState<'future' | 'past'>('future')
  
  const [futureValue, setFutureValue] = useState(0)
  const [purchasingPower, setPurchasingPower] = useState(0)
  const [inflationLoss, setInflationLoss] = useState(0)

  useEffect(() => {
    const amount = Number(currentAmount)
    const rate = Number(inflationRate) / 100
    const y = Number(years)

    if (amount > 0 && y > 0) {
      if (mode === 'future') {
        // Future cost: how much will something cost
        const fv = amount * Math.pow(1 + rate, y)
        const loss = fv - amount
        setFutureValue(Math.round(fv))
        setPurchasingPower(Math.round(amount / Math.pow(1 + rate, y)))
        setInflationLoss(Math.round(loss))
      } else {
        // Past value: what was it worth
        const pv = amount / Math.pow(1 + rate, y)
        const loss = amount - pv
        setFutureValue(Math.round(pv))
        setPurchasingPower(Math.round(pv))
        setInflationLoss(Math.round(loss))
      }
    }
  }, [currentAmount, inflationRate, years, mode])

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Inflation Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate how inflation affects purchasing power and future costs</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="inflation-inputs-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="inflation-inputs-heading" className="text-xl font-semibold mb-6">Calculation Details</h2>
            
            <div className="space-y-6">
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setMode('future')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                    mode === 'future' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Future Cost
                </button>
                <button
                  onClick={() => setMode('past')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                    mode === 'past' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Past Value
                </button>
              </div>

              <div>
                <label htmlFor="current-amount" className="block text-sm font-medium mb-2">
                  {mode === 'future' ? 'Current Cost' : 'Current Amount'}: {formatINR(currentAmount)}
                </label>
                <input
                  id="current-amount"
                  type="range"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="inflation-rate" className="block text-sm font-medium mb-2">
                  Inflation Rate: {inflationRate}%
                </label>
                <input
                  id="inflation-rate"
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">India average: 5-6%</p>
              </div>

              <div>
                <label htmlFor="years" className="block text-sm font-medium mb-2">
                  Time Period: {years} Years
                </label>
                <input
                  id="years"
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="inflation-results-heading">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-6 shadow-sm">
            <h2 id="inflation-results-heading" className="text-xl font-semibold mb-6">
              {mode === 'future' ? 'Future Impact' : 'Historical Value'}
            </h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">
                  {mode === 'future' ? 'Future Cost' : 'Equivalent Past Value'}
                </p>
                <p className="text-3xl font-bold text-amber-600">{formatINR(futureValue)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {mode === 'future' ? `in ${years} years` : `${years} years ago`}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Purchasing Power</p>
                  <p className="text-lg font-semibold">{formatINR(purchasingPower)}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {mode === 'future' 
                      ? `Today's ${formatINR(currentAmount)} will buy what ${formatINR(purchasingPower)} buys now`
                      : `Was worth ${formatINR(currentAmount)} today`
                    }
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">
                    {mode === 'future' ? 'Price Increase' : 'Value Lost'}
                  </p>
                  <p className="text-lg font-semibold text-orange-600">{formatINR(inflationLoss)}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {((inflationLoss / currentAmount) * 100).toFixed(0)}% {mode === 'future' ? 'increase' : 'erosion'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-200">
                <p className="text-sm text-gray-600 mb-2">Year-by-year impact:</p>
                <div className="space-y-1 text-xs max-h-24 overflow-y-auto">
                  {[1, 5, 10, 15, 20, 25, 30].filter(y => y <= years).map((y) => {
                    const val = mode === 'future' 
                      ? currentAmount * Math.pow(1 + inflationRate/100, y)
                      : currentAmount / Math.pow(1 + inflationRate/100, y)
                    return (
                      <div key={y} className="flex justify-between">
                        <span className="text-gray-500">Year {y}:</span>
                        <span className="font-medium">{formatINR(Math.round(val))}</span>
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