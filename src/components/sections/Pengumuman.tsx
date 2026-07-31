'use client'

import { useEffect, useState } from 'react'
import { formatTanggal } from '@/lib/utils'

type Item = {
  id: number
  judul: string
  isi: string
  pengirim: string
  status: string
  tanggal: string
}

export default function Pengumuman() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/pengumuman')
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
    <section id="pengumuman" style={{ padding: '88px 5%', background: '#F0FAF4' }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ color: '#1D6A3A', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.8px' }}>
          PENGUMUMAN
        </span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', marginTop: 14 }}>
          Pengumuman Resmi Dusun
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
          <div style={{ fontSize: 40, marginBottom: 12 }}>📢</div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1A2E1F', marginBottom: 6 }}>
            Belum ada pengumuman
          </h3>
          <p style={{ fontSize: 14, color: '#6B7A6E' }}>
            Saat ini belum ada pengumuman resmi dari pemerintah dusun.
          </p>
        </div>
      ) : (
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {items.map((p) => {
            const t = formatTanggal(p.tanggal)
            return (
              <div
                key={p.id}
                style={{
                  background: '#fff',
                  borderRadius: 14,
                  padding: '20px 24px',
                  display: 'flex',
                  gap: 18,
                  border: '1px solid #E8EDE9',
                }}
              >
                <div
                  style={{
                    background: '#1D6A3A',
                    borderRadius: 10,
                    padding: '8px 12px',
                    textAlign: 'center',
                    minWidth: 54,
                    color: '#fff',
                  }}
                >
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{t.day}</div>
                  <div style={{ fontSize: 11 }}>{t.month}</div>
                </div>
                <div>
                  <h4 style={{ fontSize: 15, marginBottom: 5 }}>{p.judul}</h4>
                  <p style={{ fontSize: 13, color: '#6B7A6E' }}>{p.isi}</p>
                  <div style={{ fontSize: 12, color: '#6B7A6E', marginTop: 8 }}>
                    📌 {p.pengirim} · {p.status === 'aktif' ? 'Aktif' : 'Selesai'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
