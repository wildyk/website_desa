export default function Kontak() {
  const kontakList = [
    { icon: '📍', label: 'Alamat Kantor', value: 'Jl. Raya Rejosari No. 01, Kec. Indah\nKab. Sejahtera, Jawa Tengah 12345' },
    { icon: '📞', label: 'Telepon',       value: '(0294) 123-4567' },
    { icon: '✉️', label: 'Email',          value: 'dusun.rejosari@jateng.go.id' },
    { icon: '🕐', label: 'Jam Pelayanan', value: 'Senin – Jumat: 08.00 – 15.00 WIB' },
  ]

  return (
    <section id="kontak" style={{ padding: '88px 5%', background: '#F0FAF4' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <span style={{
            display: 'inline-block', background: '#fff', color: '#1D6A3A',
            fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 100,
            textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 20,
            border: '1px solid rgba(29,106,58,0.15)',
        }}>
          Kontak Kami
        </span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700,
          color: '#1A2E1F', marginBottom: 12,
        }}>
          Hubungi Dusun Rejosari
        </h2>
        <p style={{ fontSize: 15, color: '#4A5E4F', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          Kami siap membantu Anda. Kunjungi kantor dusun atau hubungi kami melalui kontak di bawah ini.
        </p>
      </div>

      {/* Konten utama */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 32, alignItems: 'start',
      }}>

        {/* Kiri — Info Kontak + WhatsApp */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Card info kontak */}
          <div style={{
            background: '#FAFDF8', borderRadius: 18,
            border: '1px solid #E8EDE9', padding: '28px 26px',
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1D6A3A', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 22 }}>
              Informasi Kontak
            </h3>
            {kontakList.map((k, i) => (
              <div key={i} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                paddingBottom: i < kontakList.length - 1 ? 16 : 0,
                marginBottom: i < kontakList.length - 1 ? 16 : 0,
                borderBottom: i < kontakList.length - 1 ? '1px solid #E8EDE9' : 'none',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: '#F0FAF4', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 17,
                }}>
                  {k.icon}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#6B7A6E', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 3 }}>
                    {k.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#1A2E1F', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                    {k.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Card WhatsApp */}
          <div style={{
            background: 'linear-gradient(135deg, #1D6A3A 0%, #2E8B57 100%)',
            borderRadius: 18, padding: '24px 26px',
            display: 'flex', gap: 16, alignItems: 'center',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, flexShrink: 0,
            }}>
              💬
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                WhatsApp Pengaduan
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 12 }}>
                Hubungi kami langsung untuk pengaduan dan informasi cepat.
              </div>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#fff', color: '#1D6A3A',
                  padding: '8px 18px', borderRadius: 9,
                  fontSize: 13, fontWeight: 600, textDecoration: 'none',
                }}
              >
                Chat Sekarang →
              </a>
            </div>
          </div>

          {/* Sosial media */}
          <div style={{
            background: '#FAFDF8', borderRadius: 18,
            border: '1px solid #E8EDE9', padding: '20px 26px',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1A2E1F', marginBottom: 14 }}>
              Ikuti Kami
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: '📘', label: 'Facebook', href: '#' },
                { icon: '📸', label: 'Instagram', href: '#' },
                { icon: '▶️', label: 'YouTube', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '7px 14px', borderRadius: 9,
                    background: '#F0FAF4', border: '1px solid #E8EDE9',
                    fontSize: 13, fontWeight: 500, color: '#1D6A3A',
                    textDecoration: 'none',
                  }}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Kanan — Google Maps */}
        <div className="reveal">
          <div style={{
            borderRadius: 18, overflow: 'hidden',
            border: '1px solid #E8EDE9',
            boxShadow: '0 4px 24px rgba(29,106,58,0.08)',
          }}>
            {/* Label atas peta */}
            <div style={{
              background: '#FAFDF8', padding: '14px 20px',
              borderBottom: '1px solid #E8EDE9',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: '#F0FAF4', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 16,
              }}>
                📍
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1A2E1F' }}>Kantor Dusun Rejosari</div>
                <div style={{ fontSize: 11, color: '#6B7A6E' }}>Kecamatan Indah, Jawa Tengah</div>
              </div>
              <a
                href="https://maps.google.com/maps?q=-7.801367992218893,110.5564140750052"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginLeft: 'auto',
                  fontSize: 12, fontWeight: 600, color: '#1D6A3A',
                  textDecoration: 'none', padding: '5px 12px',
                  background: '#F0FAF4', borderRadius: 7,
                  border: '1px solid rgba(29,106,58,0.15)',
                  whiteSpace: 'nowrap',
                }}
              >
                Buka Maps →
              </a>
            </div>

            {/* Iframe Google Maps */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4174.211672802818!2d110.5564140750052!3d-7.801367992218893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwNDgnMDQuOSJTIDExMMKwMzMnMzIuNCJF!5e1!3m2!1sid!2sid!4v1778156648653!5m2!1sid!2sid"
              width="100%"
              height="400"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Label bawah peta */}
            <div style={{
              background: '#FAFDF8', padding: '12px 20px',
              borderTop: '1px solid #E8EDE9',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: 8,
            }}>
              <div style={{ fontSize: 12, color: '#6B7A6E' }}>
                🕐 Jam Pelayanan: Senin – Jumat, 08.00 – 15.00 WIB
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, padding: '3px 10px',
                borderRadius: 100, background: '#E8F5E9', color: '#1D6A3A',
              }}>
                ● Buka Sekarang
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
