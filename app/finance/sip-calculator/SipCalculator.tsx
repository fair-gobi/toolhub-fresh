'use client'

import { useEffect, useState } from 'react'

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const [futureValue, setFutureValue] = useState(0)
  const [invested, setInvested] = useState(0)
  const [returns, setReturns] = useState(0)

  useEffect(() => {
    const p = Number(monthlyInvestment)
    const r = Number(rate) / 100 / 12
    const n = Number(years) * 12

    if (p > 0 && r > 0 && n > 0) {
      const fv = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
      const totalInvested = p * n
      const totalReturns = fv - totalInvested

      setFutureValue(Math.round(fv))
      setInvested(Math.round(totalInvested))
      setReturns(Math.round(totalReturns))
    }
  }, [monthlyInvestment, rate, years])

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">SIP Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate returns on your Systematic Investment Plan and see how your wealth grows over time</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="investment-details-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="investment-details-heading" className="text-xl font-semibold mb-6">Investment Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="monthly-sip" className="block text-sm font-medium mb-2">
                  Monthly Investment: {formatINR(monthlyInvestment)}
                </label>
                <input
                  id="monthly-sip"
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹500</span>
                  <span>₹1L</span>
                </div>
              </div>

              <div>
                <label htmlFor="return-rate" className="block text-sm font-medium mb-2">
                  Expected Annual Return: {rate}%
                </label>
                <input
                  id="return-rate"
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              <div>
                <label htmlFor="time-period" className="block text-sm font-medium mb-2">
                  Investment Period: {years} Years
                </label>
                <input
                  id="time-period"
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 Yr</span>
                  <span>40 Yrs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="wealth-summary-heading">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-6 shadow-sm">
            <h2 id="wealth-summary-heading" className="text-xl font-semibold mb-6">Wealth Summary</h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Expected Future Value</p>
                <p className="text-3xl font-bold text-green-600">{formatINR(futureValue)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Total Invested</p>
                  <p className="text-lg font-semibold">{formatINR(invested)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Est. Returns</p>
                  <p className="text-lg font-semibold text-emerald-600">{formatINR(returns)}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-green-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Total Returns</span>
                  <span className="font-medium">{((returns / invested) * 100 || 0).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${(returns / futureValue) * 100 || 0}%` }}
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
