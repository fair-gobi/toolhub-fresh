


'use client'

import { useEffect, useState } from 'react'

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [currentMonthlyExpense, setCurrentMonthlyExpense] = useState(50000)
  const [inflationRate, setInflationRate] = useState(6)
  const [returnRate, setReturnRate] = useState(12)
  const [lifeExpectancy, setLifeExpectancy] = useState(85)
  
  const [corpusRequired, setCorpusRequired] = useState(0)
  const [monthlyInvestment, setMonthlyInvestment] = useState(0)
  const [futureMonthlyExpense, setFutureMonthlyExpense] = useState(0)

  useEffect(() => {
    const yearsToRetire = Number(retirementAge) - Number(currentAge)
    const yearsPostRetire = Number(lifeExpectancy) - Number(retirementAge)
    const inf = Number(inflationRate) / 100
    const ret = Number(returnRate) / 100 / 12
    const monthlyExpense = Number(currentMonthlyExpense)

    if (yearsToRetire > 0 && yearsPostRetire > 0 && monthlyExpense > 0) {
      // Future monthly expense at retirement
      const futureExpense = monthlyExpense * Math.pow(1 + inf, yearsToRetire)
      setFutureMonthlyExpense(Math.round(futureExpense))

      // Corpus needed at retirement = futureExpense * 12 * yearsPostRetire
      // Simplified: Assuming expenses grow with inflation and returns match withdrawal rate
      const yearlyExpenseAtRetire = futureExpense * 12
      const corpus = yearlyExpenseAtRetire * yearsPostRetire
      setCorpusRequired(Math.round(corpus))

      // Monthly SIP needed to reach corpus
      const months = yearsToRetire * 12
      const monthlySip = corpus * ret / (Math.pow(1 + ret, months) - 1)
      setMonthlyInvestment(Math.round(monthlySip))
    }
  }, [currentAge, retirementAge, currentMonthlyExpense, inflationRate, returnRate, lifeExpectancy])

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Retirement Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate your retirement corpus and plan monthly investments to retire comfortably</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="retirement-inputs-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="retirement-inputs-heading" className="text-xl font-semibold mb-6">Your Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="current-age" className="block text-sm font-medium mb-2">
                  Current Age: {currentAge} years
                </label>
                <input
                  id="current-age"
                  type="range"
                  min="18"
                  max="55"
                  step="1"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="retirement-age" className="block text-sm font-medium mb-2">
                  Retirement Age: {retirementAge} years
                </label>
                <input
                  id="retirement-age"
                  type="range"
                  min={currentAge + 1}
                  max="70"
                  step="1"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="monthly-expense" className="block text-sm font-medium mb-2">
                  Current Monthly Expenses: {formatINR(currentMonthlyExpense)}
                </label>
                <input
                  id="monthly-expense"
                  type="range"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={currentMonthlyExpense}
                  onChange={(e) => setCurrentMonthlyExpense(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="inflation" className="block text-sm font-medium mb-2">
                  Expected Inflation: {inflationRate}%
                </label>
                <input
                  id="inflation"
                  type="range"
                  min="3"
                  max="10"
                  step="0.5"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="return-rate" className="block text-sm font-medium mb-2">
                  Expected Return on Investment: {returnRate}% p.a.
                </label>
                <input
                  id="return-rate"
                  type="range"
                  min="6"
                  max="20"
                  step="0.5"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="life-expectancy" className="block text-sm font-medium mb-2">
                  Life Expectancy: {lifeExpectancy} years
                </label>
                <input
                  id="life-expectancy"
                  type="range"
                  min={retirementAge + 1}
                  max="100"
                  step="1"
                  value={lifeExpectancy}
                  onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="retirement-results-heading">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-xl p-6 shadow-sm">
            <h2 id="retirement-results-heading" className="text-xl font-semibold mb-6">Retirement Plan</h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Corpus Required at Retirement</p>
                <p className="text-3xl font-bold text-orange-600">{formatINR(corpusRequired)}</p>
                <p className="text-xs text-gray-500 mt-1">At age {retirementAge}</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Monthly Investment Needed</p>
                <p className="text-2xl font-bold text-emerald-600">{formatINR(monthlyInvestment)}</p>
                <p className="text-xs text-gray-500 mt-1">For next {retirementAge - currentAge} years</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Future Monthly Expense</p>
                  <p className="text-lg font-semibold">{formatINR(futureMonthlyExpense)}</p>
                  <p className="text-xs text-gray-500 mt-1">At retirement</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Retirement Years</p>
                  <p className="text-lg font-semibold">{lifeExpectancy - retirementAge} years</p>
                  <p className="text-xs text-gray-500 mt-1">Post retirement</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

