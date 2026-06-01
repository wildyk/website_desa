import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#FAFDF8', padding: '0 5%',
      textAlign: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      {/* Ilustrasi */}
      <div style={{
        width: 120, height: 120, borderRadius: 28,
        background: '#F0FAF4',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 56, marginBottom: 32,
        border: '2px solid #E8EDE9',
      }}>
        🏡
      </div>

      {/* 404 */}
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(64px, 12vw, 120px)',
        fontWeight: 700, color: '#1D6A3A',
        lineHeight: 1, marginBottom: 8,
      }}>
        404
      </h1>

      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(20px, 3vw, 28px)',
        color: '#1A2E1F', marginBottom: 12, fontWeight: 600,
      }}>
        Halaman Tidak Ditemukan
      </h2>

      <p style={{
        color: '#6B7A6E', fontSize: 15, lineHeight: 1.7,
        maxWidth: 400, marginBottom: 40,
      }}>
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        Kembali ke beranda dan temukan informasi desa di sana.
      </p>

      {/* Tombol */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{
          background: '#1D6A3A', color: '#fff',
          padding: '12px 28px', borderRadius: 10,
          textDecoration: 'none', fontSize: 14, fontWeight: 600,
          transition: 'background .2s',
        }}>
          🏠 Ke Beranda
        </Link>
        <Link href="/kontak" style={{
          background: '#F0FAF4', color: '#1D6A3A',
          padding: '12px 28px', borderRadius: 10,
          textDecoration: 'none', fontSize: 14, fontWeight: 600,
          border: '1px solid #E8EDE9',
        }}>
          📞 Hubungi Desa
        </Link>
      </div>

      {/* Link cepat */}
      <div style={{ marginTop: 48, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: 'Profil', href: '/profil' },
          { label: 'Berita', href: '/berita' },
          { label: 'Layanan', href: '/layanan' },
          { label: 'Galeri', href: '/galeri' },
        ].map((l) => (
          <Link key={l.href} href={l.href} style={{
            color: '#4A5E4F', fontSize: 13, fontWeight: 500,
            padding: '6px 14px', borderRadius: 20,
            border: '1px solid #E8EDE9',
            textDecoration: 'none', background: '#fff',
          }}>
            {l.label}
          </Link>
        ))}
      </div>
    </main>
  )
}
