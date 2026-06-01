'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Berita', href: '/berita' },
  { label: 'Pengumuman', href: '/pengumuman' },
  { label: 'Layanan', href: '/layanan' },
  { label: 'Potensi', href: '/potensi' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Kontak', href: '/kontak' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Tutup menu saat pindah halaman
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const openModal = () => {
    document.getElementById('adminModal')?.classList.add('active')
    document.body.style.overflow = 'hidden'
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          background: 'rgba(250,253,248,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E8EDE9',
          padding: '0 5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
          boxShadow: scrolled
            ? '0 4px 24px rgba(29,106,58,0.10)'
            : 'none',
          transition: 'all .3s ease',
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: '#1D6A3A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 700,
              color: '#fff',
              boxShadow: '0 6px 18px rgba(29,106,58,0.25)',
            }}
          >
            R
          </div>

          <div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 700,
                color: '#1A2E1F',
                letterSpacing: '.3px',
              }}
            >
              Desa Rejosari
            </span>

            <small
              style={{
                display: 'block',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13,
                color: '#6B7A6E',
                fontWeight: 500,
                marginTop: 2,
              }}
            >
              Kecamatan Serut — Daerah Istimewa Yogyakarta
            </small>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div
          className="nav-desktop"
          style={{
            display: 'flex',
            gap: 6,
            alignItems: 'center',
          }}
        >
          {NAV_LINKS.map((l) => {
            const isActive = pathname === l.href

            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  textDecoration: 'none',
                  fontSize: 16,
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#1D6A3A' : '#4A5E4F',
                  padding: '10px 16px',
                  borderRadius: 10,
                  background: isActive ? '#F0FAF4' : 'transparent',
                  borderBottom: isActive
                    ? '2px solid #1D6A3A'
                    : '2px solid transparent',
                  transition: 'all .25s ease',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {l.label}
              </Link>
            )
          })}

          {/* Button Admin */}
          <button
            onClick={openModal}
            style={{
              marginLeft: 10,
              background: '#1D6A3A',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '11px 20px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: 'all .25s ease',
              boxShadow: '0 8px 20px rgba(29,106,58,0.18)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2E8B57'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1D6A3A'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Login Admin
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-hamburger"
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <span
            style={{
              display: 'block',
              width: 28,
              height: 3,
              background: '#1A2E1F',
              borderRadius: 2,
              transform: menuOpen
                ? 'rotate(45deg) translate(6px, 6px)'
                : 'none',
              transition: 'transform .3s',
            }}
          />

          <span
            style={{
              display: 'block',
              width: 28,
              height: 3,
              background: '#1A2E1F',
              borderRadius: 2,
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity .3s',
            }}
          />

          <span
            style={{
              display: 'block',
              width: 28,
              height: 3,
              background: '#1A2E1F',
              borderRadius: 2,
              transform: menuOpen
                ? 'rotate(-45deg) translate(6px, -6px)'
                : 'none',
              transition: 'transform .3s',
            }}
          />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className="nav-mobile-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(250,253,248,0.98)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity .3s ease',
          paddingTop: 76,
        }}
      >
        {NAV_LINKS.map((l, i) => {
          const isActive = pathname === l.href

          return (
            <Link
              key={l.href}
              href={l.href}
              style={{
                textDecoration: 'none',
                fontSize: 24,
                fontWeight: isActive ? 700 : 600,
                color: isActive ? '#1D6A3A' : '#4A5E4F',
                padding: '14px 32px',
                borderRadius: 14,
                background: isActive ? '#F0FAF4' : 'transparent',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                width: '82%',
                textAlign: 'center',
                transform: menuOpen
                  ? 'translateY(0)'
                  : 'translateY(20px)',
                transition: `transform .3s ${
                  i * 0.05
                }s ease, opacity .3s ${i * 0.05}s ease`,
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {l.label}
            </Link>
          )
        })}

        <button
          onClick={() => {
            setMenuOpen(false)
            openModal()
          }}
          style={{
            marginTop: 18,
            background: '#1D6A3A',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '14px 32px',
            fontSize: 17,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            width: '82%',
            boxShadow: '0 10px 24px rgba(29,106,58,0.18)',
          }}
        >
          Login Admin
        </button>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }

          .nav-hamburger {
            display: flex !important;
          }

          nav {
            padding: 0 6%;
          }
        }

        @media (max-width: 480px) {
          nav {
            height: 72px !important;
          }
        }
      `}</style>
    </>
  )
}