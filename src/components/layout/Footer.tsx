'use client'

import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname() ?? ''
  const isAdminPage = pathname.startsWith('/admin')

  const openModal = () => {
    if (typeof window !== 'undefined') {
      document.getElementById('adminModal')?.classList.add('active')
      document.body.style.overflow = 'hidden'
    }
  }

  return (
    <footer
      style={{
        background: '#1A2E1F',
        color: 'rgba(255,255,255,0.65)',
        padding: '48px 5% 28px',
        marginLeft: isAdminPage ? 240 : 0,
        width: isAdminPage ? 'calc(100% - 240px)' : '100%',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 40, paddingBottom: 36,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        marginBottom: 28,
      }}>
        {/* Brand */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 44, height: 44, borderRadius: 10,
            background: '#1D6A3A',
            fontFamily: "'Playfair Display', serif",
            fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12,
          }}>S</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: '#fff', marginBottom: 8 }}>
            Desa Rejosari
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.65 }}>
            Website resmi Pemerintah Desa Rejosari. Melayani dengan hati, membangun dengan karya.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 14 }}>
            Navigasi
          </h4>
          {[['/', 'Beranda'], ['/#profil', 'Profil'], ['/#berita', 'Berita'], ['/#pengumuman', 'Pengumuman']].map(([href, label]) => (
            <a key={href} href={href} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: 8 }}>
              {label}
            </a>
          ))}
        </div>

        {/* Informasi */}
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 14 }}>
            Informasi
          </h4>
          {[['/#potensi', 'Potensi Desa'], ['/#galeri', 'Galeri'], ['/#kontak', 'Kontak']].map(([href, label]) => (
            <a key={href} href={href} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: 8 }}>
              {label}
            </a>
          ))}
          <button onClick={openModal} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.55)', padding: 0, marginBottom: 8 }}>
            Login Admin
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, flexWrap: 'wrap', gap: 8 }}>
        <span>© 2024 Desa Rejosari — Semua hak dilindungi.</span>
        <span>Dibangun dengan ❤️ untuk kemajuan desa</span>
      </div>
    </footer>
  )
}
