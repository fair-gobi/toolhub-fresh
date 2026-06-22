export default function Home() {
  const categories = [
    { icon: "💡", name: "Prompt Library", count: "500+ prompts", desc: "ChatGPT, Claude, Gemini prompts", href: "/prompts" },
    { icon: "🤖", name: "AI Tools", count: "8 tools", desc: "Generators & AI utilities", href: "/ai" },
    { icon: "📄", name: "PDF Tools", count: "8 tools", desc: "Merge, split, compress", href: "/pdf" },
    { icon: "🖼️", name: "Image Tools", count: "9 tools", desc: "Edit, convert, enhance", href: "/image" },
    { icon: "💻", name: "Developer Tools", count: "15 tools", desc: "JSON, Base64, formatters", href: "/dev" },
    { icon: "📝", name: "Text Tools", count: "10 tools", desc: "Counters, converters", href: "/text" },
    { icon: "💼", name: "Business Tools", count: "5 tools", desc: "Calculators & generators", href: "/business" },
    { icon: "💰", name: "Finance Tools", count: "9 tools", desc: "EMI, tax, ROI", href: "/finance" },
    { icon: "🔧", name: "Utility Tools", count: "5 tools", desc: "Nepali tools & more", href: "/utility" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Promptoolhub</h1>
          <p className="text-xl text-gray-600">Prompt Library & Free Online Tools — no signup required</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <a key={cat.name} href={cat.href} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h2 className="font-semibold text-lg mb-1">{cat.name}</h2>
              <p className="text-sm text-blue-600 mb-2">{cat.count}</p>
              <p className="text-sm text-gray-600">{cat.desc}</p>
            </a>
          ))}
        </div>

        <footer className="text-center mt-16 text-sm text-gray-500">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/about" className="hover:underline">About</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </div>
          <p>© 2026 Promptoolhub.com - Prompt Library & Free Online Tools</p>
        </footer>
      </div>
    </main>
  );
}
