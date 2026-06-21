import Link from "next/link";

const financeTools = [
  { 
    name: "Loan EMI Calculator", 
    href: "/loan-emi", 
    icon: "🏦", 
    desc: "Calculate monthly EMI for home, car, personal loans in Nepal",
    badge: "Popular"
  },
  { 
    name: "Currency Converter", 
    href: "/currency-converter", 
    icon: "💱", 
    desc: "Live NPR rates: USD, INR, AED, EUR for remittance",
    badge: "Live"
  },
  { 
    name: "Nepal Tax Calculator", 
    href: "/tax-calculator-nepal", 
    icon: "📊", 
    desc: "FY 2082/83 income tax calculator with married/unmarried slabs",
    badge: "2025"
  },
  { 
    name: "SIP Calculator", 
    href: "/sip-calculator", 
    icon: "📈", 
    desc: "Mutual fund SIP returns calculator for Nepal investors",
    badge: "New"
  },
  { 
    name: "Budget Planner", 
    href: "/budget-planner", 
    icon: "💰", 
    desc: "50/30/20 budgeting tool for Nepali salary",
    badge: "Free"
  },
];

export default function FinanceToolsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </Link>
          <div className="mt-6 flex items-start gap-4">
            <div className="text-5xl">💰</div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Finance Tools</h1>
              <p className="text-lg text-gray-600 mt-2">5 free calculators designed for Nepal • No signup required</p>
              <div className="flex gap-3 mt-3">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">All Working</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Mobile Friendly</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {financeTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative p-7 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
            >
              {tool.badge && (
                <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                  {tool.badge}
                </span>
              )}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tool.icon}</div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h2>
              <p className="text-gray-600 mt-2 leading-relaxed">{tool.desc}</p>
              <div className="mt-5 flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                <span>Use tool</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}

          {/* Coming Soon Card */}
          <div className="p-7 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="text-4xl mb-4 opacity-40">➕</div>
            <h2 className="text-xl font-bold text-gray-500">More Coming Soon</h2>
            <p className="text-gray-500 mt-2">FD calculator, retirement planner, and more</p>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 border">
          <h3 className="font-bold text-lg mb-3">About Nepal Finance Tools</h3>
          <p className="text-gray-600 leading-relaxed">
            All calculators use latest Nepal Rastra Bank rates, 2082/83 tax slabs, and are built for Nepali users. 
            Perfect for students, job holders, and business owners in Kathmandu, Pokhara, and across Nepal.
          </p>
        </div>
      </div>
    </main>
  );
}
