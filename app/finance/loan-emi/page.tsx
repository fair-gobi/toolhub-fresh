'use client'

import { useEffect, useState } from 'react'

export default function LoanEmiPage() {
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(5)
  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    document.title = 'Loan EMI Calculator | ToolHub'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Calculate your monthly EMI for home, car, or personal loans instantly. See total interest and payment breakdown.')
  }, [])

  useEffect(() => {
    calculateEmi()
  }, [principal, rate, tenure])

  const calculateEmi = () => {
    const p = Number(principal)
    const r = Number(rate) / 12 / 100 // monthly rate
    const n = Number(tenure) * 12 // months

    if (p > 0 && r > 0 && n > 0) {
      const emiCalc = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      const total = emiCalc * n
      const interest = total - p

      setEmi(Math.round(emiCalc))
      setTotalAmount(Math.round(total))
      setTotalInterest(Math.round(interest))
    } else {
      setEmi(0)
      setTotalAmount(0)
      setTotalInterest(0)
    }
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Loan EMI Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate your Equated Monthly Installment for any loan</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Loan Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Loan Amount: {formatCurrency(principal)}
              </label>
              <input
                type="range"
                min="10000"
                max="10000000"