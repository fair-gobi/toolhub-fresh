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
    if (is2FA && secret) {
      const update = () => {
        try {
          setOtp(authenticator.generate(secret))
          setTimeLeft(30 - Math.floor(Date.now() / 1000) % 30)
        } catch { setOtp('ERROR') }
      }
      update()
      const interval = setInterval(update, 1000)
      return () => clearInterval(interval)
    }
  }, [is2FA, secret])

  const handleScan = (data: string) => {
    const cleanData = data.trim()
    setResult(cleanData)
    console.log('Scanned:', cleanData) // debug

    if (cleanData.toLowerCase().includes('otpauth://')) {
      try {
        const url = new URL(cleanData)
        const sec = url.searchParams.get('secret') || ''
        const iss = url.searchParams.get('issuer') || 'Authenticator'
        let lbl = decodeURIComponent(url.pathname.split('/').pop() || '')
        if (lbl.includes(':')) lbl = lbl.split(':')[1]

        console.log('Secret:', sec, 'Issuer:', iss, 'Label:', lbl) // debug

        setSecret(sec)
        setIssuer(iss)
        setAccount(lbl || 'Account')
        setIs2FA(true)
        const code = authenticator.generate(sec)
        setOtp(code)
        console.log('Generated OTP:', code) // debug
      } catch (e) {
        console.error('2FA parse error:', e)
        setIs2FA(false)
      }
    } else {
      setIs2FA(false)
    }
    stopCamera()
  }

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
    } catch (err) {
      alert('Camera access denied')
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    setScanning(false)
  }

  const scanLoop = () => {
    const video = videoRef.current, canvas = canvasRef.current
    if (!video ||!canvas || video.readyState!== 4) {
      if (scanning) requestAnimationFrame(scanLoop)
      return
    }
    const ctx = canvas.getContext('2d')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx?.drawImage(video, 0, 0)
    const img = ctx?.getImageData(0, 0, canvas.width, canvas.height)
    if (img) {
      const code = jsQR(img.data, img.width, img.height)
      if (code) { handleScan(code.data); return }
    }
    if (scanning) requestAnimationFrame(scanLoop)
  }

  const scanFile = (e:any) => {
    const file = e.target.files[0]
    if (!file) return
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.width
      c.height = img.height
      const ctx = c.getContext('2d')
      ctx?.drawImage(img,0,0)
      const d = ctx?.getImageData(0,0,c.width,c.height)
      if (d) {
        const code = jsQR(d.data,d.width,d.height)
        if (code) handleScan(code.data)
      }
    }
    img.src = URL.createObjectURL(file)
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
                <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">🔐</div>
                    <div>
                      <div className="font-semibold">{issuer || '2FA Account'}</div>
                      <div className="text-xs text-gray-600">{account}</div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl text-center mb-3 shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">Current Code</div>
                    <div className="text-4xl font-mono font-bold tracking-widest text-blue-600">{otp}</div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{width: `${(timeLeft/30)*100}%`}}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{timeLeft}s remaining</div>
                    </div>
                  </div>

                  <div className="bg-white/70 p-3 rounded-lg mb-3">
                    <div className="text-xs text-gray-500">Secret Key</div>
                    <div className="font-mono text-xs break-all">{secret}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={()=>navigator.clipboard.writeText(otp)} className="bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium">Copy Code</button>
                    <button onClick={()=>navigator.clipboard.writeText(secret)} className="bg-gray-800 text-white py-2.5 rounded-lg text-sm font-medium">Copy Secret</button>
                  </div>
                  <button onClick={()=>{setResult('');setIs2FA(false)}} className="w-full mt-2 text-sm text-gray-600 py-2">Scan Another</button>
                </div>
              ) : (
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Scanned:</div>
                  <div className="font-mono break-all bg-white p-3 rounded border text-sm">{result}</div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={()=>navigator.clipboard.writeText(result)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm">Copy</button>
                    {result.startsWith('http') && <a href={result} target="_blank" className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm text-center">Open</a>}
                  </div>
                  <button onClick={()=>setResult('')} className="w-full mt-2 text-sm text-gray-600">Scan Again</button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          All processing happens in your browser. No data sent to servers.
        </div>
      </div>
    </main>
  )
}
