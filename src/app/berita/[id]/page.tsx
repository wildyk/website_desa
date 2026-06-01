import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BERITA } from '@/lib/data'
import { getBadgeStyle } from '@/lib/utils'
import type { Metadata } from 'next'

// Generate SEO metadata per berita
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const berita = BERITA.find((b) => b.id === Number(params.id))
  if (!berita) return { title: 'Berita Tidak Ditemukan' }

  return {
    title: `${berita.judul} — Desa Sukamaju`,
    description: berita.ringkasan,
    openGraph: {
      title: berita.judul,
      description: berita.ringkasan,
      type: 'article',
    },
  }
}

// Pre-generate semua route berita
export function generateStaticParams() {
  return BERITA.map((b) => ({ id: String(b.id) }))
}

export default function DetailBeritaPage({ params }: { params: { id: string } }) {
  const berita = BERITA.find((b) => b.id === Number(params.id))
  if (!berita) notFound()

  const badge = getBadgeStyle(berita.kategori)

  // Berita lainnya (exclude yang sedang dibaca)
  const beritaLain = BERITA.filter((b) => b.id !== berita.id)

  return (
    <main style={{ paddingTop: '80px', background: '#FAFDF8', minHeight: '100vh' }}>

      {/* Hero artikel */}
      <div style={{
        background: berita.bgColor,
        padding: '60px 5% 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Emoji besar sebagai dekorasi */}
        <div style={{
          position: 'absolute', right: '5%', top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(80px, 12vw, 140px)',
          opacity: 0.25, userSelect: 'none',
          lineHeight: 1,
        }}>
          {berita.emoji}
        </div>

        <div style={{ maxWidth: 720, position: 'relative' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20, fontSize: 13, color: '#6B7A6E' }}>
            <Link href="/" style={{ color: '#6B7A6E', textDecoration: 'none' }}>Beranda</Link>
            <span>›</span>
            <Link href="/berita" style={{ color: '#6B7A6E', textDecoration: 'none' }}>Berita</Link>
            <span>›</span>
            <span style={{ color: '#1D6A3A', fontWeight: 500 }}>{berita.kategori}</span>
          </div>

          {/* Badge kategori */}
          <span style={{
            display: 'inline-block', fontSize: 11, fontWeight: 600,
            padding: '4px 12px', borderRadius: 100,
            textTransform: 'uppercase', letterSpacing: '.6px',
            marginBottom: 16,
            background: badge.bg, color: badge.text,
          }}>
            {berita.kategori}
          </span>

          {/* Judul */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(26px, 4vw, 44px)',
            fontWeight: 700, color: '#1A2E1F',
            lineHeight: 1.25, marginBottom: 20,
          }}>
            {berita.judul}
          </h1>

          {/* Meta info */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: '#6B7A6E' }}>
            <span>📅 {berita.tanggal}</span>
            <span>✍️ Redaksi Desa Sukamaju</span>
          </div>
        </div>
      </div>

      {/* Konten artikel */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 5%' }}>

        {/* Ringkasan / lead */}
        <p style={{
          fontSize: 18, color: '#2E4A33', lineHeight: 1.8,
          fontWeight: 500, marginBottom: 32,
          paddingBottom: 32,
          borderBottom: '1px solid #E8EDE9',
        }}>
          {berita.ringkasan}
        </p>

        {/* Isi berita — tampilkan isi kalau ada, fallback ke paragraf dummy */}
        <div style={{ fontSize: 15, color: '#4A5E4F', lineHeight: 1.9 }}>
          {berita.isi ? (
            <p>{berita.isi}</p>
          ) : (
            <>
              <p style={{ marginBottom: 20 }}>
                Kegiatan ini merupakan bagian dari program kerja Pemerintah Desa Sukamaju
                yang bertujuan untuk meningkatkan kualitas hidup warga dan memperkuat
                kebersamaan di lingkungan desa. Seluruh perangkat desa turut terlibat
                aktif dalam pelaksanaan kegiatan ini.
              </p>
              <p style={{ marginBottom: 20 }}>
                Kepala Desa Sukamaju, Budi Hartono, S.Sos, menyampaikan apresiasinya
                kepada seluruh warga yang telah berpartisipasi. Beliau berharap kegiatan
                serupa dapat terus dilaksanakan secara rutin demi kemajuan bersama.
              </p>
              <blockquote style={{
                borderLeft: '4px solid #4CAF77',
                paddingLeft: 20, margin: '28px 0',
                fontFamily: "'Playfair Display', serif",
                fontSize: 17, color: '#1D6A3A',
                fontStyle: 'italic', lineHeight: 1.7,
              }}>
                "Semoga kegiatan ini membawa manfaat nyata bagi seluruh masyarakat
                Desa Sukamaju dan menjadi contoh bagi desa-desa lainnya."
              </blockquote>
              <p style={{ marginBottom: 20 }}>
                Kegiatan ini mendapat sambutan positif dari warga sekitar. Berbagai
                pihak turut hadir memberikan dukungan, termasuk perwakilan dari
                Kecamatan Indah dan sejumlah tokoh masyarakat setempat.
              </p>
              <p>
                Informasi lebih lanjut mengenai program-program desa dapat diakses
                melalui website resmi Desa Sukamaju atau langsung menghubungi
                kantor desa pada jam kerja.
              </p>
            </>
          )}
        </div>

        {/* Tag & share */}
        <div style={{
          marginTop: 48, paddingTop: 32,
          borderTop: '1px solid #E8EDE9',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Desa Sukamaju', berita.kategori, 'Info Desa'].map((tag) => (
              <span key={tag} style={{
                fontSize: 12, fontWeight: 500, padding: '5px 14px',
                borderRadius: 100, background: '#F0FAF4',
                color: '#1D6A3A', border: '1px solid #E8EDE9',
              }}>
                #{tag.replace(' ', '')}
              </span>
            ))}
          </div>
          <Link href="/berita" style={{
            fontSize: 13, fontWeight: 600, color: '#1D6A3A',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            ← Kembali ke Berita
          </Link>
        </div>
      </div>

      {/* Berita Lainnya */}
      {beritaLain.length > 0 && (
        <div style={{ background: '#F0FAF4', padding: '48px 5%' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24, fontWeight: 700,
              color: '#1A2E1F', marginBottom: 28,
            }}>
              Berita Lainnya
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
            }}>
              {beritaLain.map((b) => {
                const b_badge = getBadgeStyle(b.kategori)
                return (
                  <Link key={b.id} href={`/berita/${b.id}`} style={{ textDecoration: 'none' }}>
                    <article style={{
                      background: '#fff', borderRadius: 16,
                      overflow: 'hidden', border: '1px solid #E8EDE9',
                      transition: 'transform .2s, box-shadow .2s',
                      cursor: 'pointer',
                    }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.transform = 'translateY(-4px)'
                        el.style.boxShadow = '0 8px 24px rgba(29,106,58,0.12)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.transform = ''
                        el.style.boxShadow = ''
                      }}
                    >
                      <div style={{
                        height: 120, background: b.bgColor,
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: 32,
                      }}>
                        {b.emoji}
                      </div>
                      <div style={{ padding: '16px 18px' }}>
                        <span style={{
                          fontSize: 10, fontWeight: 600,
                          padding: '2px 8px', borderRadius: 100,
                          textTransform: 'uppercase', letterSpacing: '.5px',
                          background: b_badge.bg, color: b_badge.text,
                          marginBottom: 8, display: 'inline-block',
                        }}>
                          {b.kategori}
                        </span>
                        <h3 style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 15, fontWeight: 600,
                          color: '#1A2E1F', lineHeight: 1.35,
                          marginBottom: 6,
                        }}>
                          {b.judul}
                        </h3>
                        <div style={{ fontSize: 12, color: '#6B7A6E' }}>📅 {b.tanggal}</div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
