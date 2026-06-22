export default function Utility() {
  const tools = [
    {name:'Nepali Date', href:'/nepali-date', desc:'Past/future BS↔AD picker'},
    {name:'GPA Calculator', href:'/gpa-calculator', desc:'Save/load, presets, remove'},
    {name:'Payment QR', href:'/payment-qr', desc:'Amount, purpose, 3 methods'},
    {name:'QR Generator', href:'/qr-generator', desc:'URL/WiFi/Contact'},
    {name:'YT Thumbnail', href:'/yt-thumbnail', desc:'All resolutions download'},
  ];
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Utility Tools</h1>
        <div className="grid md:grid-cols-2 gap-4">
          {tools.map(t=><a key={t.name} href={t.href} className="bg-white p-6 rounded-xl shadow hover:shadow-lg"><h3 className="font-bold text-xl">{t.name}</h3><p className="text-gray-600">{t.desc}</p></a>)}
        </div>
      </div>
    </main>
  );
}
