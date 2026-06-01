import { GALERI } from '@/lib/data'

export default function Galeri() {
  return (
    <section id="galeri" style={{ padding: '88px 5%', background: '#F0FAF4' }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{display: 'inline-block', background: '#fff', color: '#1D6A3A',
            fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 100,
            textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 20,
            border: '1px solid rgba(29,106,58,0.15)', }}>
          Galeri
        </span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, marginBottom: 14 }}>
          Foto Kegiatan Desa
        </h2>
        <p style={{ fontSize: 16, color: '#4A5E4F', maxWidth: 520, lineHeight: 1.7 }}>
          Dokumentasi kegiatan dan keindahan Desa Rejosari.
        </p>
      </div>

      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {GALERI.map((g) => (
          <div key={g.id} style={{
            borderRadius: 14, overflow: 'hidden', position: 'relative',
            aspectRatio: g.span === 'wide' ? '16/9' : '4/3',
            gridColumn: g.span === 'wide' ? 'span 2' : undefined,
            background: g.bgColor, cursor: 'pointer',
          }}
            className="galeri-item"
          >
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, transition: 'transform .3s' }}>
              {g.emoji}
            </div>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(15,50,25,0.7) 0%, transparent 60%)',
              display: 'flex', alignItems: 'flex-end', padding: 16,
              opacity: 0, transition: 'opacity .3s',
            }}
              className="galeri-overlay"
            >
              <span style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>{g.judul}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .galeri-item:hover .galeri-overlay { opacity: 1 !important; }
        .galeri-item:hover > div:first-child { transform: scale(1.05); }
      `}</style>
    </section>
  )
}
