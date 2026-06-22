export default function EMICalculator() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">EMI Calculator</h1>
        <p className="text-gray-600 mb-4">Calculate your monthly loan payment</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Loan Amount (NPR)</label>
            <input type="number" id="amount" defaultValue="1000000" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
            <input type="number" id="rate" defaultValue="12" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tenure (years)</label>
            <input type="number" id="years" defaultValue="5" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <button onclick="calc()" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Calculate</button>
          <div id="result" className="mt-4 p-4 bg-gray-50 rounded-lg font-semibold"></div>
        </div>
        <script dangerouslySetInnerHTML={{__html: `
          function calc() {
            const p = parseFloat(document.getElementById('amount').value);
            const r = parseFloat(document.getElementById('rate').value)/12/100;
            const n = parseFloat(document.getElementById('years').value)*12;
            const emi = p * r * Math.pow(1+r,n) / (Math.pow(1+r,n)-1);
            document.getElementById('result').innerHTML = 'Monthly EMI: NPR ' + emi.toFixed(2);
          }
          calc();
        `}} />
        <a href="/" className="inline-block mt-6 text-blue-600 hover:underline">← Back to Home</a>
      </div>
    </main>
  );
}
