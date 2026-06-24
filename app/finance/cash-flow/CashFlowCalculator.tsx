'use client'

import { useEffect, useState } from 'react'

export default function CashFlowCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(200000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(150000)
  const [capex, setCapex] = useState(20000)
  const [currentCash, setCurrentCash] = useState(500000)
  const [taxRate, setTaxRate] = useState(25)

  const [operatingCashFlow, setOperatingCashFlow] = useState(0)
  const [freeCashFlow, setFreeCashFlow] = useState(0)
  const [monthlyBurn, setMonthlyBurn] = useState(0)
  const [runwayMonths, setRunwayMonths] = useState(0)
  const [netProfit, setNetProfit] = useState(0)

  useEffect(() => {
    const revenue = Number(monthlyRevenue)
    const expenses = Number(monthlyExpenses)
    const capitalExp = Number(capex)
    const cash = Number(currentCash)
    const tax = Number(taxRate) / 100

    const ebit = revenue - expenses
    const taxAmount = Math.max(0, ebit * tax)
    const profit = ebit - taxAmount
    const operatingCF = profit + (expenses * 0.1) // simplified depreciation add-back
    const freeCF = operatingCF - capitalExp
    const burn = Math.max(0, expenses - revenue)
    const runway = burn > 0 ? cash / burn : 999

    setNetProfit(Math.round(profit))
    setOperatingCashFlow(Math.round(operatingCF))
    setFreeCashFlow(Math.round(freeCF))
    setMonthlyBurn(Math.round(burn))
    setRunwayMonths(runway)
  }, [monthlyRevenue, monthlyExpenses, capex, currentCash, taxRate])

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  const formatRunway = (months: number) => {
    if (months >= 999) return 'Profitable'
    if (months < 1) return '< 1 month'
    const y = Math.floor(months / 12)
    const m = Math.round(months % 12)
    return y > 0 ? `${y}y ${m}m` : `${m} months`
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Cash Flow Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate operating cash flow, free cash flow, and how long your cash will last</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="cf-inputs-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="cf-inputs-heading" className="text-xl font-semibold mb-6">Monthly Business Figures</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="revenue" className="block text-sm font-medium mb-2">
                  Monthly Revenue: {formatINR(monthlyRevenue)}
                </label>
                <input
                  id="revenue"
                  type="range"
                  min="0"
                  max="2000000"
                  step="10000"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="expenses" className="block text-sm font-medium mb-2">
                  Monthly Operating Expenses: {formatINR(monthlyExpenses)}
                </label>
                <input
                  id="expenses"
                  type="range"
                  min="0"
                  max="2000000"
                  step="10000"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="capex" className="block text-sm font-medium mb-2">
                  Monthly CAPEX: {formatINR(capex)}
                </label>
                <input
                  id="capex"
                  type="range"
                  min="0"
                  max="500000"
                  step="5000"
                  value={capex}
                  onChange={(e) => setCapex(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Equipment, software, etc.</p>
              </div>

              <div>
                <label htmlFor="cash" className="block text-sm font-medium mb-2">
                  Current Cash Balance: {formatINR(currentCash)}
                </label>
                <input
                  id="cash"
                  type="range"
                  min="0"
                  max="5000000"
                  step="25000"
                  value={currentCash}
                  onChange={(e) => setCurrentCash(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="tax" className="block text-sm font-medium mb-2">
                  Tax Rate: {taxRate}%
                </label>
                <input
                  id="tax"
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="cf-results-heading">
          <div className="bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 id="cf-results-heading" className="text-xl font-semibold mb-6">Cash Flow Analysis</h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
                <p className="text-sm text-gray-600 mb-1">Operating Cash Flow</p>
                <p className={`text-2xl font-bold ${operatingCashFlow >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {formatINR(operatingCashFlow)}
                </p>
                <p className="text-xs text-gray-500 mt-1">per month</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
                <p className="text-sm text-gray-600 mb-1">Free Cash Flow</p>
                <p className={`text-2xl font-bold ${freeCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatINR(freeCashFlow)}
                </p>
                <p className="text-xs text-gray-500 mt-1">After CAPEX</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Monthly Burn</p>
                  <p className={`text-lg font-semibold ${monthlyBurn > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                    {monthlyBurn > 0 ? formatINR(monthlyBurn) : '₹0'}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Cash Runway</p>
                  <p className={`text-lg font-semibold ${runwayMonths < 6 ? 'text-red-600' : runwayMonths < 12 ? 'text-orange-600' : 'text-green-600'}`}>
                    {formatRunway(runwayMonths)}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Monthly P&L Snapshot</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Revenue</span>
                    <span className="font-medium text-green-600">+{formatINR(monthlyRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expenses</span>
                    <span className="font-medium text-red-600">-{formatINR(monthlyExpenses)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1">
                    <span>Net Profit</span>
                    <span className={`font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatINR(netProfit)}
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