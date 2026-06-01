'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    // Reset semua elemen reveal dulu
    const resetAndObserve = () => {
      const reveals = document.querySelectorAll<HTMLElement>('.reveal')

      // Reset ke invisible dulu
      reveals.forEach((el) => el.classList.remove('visible'))

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12 }
      )

      reveals.forEach((el) => observer.observe(el))

      return observer
    }

    // Delay kecil supaya DOM sudah siap
    const timer = setTimeout(() => {
      const observer = resetAndObserve()
      return () => observer.disconnect()
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname]) // ← Re-run setiap ganti halaman

  return null
}