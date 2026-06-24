'use client'

import { useEffect, useState } from 'react'

interface Purchase {
  id: number
  amount: number
  price: number
}

export default function DCACalculator() {
  const [purchases, setPurchases] = useState<Purchase[]>([
    { id: 1, amount: 5000, price: 100 },
    { id: 2, amount: 5000, price: 90 },
    { id: 3, amount: 5000, price: 110 },
  ])
  const [currentPrice, setCurrentPrice] = useState(120)

  const [totalInvested, setTotalInvested] = useState(0)
  const [totalUnits, setTotalUnits] = useState(0)
  const [avgPrice, setAvgPrice] = useState(0)
  const [currentValue, setCurrentValue] = useState(0)
  const [profit, setProfit] = useState(0)
  const [profitPercent, setProfitPercent] = useState(0)

  useEffect(() => {
    let invested = 0
    let units = 0

    purchases.forEach(p => {
      invested += p.amount
      units += p.amount / p.price
    })

    const average = units > 0? invested / units : 0
    const value = units * currentPrice
    const pnl = value - invested
    const pnlPercent = invested > 0? (pnl / invested) * 100 : 0

    setTotalInvested(invested)
    setTotalUnits(units)
    setAvgPrice(average)
    setCurrentValue(value)
    setProfit(pnl)
    setProfitPercent(pnlPercent)
  }, [purchases, currentPrice])

  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num)
  }

  const updatePurchase = (id: number, field: 'amount' | 'price', value: number) => {
    setPurchases(prev => prev.map(p =>
      p.id === id? {...p, [field]: value } : p
    ))
  }

  const addPurchase = () => {
    const newId = Math.max(...purchases.map(p => p.id)) + 1
    setPurchases([...purchases, { id: newId, amount: 5000, price: currentPrice }])
  }

  const removePurchase = (id: number) => {
    if (purchases.length > 1) {
      setPurchases(purchases.filter(p => p.id!== id))
    }
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">DCA Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate dollar-cost averaging returns, average buy price, and profit for stocks or crypto</p>

      <div className="grid lg:grid-cols-2 gap-8">
        <section aria-labelledby="dca-inputs-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 id="dca-inputs-heading" className="text-xl font-semibold">Your Purchases</h2>
              <button
                onClick={addPurchase}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                + Add Purchase
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {purchases.map((purchase, index) => (
                <div key={purchase.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-700">Purchase #{index + 1}</span>
                    {purchases.length > 1 && (
                      <button
                        onClick={() => removePurchase(purchase.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Amount Invested</label>
                      <input
                        type="number"
                        value={purchase.amount}
                        onChange={(e) => updatePurchase(purchase.id, 'amount', Number(e.target.value))}
                        className="w-full p-2 text-sm border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Buy Price</label>
                      <input
                        type="number"
                        value={purchase.price}
                        onChange={(e) => updatePurchase(purchase.id, 'price', Number(e.target.value))}
                        className="w-full p-2 text-sm border rounded"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Units: {(purchase.amount / purchase.price).toFixed(4)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <label htmlFor="current-price" className="block text-sm font-medium mb-2">
                Current Market Price: {formatINR(currentPrice)}
              </label>
              <input
                id="current-price"
                type="range"
                min="1"
                max="1000"
                step="1"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="dca-results-heading">
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-xl p-6 shadow-sm">
            <h2 id="dca-results-heading" className="text-xl font-semibold mb-6">DCA Results</h2>

            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Average Buy Price</p>
                <p className="text-3xl font-bold text-violet-600">{formatINR(avgPrice)}</p>
                <p className="text-xs text-gray-500 mt-1">Across {purchases.length} purchases</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Total Invested</p>
                  <p className="text-lg font-semibold">{formatINR(totalInvested)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Current Value</p>
                  <p className="text-lg font-semibold">{formatINR(currentValue)}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Total Units Held</p>
                <p className="text-2xl font-bold">{totalUnits.toFixed(4)}</p>
              </div>

              <div className={`rounded-lg p-4 shadow-sm ${profit >= 0? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className="text-sm text-gray-600 mb-1">Profit / Loss</p>
                <p className={`text-2xl font-bold ${profit >= 0? 'text-green-600' : 'text-red-600'}`}>
                  {profit >= 0? '+' : ''}{formatINR(profit)}
                </p>
                <p className={`text-sm font-medium ${profit >= 0? 'text-green-600' : 'text-red-600'}`}>
                  {profitPercent >= 0? '+' : ''}{profitPercent.toFixed(2)}%
                </p>
              </div>

              <div className="pt-4 border-t border-violet-200">
                <p className="text-xs text-gray-600">
                  DCA reduces risk by averaging your entry price over time.
                  {currentPrice > avgPrice? ' You are currently in profit.' : ' You are currently at a loss.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
