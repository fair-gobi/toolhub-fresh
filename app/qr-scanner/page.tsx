'use client'
import { useState, useRef, useEffect } from 'react'

declare global { interface Window { jsQR: any } }

export default function QRScanner() {
  const [result, setResult] = useState('')
  const [scanning, setScanning] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream|null>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js'
    script.onload = () => setLoaded(true)
    document.head.appendChild(script)
  }, [])

  const startCamera = async () => {
    if (!loaded) return alert('Loading scanner...')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setScanning(true)
      }
    } catch { alert('Camera denied') }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    setScanning(false)
  }

  useEffect(() => {
    if (!scanning) return
    const loop = () => {
      const video = videoRef.current, canvas = canvasRef.current
      if (!video ||!canvas || video.readyState!== 4) return requestAnimationFrame(loop)
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(video, 0, 0)
      const data = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      if (data && window.jsQR) {
        const code = window.jsQR(data.data, data.width, data.height)
        if (code) { setResult(code.data); stopCamera(); return }
      }
      requestAnimationFrame(loop)
    }
    loop()
  }, [scanning])

  const scanFile = (e:any) => {
    const file = e.target.files[0]
    if (!file ||!loaded) return
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.width; c.height = img.height
      const ctx = c.getContext('2d')
      ctx?.drawImage(img,0,0)
      const d = ctx?.getImageData(0,0,c.width,c.height)
      if (d) {
        const code = window.jsQR(d.data, d.width, d.height)
        setResult(code? code.data : 'No QR found')
      }
    }
    img.src = URL.createObjectURL(file)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">QR Code Scanner</h1>
        <p className="text-gray-600 mb-6">Camera & upload scanning</p>
        <div className="bg-white p-6 rounded-2xl border">
          {!scanning? (
            <div className="space-y-3">
              <button onClick={startCamera} disabled={!loaded} className="w-full bg-purple-600 text-white py-4 rounded-xl disabled:opacity-50">
                {loaded? '📷 Start Camera' : 'Loading...'}
              </button>
              <label className="block w-full bg-gray-900 text-white py-4 rounded-xl text-center cursor-pointer">
                📁 Upload Image
                <input type="file" accept="image/*" onChange={scanFile} className="hidden" />
              </label>
            </div>
          ) : (
            <div>
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-xl mb-3" />
              <button onClick={stopCamera} className="w-full bg-red-600 text-white py-2 rounded-lg">Stop</button>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
          {result && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <div className="font-mono break-all bg-white p-3 rounded border text-sm">{result}</div>
              <button onClick={()=>navigator.clipboard.writeText(result)} className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg text-sm">Copy</button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
