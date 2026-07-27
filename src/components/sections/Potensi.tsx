'use client'

import { useEffect, useState } from 'react'

type PotensiItem = {
  id: number
  judul: string
  deskripsi: string
  emoji: string
}

export default function Potensi() {
  const [items, setItems] = useState<PotensiItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/potensi')
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
    <section id="potensi" style={{ padding: '88px 5%', background: '#F0FAF4' }}>
      <div style={{ marginBottom: 48, textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            background: '#fff',
            color: '#1D6A3A',
            fontSize: 12,
            fontWeight: 600,
            padding: '5px 14px',
            borderRadius: 100,
            textTransform: 'uppercase',
            letterSpacing: '.8px',
            marginBottom: 20,
            border: '1px solid rgba(29,106,58,0.15)',
          }}
        >
          Potensi Desa
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          Kekayaan Desa Rejosari
        </h2>
        <p
          style={{
            fontSize: 16,
            color: '#4A5E4F',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          Dari alam hingga budaya, desa kami menyimpan potensi yang terus berkembang.
        </p>
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
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌱</div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1A2E1F', marginBottom: 6 }}>
            Belum ada potensi desa
          </h3>
          <p style={{ fontSize: 14, color: '#6B7A6E' }}>
            Data potensi desa belum ditambahkan oleh pengelola desa.
          </p>
        </div>
      ) : (
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 22,
          }}
        >
          {items.map((p) => (
            <div
              key={p.id}
              style={{
                background: '#fff',
                borderRadius: 22,
                padding: '28px 24px',
                textAlign: 'center',
                border: '1px solid rgba(29,106,58,0.15)',
                transition: 'all .2s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 8px 28px rgba(232,184,75,0.2)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.transform = ''
                ;(e.currentTarget as HTMLElement).style.boxShadow = ''
              }}
            >
              <div style={{ fontSize: 42, marginBottom: 14 }}>{p.emoji}</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {p.judul}
              </h3>
              <p style={{ fontSize: 14, color: '#6B7A6E', lineHeight: 1.55 }}>
                {p.deskripsi}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
