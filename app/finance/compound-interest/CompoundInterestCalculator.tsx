'use client'

import { useEffect, useState } from 'react'

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(5)
  const [compound, setCompound] = useState(1)
  const [futureValue, setFutureValue] = useState(0)
  const [interest, setInterest] = useState(0)

  useEffect(() => {
    const p = Number(principal)
    const r = Number(rate) / 100
    const n = Number(compound)
    const t = Number(years)

    if (p > 0 && r > 0 && t > 0) {
      const fv = p * Math.pow(1 + r / n, n * t)
      const int = fv - p
      setFutureValue(Math.round(fv))
      setInterest(Math.round(int))
    }
  }, [principal, rate, years, compound])

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  const compoundLabels: Record<number, string> = {
    1: 'Yearly',
    2: 'Half-Yearly', 
    4: 'Quarterly',
    12: 'Monthly'
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Compound Interest Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate how your investment grows with the power of compounding</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="ci-inputs-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="ci-inputs-heading" className="text-xl font-semibold mb-6">Investment Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="ci-principal" className="block text-sm font-medium mb-2">
                  Principal Amount: {formatINR(principal)}
                </label>
                <input
                  id="ci-principal"
                  type="range"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="ci-rate" className="block text-sm font-medium mb-2">
                  Annual Interest Rate: {rate}%
                </label>
                <input
                  id="ci-rate"
                  type="range"
                  min="1"
                  max="25"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="ci-years" className="block text-sm font-medium mb-2">
                  Time Period: {years} Years
                </label>
                <input
                  id="ci-years"
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="ci-frequency" className="block text-sm font-medium mb-2">Compounding Frequency</label>
                <select 
                  id="ci-frequency"
                  value={compound} 
                  onChange={(e) => setCompound(Number(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value={1}>Yearly</option>
                  <option value={2}>Half-Yearly</option>
                  <option value={4}>Quarterly</option>
                  <option value={12}>Monthly</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="ci-results-heading">
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 rounded-xl p-6 shadow-sm">
            <h2 id="ci-results-heading" className="text-xl font-semibold mb-6">Growth Summary</h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Future Value</p>
                <p className="text-3xl font-bold text-purple-600">{formatINR(futureValue)}</p>
                <p className="text-xs text-gray-500 mt-1">Compounded {compoundLabels[compound]}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
                  <p className="text-lg font-semibold">{formatINR(principal)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Compound Interest</p>
                  <p className="text-lg font-semibold text-purple-600">{formatINR(interest)}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Interest Earned</span>
                  <span className="font-medium">{((interest / principal) * 100 || 0).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full" 
                    style={{ width: `${(interest / futureValue) * 100 || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}