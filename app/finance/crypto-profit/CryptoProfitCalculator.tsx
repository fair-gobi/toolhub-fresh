
'use client'

import { useEffect, useState } from 'react'

export default function CryptoProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState(25000)
  const [sellPrice, setSellPrice] = useState(35000)
  const [quantity, setQuantity] = useState(0.5)
  const [buyFee, setBuyFee] = useState(0.1)
  const [sellFee, setSellFee] = useState(0.1)
  
  const [investment, setInvestment] = useState(0)
  const [proceeds, setProceeds] = useState(0)
  const [profit, setProfit] = useState(0)
  const [roi, setRoi] = useState(0)
  const [totalFees, setTotalFees] = useState(0)

  useEffect(() => {
    const buy = Number(buyPrice)
    const sell = Number(sellPrice)
    const qty = Number(quantity)
    const bFee = Number(buyFee) / 100
    const sFee = Number(sellFee) / 100

    if (buy > 0 && qty > 0) {
      const buyCost = buy * qty
      const buyFeeAmount = buyCost * bFee
      const totalInvestment = buyCost + buyFeeAmount

      const sellRevenue = sell * qty
      const sellFeeAmount = sellRevenue * sFee
      const netProceeds = sellRevenue - sellFeeAmount

      const profitCalc = netProceeds - totalInvestment
      const roiCalc = (profitCalc / totalInvestment) * 100

      setInvestment(Math.round(totalInvestment))
      setProceeds(Math.round(netProceeds))
      setProfit(Math.round(profitCalc))
      setRoi(Number(roiCalc.toFixed(2)))
      setTotalFees(Math.round(buyFeeAmount + sellFeeAmount))
    }
  }, [buyPrice, sellPrice, quantity, buyFee, sellFee])

  const formatUSD = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num)
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Crypto Profit Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate profit, ROI, and fees for Bitcoin, Ethereum, and any cryptocurrency</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="crypto-inputs-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="crypto-inputs-heading" className="text-xl font-semibold mb-6">Trade Details</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="buy-price" className="block text-sm font-medium mb-2">
                  Buy Price: {formatUSD(buyPrice)}
                </label>
                <input
                  id="buy-price"
                  type="range"
                  min="100"
                  max="150000"
                  step="100"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="sell-price" className="block text-sm font-medium mb-2">
                  Sell Price: {formatUSD(sellPrice)}
                </label>
                <input
                  id="sell-price"
                  type="range"
                  min="100"
                  max="150000"
                  step="100"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                  Quantity: {quantity} coins
                </label>
                <input
                  id="quantity"
                  type="range"
                  min="0.001"
                  max="10"
                  step="0.001"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="buy-fee" className="block text-sm font-medium mb-2">
                    Buy Fee: {buyFee}%
                  </label>
                  <input
                    id="buy-fee"
                    type="range"
                    min="0"
                    max="2"
                    step="0.05"
                    value={buyFee}
                    onChange={(e) => setBuyFee(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label htmlFor="sell-fee" className="block text-sm font-medium mb-2">
                    Sell Fee: {sellFee}%
                  </label>
                  <input
                    id="sell-fee"
                    type="range"
                    min="0"
                    max="2"
                    step="0.05"
                    value={sellFee}
                    onChange={(e) => setSellFee(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="crypto-results-heading">
          <div className={`bg-gradient-to-br ${profit >= 0 ? 'from-green-50 to-emerald-50 border-green-100' : 'from-red-50 to-rose-50 border-red-100'} border rounded-xl p-6 shadow-sm`}>
            <h2 id="crypto-results-heading" className="text-xl font-semibold mb-6">Profit Analysis</h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Net Profit / Loss</p>
                <p className={`text-3xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {profit >= 0 ? '+' : ''}{formatUSD(profit)}
                </p>
                <p className={`text-sm font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {roi >= 0 ? '+' : ''}{roi}% ROI
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Total Invested</p>
                  <p className="text-lg font-semibold">{formatUSD(investment)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Net Proceeds</p>
                  <p className="text-lg font-semibold">{formatUSD(proceeds)}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Total Fees Paid</p>
                    <p className="text-lg font-semibold text-orange-600">{formatUSD(totalFees)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Price Change</p>
                    <p className={`text-lg font-semibold ${sellPrice >= buyPrice ? 'text-green-600' : 'text-red-600'}`}>
                      {(((sellPrice - buyPrice) / buyPrice) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs text-gray-500">
                <p>• Buy: {quantity} @ {formatUSD(buyPrice)} = {formatUSD(buyPrice * quantity)}</p>
                <p>• Sell: {quantity} @ {formatUSD(sellPrice)} = {formatUSD(sellPrice * quantity)}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}