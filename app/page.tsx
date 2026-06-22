import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Promptool<span className="text-blue-600">hub</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">16 Free Online Tools for Nepal & Worldwide</p>
          <p className="text-gray-500">No signup • Fast • Mobile friendly</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/finance-tools" className="group p-8 bg-white rounded-2xl shadow-sm border hover:shadow-xl transition-all">
            <div className="text-4xl mb-3">💰</div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600">Finance Tools</h2>
            <p className="text-gray-600 text-sm">EMI, Tax, Currency, Crypto, 11 calculators</p>
          </Link>

          <Link href="/qr-generator" className="group p-8 bg-white rounded-2xl shadow-sm border hover:shadow-xl transition-all">
            <div className="text-4xl mb-3">📱</div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600">QR Generator</h2>
            <p className="text-gray-600 text-sm">Create QR codes instantly</p>
          </Link>

          <Link href="/nepal-tools" className="group p-8 bg-white rounded-2xl shadow-sm border hover:shadow-xl transition-all">
            <div className="text-4xl mb-3">🇳🇵</div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600">Nepal Tools</h2>
            <p className="text-gray-600 text-sm">Date converter, GPA, local tools</p>
          </Link>
        </div>

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>© 2026 Promptoolhub.com • Made for Nepal</p>
        </div>
      </div>
    </main>
  );
}
