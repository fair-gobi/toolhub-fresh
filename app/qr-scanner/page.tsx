'use client'
import { useState, useRef, useEffect } from 'react'
import jsQR from 'jsqr'

export default function QRScanner() {
  const [result, setResult] = useState('')
  const [scanning, setScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream|null>(null)

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
      alert('Camera access denied. Use file upload instead.')
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    setScanning(false)
  }

  const scanLoop = () => {
    if (!scanning &&!videoRef.current?.srcObject) return
    const video = videoRef.current, canvas = canvasRef.current
    if (!video ||!canvas || video.readyState!== 4) {
      requestAnimationFrame(scanLoop)
      return
    }
    const ctx = canvas.getContext('2d')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx?.drawImage(video, 0, 0)
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
    if (imageData) {
      const code = jsQR(imageData.data, imageData.width, imageData.height)
      if (code) {
        setResult(code.data)
        stopCamera()
        return
      }
    }
    requestAnimationFrame(scanLoop)
  }

  useEffect(() => scanLoop, [scanning])

  const scanFile = (e:any) => {
    const file = e.target.files[0]
    if (!file) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      const data = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      if (data) {
        const code = jsQR(data.data, data.width, data.height)
        setResult(code? code.data : 'No QR found')
      }
    }
    img.src = URL.createObjectURL(file)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">QR Code Scanner</h1>
        <p className="text-gray-600 mb-6">Scan with camera or upload image</p>

        <div className="bg-white p-6 rounded-2xl border">
          {!scanning? (
            <div className="space-y-3">
              <button onClick={startCamera} className="w-full bg-purple-600 text-white py-4 rounded-xl font-medium">📷 Start Camera Scan</button>
              <label className="block w-full bg-gray-900 text-white py-4 rounded-xl text-center cursor-pointer">
                📁 Upload QR Image
                <input type="file" accept="image/*" onChange={scanFile} className="hidden" />
              </label>
            </div>
          ) : (
            <div>
              <video ref={videoRef} className="w-full rounded-xl mb-3" />
              <button onClick={stopCamera} className="w-full bg-red-600 text-white py-2 rounded-lg">Stop</button>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />

          {result && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <div className="text-sm text-gray-600 mb-1">Scanned Result:</div>
              <div className="font-mono break-all bg-white p-3 rounded border">{result}</div>
              <div className="mt-3 flex gap-2">
                <button onClick={()=>navigator.clipboard.writeText(result)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm">Copy</button>
                {result.startsWith('http') && <a href={result} target="_blank" className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm text-center">Open Link</a>}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
