'use client'

import { useEffect, useState } from 'react'

export default function FireCalculator() {
  const [annualExpenses, setAnnualExpenses] = useState(600000)
  const [withdrawalRate, setWithdrawalRate] = useState(4)
  const [currentSavings, setCurrentSavings] = useState(500000)
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000)
  const [expectedReturn, setExpectedReturn] = useState(12)

  const [fireNumber, setFireNumber] = useState(0)
  const [yearsToFire, setYearsToFire] = useState(0)
  const [monthlyExpenses, setMonthlyExpenses] = useState(0)

  useEffect(() => {
    const expenses = Number(annualExpenses)
    const wr = Number(withdrawalRate) / 100
    const current = Number(currentSavings)
    const monthly = Number(monthlyInvestment)
    const ret = Number(expectedReturn) / 100 / 12

    // FIRE Number = Annual Expenses / Withdrawal Rate
    const fire = expenses / wr
    setFireNumber(Math.round(fire))
    setMonthlyExpenses(Math.round(expenses / 12))

    // Years to FIRE calculation
    if (monthly > 0 && ret > 0) {
      const months = Math.log((fire * ret + monthly) / (current * ret + monthly)) / Math.log(1 + ret)
      setYearsToFire(Math.max(0, months / 12))
    } else {
      setYearsToFire(0)
    }
  }, [annualExpenses, withdrawalRate, currentSavings, monthlyInvestment, expectedReturn])

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  const formatYears = (years: number) => {
    if (years < 1) return `${Math.round(years * 12)} months`
    const y = Math.floor(years)
    const m = Math.round((years - y) * 12)
    return m > 0 ? `${y}y ${m}m` : `${y} years`
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">FIRE Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate your Financial Independence, Retire Early number and years to freedom</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="fire-inputs-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="fire-inputs-heading" className="text-xl font-semibold mb-6">Your FIRE Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="annual-expenses" className="block text-sm font-medium mb-2">
                  Annual Expenses: {formatINR(annualExpenses)}
                </label>
                <input
                  id="annual-expenses"
                  type="range"
                  min="120000"
                  max="5000000"
                  step="10000"
                  value={annualExpenses}
                  onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Monthly: {formatINR(monthlyExpenses)}</p>
              </div>

              <div>
                <label htmlFor="withdrawal-rate" className="block text-sm font-medium mb-2">
                  Safe Withdrawal Rate: {withdrawalRate}%
                </label>
                <input
                  id="withdrawal-rate"
                  type="range"
                  min="3"
                  max="6"
                  step="0.25"
                  value={withdrawalRate}
                  onChange={(e) => setWithdrawalRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">4% is standard (25x expenses)</p>
              </div>

              <div>
                <label htmlFor="current-savings" className="block text-sm font-medium mb-2">
                  Current Savings: {formatINR(currentSavings)}
                </label>
                <input
                  id="current-savings"
                  type="range"
                  min="0"
                  max="10000000"
                  step="50000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="monthly-invest" className="block text-sm font-medium mb-2">
                  Monthly Investment: {formatINR(monthlyInvestment)}
                </label>
                <input
                  id="monthly-invest"
                  type="range"
                  min="1000"
                  max="200000"
                  step="1000"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="expected-return" className="block text-sm font-medium mb-2">
                  Expected Return: {expectedReturn}% p.a.
                </label>
                <input
                  id="expected-return"
                  type="range"
                  min="6"
                  max="18"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="fire-results-heading">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-xl p-6 shadow-sm">
            <h2 id="fire-results-heading" className="text-xl font-semibold mb-6">Your FIRE Path</h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Your FIRE Number</p>
                <p className="text-3xl font-bold text-orange-600">{formatINR(fireNumber)}</p>
                <p className="text-xs text-gray-500 mt-1">{(annualExpenses / (withdrawalRate / 100) / annualExpenses).toFixed(0)}x your annual expenses</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Years to FIRE</p>
                <p className="text-2xl font-bold text-red-600">{formatYears(yearsToFire)}</p>
                <p className="text-xs text-gray-500 mt-1">At current savings rate</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Monthly FIRE Income</p>
                  <p className="text-lg font-semibold">{formatINR(monthlyExpenses)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Withdrawal Rate</p>
                  <p className="text-lg font-semibold">{withdrawalRate}%</p>
                </div>
              </div>

              <div className="pt-4 border-t border-orange-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress to FIRE</span>
                  <span className="font-medium">{Math.min(100, ((currentSavings / fireNumber) * 100)).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-orange-600 h-2.5 rounded-full transition-all" 
                    style={{ width: `${Math.min(100, (currentSavings / fireNumber) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">You need {formatINR(Math.max(0, fireNumber - currentSavings))} more</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}