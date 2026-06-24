

'use client'

import { useEffect, useState } from 'react'

export default function MiningProfitCalculator() {
  const [hashrate, setHashrate] = useState(100) // TH/s
  const [power, setPower] = useState(3250) // Watts
  const [electricityCost, setElectricityCost] = useState(0.10) // $/kWh
  const [poolFee, setPoolFee] = useState(1) // %
  const [btcPrice, setBtcPrice] = useState(65000)
  const [networkDifficulty, setNetworkDifficulty] = useState(80) // T
  
  const [dailyRevenue, setDailyRevenue] = useState(0)
  const [dailyCost, setDailyCost] = useState(0)
  const [dailyProfit, setDailyProfit] = useState(0)
  const [monthlyProfit, setMonthlyProfit] = useState(0)
  const [yearlyProfit, setYearlyProfit] = useState(0)

  useEffect(() => {
    const hr = Number(hashrate) * 1e12 // Convert TH/s to H/s
    const diff = Number(networkDifficulty) * 1e12
    const price = Number(btcPrice)
    const powerKw = Number(power) / 1000
    const elecCost = Number(electricityCost)
    const fee = Number(poolFee) / 100

    // Simplified Bitcoin mining calculation
    // Blocks per day = 144, reward = 3.125 BTC (post-halving)
    const blocksPerDay = 144
    const blockReward = 3.125
    
    // Probability of finding block = hashrate / (difficulty * 2^32)
    const networkHashrate = diff * Math.pow(2, 32) / 600 // ~10 min block time
    const userShare = hr / networkHashrate
    const dailyBtc = userShare * blocksPerDay * blockReward * (1 - fee)
    
    const revenue = dailyBtc * price
    const cost = powerKw * 24 * elecCost
    const profit = revenue - cost

    setDailyRevenue(Number(revenue.toFixed(2)))
    setDailyCost(Number(cost.toFixed(2)))
    setDailyProfit(Number(profit.toFixed(2)))
    setMonthlyProfit(Number((profit * 30).toFixed(2)))
    setYearlyProfit(Number((profit * 365).toFixed(2)))
  }, [hashrate, power, electricityCost, poolFee, btcPrice, networkDifficulty])

  const formatUSD = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(num)
  }

  return (
    <main className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Mining Profit Calculator</h1>
      <p className="text-gray-600 mb-8">Calculate crypto mining profitability based on hashrate, power, and electricity costs</p>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="mining-inputs-heading">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 id="mining-inputs-heading" className="text-xl font-semibold mb-6">Miner Specifications</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="hashrate" className="block text-sm font-medium mb-2">
                  Hashrate: {hashrate} TH/s
                </label>
                <input
                  id="hashrate"
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={hashrate}
                  onChange={(e) => setHashrate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="power" className="block text-sm font-medium mb-2">
                  Power Consumption: {power} W
                </label>
                <input
                  id="power"
                  type="range"
                  min="500"
                  max="5000"
                  step="50"
                  value={power}
                  onChange={(e) => setPower(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="electricity" className="block text-sm font-medium mb-2">
                  Electricity Cost: ${electricityCost.toFixed(3)}/kWh
                </label>
                <input
                  id="electricity"
                  type="range"
                  min="0.03"
                  max="0.30"
                  step="0.01"
                  value={electricityCost}
                  onChange={(e) => setElectricityCost(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="pool-fee" className="block text-sm font-medium mb-2">
                  Pool Fee: {poolFee}%
                </label>
                <input
                  id="pool-fee"
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={poolFee}
                  onChange={(e) => setPoolFee(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Network Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="btc-price" className="block text-sm mb-1">BTC Price: {formatUSD(btcPrice)}</label>
                    <input
                      id="btc-price"
                      type="range"
                      min="20000"
                      max="150000"
                      step="1000"
                      value={btcPrice}
                      onChange={(e) => setBtcPrice(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label htmlFor="difficulty" className="block text-sm mb-1">Network Difficulty: {networkDifficulty}T</label>
                    <input
                      id="difficulty"
                      type="range"
                      min="50"
                      max="120"
                      step="1"
                      value={networkDifficulty}
                      onChange={(e) => setNetworkDifficulty(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="mining-results-heading">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-6 shadow-sm">
            <h2 id="mining-results-heading" className="text-xl font-semibold mb-6">Profitability Analysis</h2>
            
            <div className="space-y-5">
              <div className={`rounded-lg p-4 shadow-sm ${dailyProfit >= 0 ? 'bg-white' : 'bg-red-50'}`}>
                <p className="text-sm text-gray-600 mb-1">Daily Profit</p>
                <p className={`text-3xl font-bold ${dailyProfit >= 0 ? 'text-amber-600' : 'text-red-600'}`}>
                  {formatUSD(dailyProfit)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Revenue: {formatUSD(dailyRevenue)} - Cost: {formatUSD(dailyCost)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Monthly Profit</p>
                  <p className={`text-xl font-bold ${monthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatUSD(monthlyProfit)}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Yearly Profit</p>
                  <p className={`text-xl font-bold ${yearlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatUSD(yearlyProfit)}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Efficiency Metrics</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Power Efficiency:</span>
                    <span className="font-medium">{(power / hashrate).toFixed(1)} W/TH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Power Cost:</span>
                    <span className="font-medium">{formatUSD(dailyCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Break-even Elec. Price:</span>
                    <span className="font-medium">${(dailyRevenue / (power/1000*24)).toFixed(3)}/kWh</span>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                {dailyProfit > 0 ? (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">✓ Profitable at current settings</p>
                  </div>
                ) : (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">✗ Not profitable - reduce power cost or increase efficiency</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}