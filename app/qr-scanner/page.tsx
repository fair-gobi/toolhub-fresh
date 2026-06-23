'use client'
import { useState, useEffect } from 'react'
import * as OTPAuth from 'otpauth'

export default function Test() {
  const [code, setCode] = useState('loading...')

  useEffect(() => {
    try {
      const totp = new OTPAuth.TOTP({
        secret: 'ZBLWUEP2WDWCOJR7BZ3Z6NWLAZHDFNHV'
      })
      setCode(totp.generate())
    } catch (e:any) {
      setCode('ERROR: ' + e.message)
    }
  }, [])

  return (
    <main className="p-10">
      <h1 className="text-2xl">OTPAUTH Test</h1>
      <div className="text-5xl font-mono mt-4">{code}</div>
    </main>
  )
}
