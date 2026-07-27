'use client'

import { useEffect, useState } from 'react'

type Item = { id: number; judul: string; image: string }

export default function Galeri() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/galeri')
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
    <section id="galeri" style={{ padding: '88px 5%', background: '#F0FAF4' }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ color: '#1D6A3A', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.8px' }}>
          GALERI
        </span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', marginTop: 14 }}>
          Foto Kegiatan Desa
        </h2>
        <p style={{ color: '#4A5E4F' }}>Dokumentasi kegiatan dan keindahan desa.</p>
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
          <div style={{ fontSize: 40, marginBottom: 12 }}>🖼️</div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1A2E1F', marginBottom: 6 }}>
            Belum ada foto
          </h3>
          <p style={{ fontSize: 14, color: '#6B7A6E' }}>
            Dokumentasi galeri foto kegiatan desa belum tersedia.
          </p>
        </div>
      ) : (
        <div
          className="reveal galeri-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}
        >
          {items.map((g) => (
            <figure
              key={g.id}
              className="galeri-item"
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '4 / 3',
                background: '#F0F4F2',
                margin: 0,
              }}
            >
              <img
                src={g.image}
                alt={g.judul}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <figcaption
                className="galeri-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15,50,25,0.72), transparent 55%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: 16,
                  opacity: 0,
                  transition: 'opacity .3s',
                  color: '#fff',
                  fontSize: 14,
                }}
              >
                {g.judul}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  )
}
