'use client'

import { useEffect, useState } from 'react'

export default function SavingsGoalCalculator() {
  const [targetAmount, setTargetAmount] = useState(1000000)
  const [currentSavings, setCurrentSavings] = useState(100000)
  const [years, setYears] = useState(5)
  const [rate, setRate] = useState(7)
  const [monthlyNeeded, setMonthlyNeeded] = useState(0)
  const [totalContribution, setTotalContribution] = useState(0)
  const [interestEarned, setInterestEarned] = useState(0)

  useEffect(() => {
    const fv = Number(targetAmount)
    const pv = Number(currentSavings)
    const r = Number(rate) / 100 / 12
    const n = Number(years) * 12

    if (fv > 0 && n > 0) {
      // PMT formula for savings goal
      const futureValueOfCurrent = pv * Math.pow(1 + r, n)
      const remainingNeeded = fv - futureValueOfCurrent
      
      let pmt = 0
      if (remainingNeeded > 0 && r > 0) {
        pmt = (remainingNeeded * r) / (Math.pow(1 + r, n) - 1)
      } else if (remainingNeeded > 0) {
        pmt = remainingNeeded / n
      }

      const totalContrib = pmt * n
      const totalInterest = fv - pv - totalContrib

      setMonthlyNeeded(Math.max(0, Math.round(pmt)))
      setTotalContribution(Math.round(totalContrib))
      setInterestEarned(Math.max(0, Math.round(totalInterest)))
    }
  }, [targetAmount, currentSavings, years, rate])

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Savings Goal Calculator</h1>
      <p className="text-gray-600 mb-8">Find out how much you need to save monthly to reach your financial target</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="goal-inputs-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="goal-inputs-heading" className="text-xl font-semibold mb-6">Goal Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="target-amount" className="block text-sm font-medium mb-2">
                  Target Amount: {formatINR(targetAmount)}
                </label>
                <input
                  id="target-amount"
                  type="range"
                  min="50000"
                  max="10000000"
                  step="10000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="current-savings" className="block text-sm font-medium mb-2">
                  Current Savings: {formatINR(currentSavings)}
                </label>
                <input
                  id="current-savings"
                  type="range"
                  min="0"
                  max="5000000"
                  step="5000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="time-to-goal" className="block text-sm font-medium mb-2">
                  Time to Goal: {years} Years
                </label>
                <input
                  id="time-to-goal"
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="expected-return" className="block text-sm font-medium mb-2">
                  Expected Return: {rate}% p.a.
                </label>
                <input
                  id="expected-return"
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="goal-results-heading">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-xl p-6 shadow-sm">
            <h2 id="goal-results-heading" className="text-xl font-semibold mb-6">Savings Plan</h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Monthly Savings Needed</p>
                <p className="text-3xl font-bold text-teal-600">{formatINR(monthlyNeeded)}</p>
                <p className="text-xs text-gray-500 mt-1">For {years} years</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Your Contributions</p>
                  <p className="text-lg font-semibold">{formatINR(totalContribution)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Interest Earned</p>
                  <p className="text-lg font-semibold text-teal-600">{formatINR(interestEarned)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Starting Amount</p>
                  <p className="text-lg font-semibold">{formatINR(currentSavings)}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-teal-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total at Goal</span>
                  <span className="font-bold">{formatINR(targetAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}