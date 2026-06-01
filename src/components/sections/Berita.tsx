'use client'

import Link from 'next/link'
import { BERITA } from '@/lib/data'
import { getBadgeStyle } from '@/lib/utils'

export default function Berita() {
  return (
    <section id="berita" style={{ padding: '88px 5%', background: '#F0FAF4' }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{
            display: 'inline-block', background: '#fff', color: '#1D6A3A',
            fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 100,
            textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 20,
            border: '1px solid rgba(29,106,58,0.15)',
        }}>Berita Desa</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, marginBottom: 14 }}>
          Berita &amp; Kabar Terbaru
        </h2>
        <p style={{ fontSize: 16, color: '#4A5E4F', maxWidth: 520, lineHeight: 1.7 }}>
          Informasi dan kegiatan terkini yang terjadi di Desa Sukamaju.
        </p>
      </div>

      <div className="reveal" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
      }}>
        {BERITA.map((b) => {
          const badge = getBadgeStyle(b.kategori)
          return (
            <article key={b.id} style={{
              background: '#fff', borderRadius: 22,
              overflow: 'hidden', border: '1px solid #E8EDE9',
              transition: 'transform .2s, box-shadow .2s',
              display: 'flex', flexDirection: 'column',
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
              {/* Thumbnail — klik ke detail */}
              <Link href={`/berita/${b.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  height: 190, background: b.bgColor,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 40,
                  transition: 'opacity .2s',
                }}>
                  {b.emoji}
                </div>
              </Link>

              {/* Body */}
              <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{
                  display: 'inline-block', fontSize: 11, fontWeight: 600,
                  padding: '3px 10px', borderRadius: 100,
                  textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 10,
                  background: badge.bg, color: badge.text,
                }}>
                  {b.kategori}
                </span>

                <Link href={`/berita/${b.id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 17, fontWeight: 600,
                    marginBottom: 9, lineHeight: 1.3,
                    color: '#1A2E1F',
                  }}>
                    {b.judul}
                  </h3>
                </Link>

                <p style={{ fontSize: 14, color: '#6B7A6E', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
                  {b.ringkasan}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 12, color: '#6B7A6E' }}>📅 {b.tanggal}</div>
                  <Link
                    href={`/berita/${b.id}`}
                    style={{
                      fontSize: 13, fontWeight: 600, color: '#1D6A3A',
                      textDecoration: 'none', padding: '6px 14px',
                      background: '#F0FAF4', borderRadius: 8,
                      border: '1px solid rgba(29,106,58,0.15)',
                      transition: 'background .2s',
                    }}
                  >
                    Baca →
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
