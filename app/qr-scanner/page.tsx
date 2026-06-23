'use client'
import { useState, useRef, useEffect } from 'react'
import jsQR from 'jsqr'
import { authenticator } from 'otplib'

export default function QRScanner() {
  const [result, setResult] = useState('')
  const [is2FA, setIs2FA] = useState(false)
  const [secret, setSecret] = useState('')
  const [account, setAccount] = useState('')
  const [issuer, setIssuer] = useState('')
  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [scanning, setScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream|null>(null)

  useEffect(() => {
    if (!is2FA ||!secret) return
    const update = () => {
      try {
        setOtp(authenticator.generate(secret))
        setTimeLeft(30 - Math.floor(Date.now() / 1000) % 30)
      } catch {}
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [is2FA, secret])

  const handleScan = (data: string) => {
    const clean = data.trim()
    setResult(clean)
    if (clean.toLowerCase().startsWith('otpauth://')) {
      try {
        const url = new URL(clean)
        const sec = url.searchParams.get('secret') || ''
        const iss = url.searchParams.get('issuer') || ''
        let lbl = url.pathname.replace('/', '').replace('totp/', '')
        if (lbl.includes(':')) lbl = lbl.split(':')[1]
        lbl = decodeURIComponent(lbl)

        setSecret(sec)
        setIssuer(iss || '2FA')
        setAccount(lbl)
        setIs2FA(true)
        setOtp(authenticator.generate(sec))
      } catch {
        setIs2FA(false)
      }
    } else {
      setIs2FA(false)
    }
    stopCamera()
  }

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = s
      if (videoRef.current) {
        videoRef.current.srcObject = s
        videoRef.current.play()
        setScanning(true)
        scanLoop()
      }
    } catch {
      alert('Camera denied')
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    setScanning(false)
  }

  const scanLoop = () => {
    const v = videoRef.current, c = canvasRef.current
    if (!v ||!c || v.readyState!== 4) {
      if (scanning) requestAnimationFrame(scanLoop)
      return
    }
    c.width = v.videoWidth
    c.height = v.videoHeight
    const ctx = c.getContext('2d')
    ctx?.drawImage(v, 0, 0)
    const img = ctx?.getImageData(0, 0, c.width, c.height)
    if (img) {
      const code = jsQR(img.data, img.width, img.height)
      if (code) {
        handleScan(code.data)
        return
      }
    }
    if (scanning) requestAnimationFrame(scanLoop)
  }

  const scanFile = (e: any) => {
    const f = e.target.files[0]
    if (!f) return
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.width
      c.height = img.height
      const ctx = c.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      const d = ctx?.getImageData(0, 0, c.width, c.height)
      if (d) {
        const code = jsQR(d.data, d.width, d.height)
        if (code) handleScan(code.data)
      }
    }
    img.src = URL.createObjectURL(f)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">QR & 2FA Scanner</h1>
        <p className="text-gray-600 mb-6">Works offline • Private</p>
        <div className="bg-white p-6 rounded-2xl border">
          {!scanning &&!result && (
            <div className="space-y-3">
              <button onClick={startCamera} className="w-full bg-purple-600 text-white py-4 rounded-xl font-medium">📷 Scan QR</button>
              <label className="block w-full bg-gray-900 text-white py-4 rounded-xl text-center cursor-pointer">
                📁 Upload Image
                <input type="file" accept="image/*" onChange={scanFile} className="hidden" />
              </label>
              <button onClick={() => handleScan('otpauth://totp/fairgob?secret=ZBLWUEP2WDWCOJR7BZ3Z6NWLAZHDFNHV&issuer=Namecheap')} className="w-full bg-orange-500 text-white py-2 rounded-lg text-xs">Test 2FA (Debug)</button>
            </div>
          )}
          {scanning && (
            <div>
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-xl mb-3 bg-black" />
              <button onClick={stopCamera} className="w-full bg-red-600 text-white py-2 rounded-lg">Stop</button>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
          {result && (
            <div className="mt-4">
              {is2FA? (
                <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="font-semibold mb-1">{issuer}</div>
                  <div className="text-xs text-gray-600 mb-3">{account}</div>
                  <div className="bg-white p-5 rounded-xl text-center">
                    <div className="text-xs text-gray-500">Current Code</div>
                    <div className="text-4xl font-mono font-bold text-blue-600 tracking-widest">{otp}</div>
                    <div className="text-xs mt-2">{timeLeft}s</div>
                  </div>
                  <div className="mt-3 text-xs font-mono break-all bg-white p-2 rounded">{secret}</div>
                  <button onClick={() => { setResult(''); setIs2FA(false) }} className="w-full mt-3 text-sm py-2 bg-gray-200 rounded">Scan Another</button>
                </div>
              ) : (
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="font-mono text-sm break-all bg-white p-3 rounded border">{result}</div>
                  <button onClick={() => setResult('')} className="w-full mt-2 text-sm py-2 bg-gray-200 rounded">Scan Again</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
