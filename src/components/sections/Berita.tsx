'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getBadgeStyle } from '@/lib/utils'

type BeritaItem = {
  id: number
  judul: string
  ringkasan: string
  kategori: string
  emoji: string
  bgColor: string
  tanggal: string
}

export default function Berita() {
  const [items, setItems] = useState<BeritaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/berita')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setItems(data)
        setLoading(false)
      })
      .catch(() => {
        setItems([])
        setLoading(false)
      })
  }, [])

  return (
    <section id="berita" style={{ padding: '88px 5%', background: '#F0FAF4' }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ color: '#1D6A3A', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.8px' }}>
          BERITA DUSUN
        </span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', marginTop: 14 }}>
          Berita &amp; Kabar Terbaru
        </h2>
      </div>

      {!loading && items.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 24px',
            background: '#fff',
            borderRadius: 22,
            border: '1px dashed #C2DAC9',
            maxWidth: 500,
            margin: '0 auto',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>📰</div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1A2E1F', marginBottom: 6 }}>
            Belum ada berita
          </h3>
          <p style={{ fontSize: 14, color: '#6B7A6E' }}>
            Saat ini belum ada berita atau kabar terbaru yang dipublikasikan.
          </p>
        </div>
      ) : (
        <div
          className="reveal"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}
        >
          {items.map((b) => {
            const badge = getBadgeStyle(b.kategori)
            return (
              <article
                key={b.id}
                className="berita-card"
                style={{
                  background: '#fff',
                  borderRadius: 22,
                  overflow: 'hidden',
                  border: '1px solid #E8EDE9',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Link href={`/berita/${b.id}`} style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      height: 190,
                      background: b.bgColor,
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 40,
                    }}
                  >
                    {b.emoji}
                  </div>
                </Link>
                <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span
                    style={{
                      alignSelf: 'flex-start',
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: 100,
                      marginBottom: 10,
                      background: badge.bg,
                      color: badge.text,
                    }}
                  >
                    {b.kategori}
                  </span>
                  <Link href={`/berita/${b.id}`} style={{ textDecoration: 'none', color: '#1A2E1F' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, marginBottom: 9 }}>
                      {b.judul}
                    </h3>
                  </Link>
                  <p style={{ fontSize: 14, color: '#6B7A6E', lineHeight: 1.6, flex: 1 }}>
                    {b.ringkasan}
                  </p>
                  <div style={{ fontSize: 12, color: '#6B7A6E', marginTop: 16 }}>📅 {b.tanggal}</div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
