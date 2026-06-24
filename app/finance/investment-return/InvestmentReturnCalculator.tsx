

'use client'

import { useEffect, useState } from 'react'

export default function InvestmentReturnCalculator() {
  const [initialAmount, setInitialAmount] = useState(100000)
  const [finalAmount, setFinalAmount] = useState(180000)
  const [years, setYears] = useState(5)
  const [absoluteReturn, setAbsoluteReturn] = useState(0)
  const [cagr, setCagr] = useState(0)
  const [annualizedReturn, setAnnualizedReturn] = useState(0)

  useEffect(() => {
    const initial = Number(initialAmount)
    const final = Number(finalAmount)
    const y = Number(years)

    if (initial > 0 && final > 0 && y > 0) {
      const absReturn = ((final - initial) / initial) * 100
      const cagrCalc = (Math.pow(final / initial, 1 / y) - 1) * 100

      setAbsoluteReturn(Number(absReturn.toFixed(2)))
      setCagr(Number(cagrCalc.toFixed(2)))
      setAnnualizedReturn(Number(cagrCalc.toFixed(2)))
    }
  }, [initialAmount, finalAmount, years])

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Investment Return Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate CAGR, absolute return, and annualized return on your investments</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="investment-inputs-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="investment-inputs-heading" className="text-xl font-semibold mb-6">Investment Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="initial-amount" className="block text-sm font-medium mb-2">
                  Initial Investment: {formatINR(initialAmount)}
                </label>
                <input
                  id="initial-amount"
                  type="range"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="final-amount" className="block text-sm font-medium mb-2">
                  Final Value: {formatINR(finalAmount)}
                </label>
                <input
                  id="final-amount"
                  type="range"
                  min="1000"
                  max="50000000"
                  step="1000"
                  value={finalAmount}
                  onChange={(e) => setFinalAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="investment-years" className="block text-sm font-medium mb-2">
                  Investment Duration: {years} Years
                </label>
                <input
                  id="investment-years"
                  type="range"
                  min="0.5"
                  max="50"
                  step="0.5"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="return-results-heading">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-xl p-6 shadow-sm">
            <h2 id="return-results-heading" className="text-xl font-semibold mb-6">Return Analysis</h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">CAGR / Annualized Return</p>
                <p className="text-3xl font-bold text-teal-600">{cagr}%</p>
                <p className="text-xs text-gray-500 mt-1">Compound Annual Growth Rate</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Absolute Return</p>
                  <p className="text-lg font-semibold">{absoluteReturn}%</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Total Gain</p>
                  <p className="text-lg font-semibold text-teal-600">{formatINR(finalAmount - initialAmount)}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Investment Growth</p>
                <div className="flex items-end gap-2 h-16">
                  <div className="flex-1 bg-gray-200 rounded" style={{ height: `${(initialAmount / finalAmount) * 100}%` }}>
                    <div className="text-xs text-center pt-1 text-gray-600">Initial</div>
                  </div>
                  <div className="flex-1 bg-teal-600 rounded">
                    <div className="text-xs text-center pt-1 text-white">Final</div>
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

