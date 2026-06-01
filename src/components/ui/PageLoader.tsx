'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Trigger loading saat pathname berubah
    setLoading(true)
    setWidth(0)

    // Animasi progress bar
    const t1 = setTimeout(() => setWidth(70), 50)
    const t2 = setTimeout(() => setWidth(95), 300)
    const t3 = setTimeout(() => {
      setWidth(100)
      setTimeout(() => {
        setLoading(false)
        setWidth(0)
      }, 300)
    }, 600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [pathname])

  if (!loading && width === 0) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 9999, height: 3,
      background: 'transparent',
      pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%',
        width: `${width}%`,
        background: 'linear-gradient(90deg, #1D6A3A, #4CAF77)',
        borderRadius: '0 2px 2px 0',
        transition: width === 100
          ? 'width 0.2s ease, opacity 0.3s ease'
          : 'width 0.4s ease',
        opacity: width === 100 ? 0 : 1,
        boxShadow: '0 0 10px rgba(76,175,119,0.6)',
      }} />
    </div>
  )
}
