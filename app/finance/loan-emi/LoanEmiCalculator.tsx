'use client'

import { useEffect, useState } from 'react'

export default function LoanEmiCalculator() {
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(5)
  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    const p = Number(principal)
    const r = Number(rate) / 12 / 100
    const n = Number(tenure) * 12

    if (p > 0 && r > 0 && n > 0) {
      const emiCalc = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      const total = emiCalc * n
      const interest = total - p

      setEmi(Math.round(emiCalc))
      setTotalAmount(Math.round(total))
      setTotalInterest(Math.round(interest))
    }
  }, [principal, rate, tenure])

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Loan EMI Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate your Equated Monthly Installment for home, car, or personal loans</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="loan-details-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="loan-details-heading" className="text-xl font-semibold mb-6">Loan Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="principal-slider" className="block text-sm font-medium mb-2">
                  Loan Amount: {formatINR(principal)}
                </label>
                <input
                  id="principal-slider"
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="rate-slider" className="block text-sm font-medium mb-2">
                  Interest Rate: {rate}% p.a.
                </label>
                <input
                  id="rate-slider"
                  type="range"
                  min="1"
                  max="20"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="tenure-slider" className="block text-sm font-medium mb-2">
                  Loan Tenure: {tenure} Years
                </label>
                <input
                  id="tenure-slider"
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="payment-summary-heading">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 shadow-sm">
            <h2 id="payment-summary-heading" className="text-xl font-semibold mb-6">Payment Summary</h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
                <p className="text-3xl font-bold text-blue-600">{formatINR(emi)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
                  <p className="text-lg font-semibold">{formatINR(principal)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                  <p className="text-lg font-semibold text-orange-600">{formatINR(totalInterest)}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Total Amount Payable</p>
                <p className="text-xl font-bold">{formatINR(totalAmount)}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
