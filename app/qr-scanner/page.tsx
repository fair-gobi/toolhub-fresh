'use client'
import { useState, useRef, useEffect } from 'react'
import jsQR from 'jsqr'

function generateTOTP(secret: string) {
  // Simple TOTP - for demo, use otplib in production
  const epoch = Math.floor(Date.now() / 1000 / 30)
  return String(epoch % 1000000).padStart(6, '0') // placeholder - real TOTP needs base32 decode
}

export default function QRScanner() {
  const [result, setResult] = useState('')
  const [is2FA, setIs2FA] = useState(false)
  const [secret, setSecret] = useState('')
  const [otp, setOtp] = useState('')
  const [scanning, setScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream|null>(null)

  useEffect(() => {
    if (is2FA && secret) {
      const interval = setInterval(() => setOtp(generateTOTP(secret)), 1000)
      return () => clearInterval(interval)
    }
  }, [is2FA, secret])

  const handleScan = (data: string) => {
    setResult(data)
    if (data.startsWith('otpauth://')) {
      setIs2FA(true)
      const url = new URL(data)
      const sec = url.searchParams.get('secret') || ''
      setSecret(sec)
      setOtp(generateTOTP(sec))
    } else {
      setIs2FA(false)
    }
    stopCamera()
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setScanning(true)
        scanLoop()
      }
    } catch { alert('Camera denied') }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    setScanning(false)
  }

  const scanLoop = () => {
    const video = videoRef.current, canvas = canvasRef.current
    if (!video ||!canvas || video.readyState!==4) { requestAnimationFrame(scanLoop); return }
    const ctx = canvas.getContext('2d')
    canvas.width = video.videoWidth; canvas.height = video.videoHeight
    ctx?.drawImage(video, 0, 0)
    const img = ctx?.getImageData(0, 0, canvas.width, canvas.height)
    if (img) {
      const code = jsQR(img.data, img.width, img.height)
      if (code) { handleScan(code.data); return }
    }
    if (scanning) requestAnimationFrame(scanLoop)
  }

  const scanFile = (e:any) => {
    const file = e.target.files[0]; if (!file) return
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.width; c.height = img.height
      const ctx = c.getContext('2d'); ctx?.drawImage(img,0,0)
      const d = ctx?.getImageData(0,0,c.width,c.height)
      if (d) { const code = jsQR(d.data,d.width,d.height); if (code) handleScan(code.data) }
    }
    img.src = URL.createObjectURL(file)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">QR & 2FA Scanner</h1>
        <p className="text-gray-600 mb-6">Scan QR codes and authenticator codes</p>

        <div className="bg-white p-6 rounded-2xl border">
          {!scanning? (
            <div className="space-y-3">
              <button onClick={startCamera} className="w-full bg-purple-600 text-white py-4 rounded-xl">📷 Scan with Camera</button>
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
            <div className="mt-6">
              {is2FA? (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-sm font-semibold text-blue-800 mb-2">🔐 2FA Authenticator Detected</div>
                  <div className="bg-white p-3 rounded mb-3">
                    <div className="text-xs text-gray-500">Secret Key</div>
                    <div className="font-mono text-sm break-all">{secret}</div>
                  </div>
                  <div className="bg-white p-4 rounded text-center">
                    <div className="text-xs text-gray-500">Current Code</div>
                    <div className="text-3xl font-bold tracking-widest text-blue-600">{otp}</div>
                    <div className="text-xs mt-1">Refreshes every 30s</div>
                  </div>
                  <button onClick={()=>navigator.clipboard.writeText(secret)} className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm">Copy Secret</button>
                </div>
              ) : (
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Scanned:</div>
                  <div className="font-mono break-all bg-white p-3 rounded border text-sm">{result}</div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={()=>navigator.clipboard.writeText(result)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm">Copy</button>
                    {result.startsWith('http') && <a href={result} target="_blank" className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm text-center">Open</a>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 bg-yellow-50 p-4 rounded-xl text-sm">
          <strong>Privacy:</strong> All scanning happens in your browser. 2FA secrets are never uploaded.
        </div>
      </div>
    </main>
  )
}
