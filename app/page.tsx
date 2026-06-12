import Link from "next/link";

const tools = [
  { name: "Image Compressor", href: "/tools/image-compressor", desc: "Compress images instantly" },
  { name: "QR Generator", href: "/tools/qr-generator", desc: "Create QR codes" },
  { name: "Text Counter", href: "/tools/text-counter", desc: "Count words & characters" },
  { name: "Color Picker", href: "/tools/color-picker", desc: "Pick colors from palette" },
  { name: "JSON Formatter", href: "/tools/json-formatter", desc: "Format & validate JSON" },
  { name: "URL Shortener", href: "/tools/url-shortener", desc: "Shorten long URLs" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">ToolHub</h1>
        <p className="text-gray-600 mb-8">Simple tools that work</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <h2 className="font-semibold text-lg">{tool.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}