'use client'

import { PENGUMUMAN } from '@/lib/data'
import { formatTanggal } from '@/lib/utils'

export default function Pengumuman() {
  return (
    <section id="pengumuman" style={{ padding: '88px 5%', background: '#F0FAF4' }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{
            display: 'inline-block', background: '#fff', color: '#1D6A3A',
            fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 100,
            textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 20,
            border: '1px solid rgba(29,106,58,0.15)',
        }}>
          Pengumuman
        </span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, marginBottom: 14 }}>
          Pengumuman Resmi Desa
        </h2>
        <p style={{ fontSize: 16, color: '#4A5E4F', maxWidth: 520, lineHeight: 1.7 }}>
          Informasi penting dan pengumuman resmi dari Pemerintah Desa Rejosari.
        </p>
      </div>

      <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {PENGUMUMAN.map((p) => {
          const tgl = formatTanggal(p.tanggal)
          return (
            <div key={p.id} style={{
              background: '#fff', borderRadius: 14, padding: '20px 24px',
              display: 'flex', gap: 18, alignItems: 'flex-start',
              border: '1px solid #E8EDE9', transition: 'all .2s',
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = '#4CAF77'
                el.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = '#E8EDE9'
                el.style.transform = ''
              }}
            >
              {/* Tanggal */}
              <div style={{ background: '#1D6A3A', borderRadius: 10, padding: '8px 12px', textAlign: 'center', flexShrink: 0, minWidth: 54 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                  {tgl.day}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
                  {tgl.month}
                </div>
              </div>

              {/* Konten */}
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 5 }}>{p.judul}</h4>
                <p style={{ fontSize: 13, color: '#6B7A6E', lineHeight: 1.55 }}>{p.isi}</p>
                <div style={{ fontSize: 12, color: '#6B7A6E', marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span>📌 {p.pengirim}</span>
                  <span>|</span>
                  <span style={{
                    display: 'inline-block', fontSize: 11, fontWeight: 600,
                    padding: '2px 8px', borderRadius: 100,
                    background: p.status === 'aktif' ? '#DCF5E5' : '#E8E8E8',
                    color: p.status === 'aktif' ? '#1A6E3A' : '#666',
                  }}>
                    {p.status === 'aktif' ? 'Aktif' : 'Selesai'}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
