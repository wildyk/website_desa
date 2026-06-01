import { STAT_DESA } from '@/lib/data'

export default function Hero() {
  return (
    <section
      id="beranda"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/images/hero.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 5% 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(160deg, rgba(15,61,30,0.88) 0%, rgba(29,106,58,0.76) 50%, rgba(46,139,87,0.68) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative Blur */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          left: -120,
          width: 320,
          height: 320,
          background: 'rgba(255,255,255,0.08)',
          filter: 'blur(100px)',
          borderRadius: '50%',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: -120,
          right: -120,
          width: 320,
          height: 320,
          background: 'rgba(255,255,255,0.06)',
          filter: 'blur(100px)',
          borderRadius: '50%',
        }}
      />

      {/* Badge */}
      <div
        className="anim-1"
        style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: 'rgba(255,255,255,0.92)',
          fontSize: 14,
          fontWeight: 600,
          padding: '8px 18px',
          borderRadius: 100,
          marginBottom: 28,
          letterSpacing: '.4px',
          backdropFilter: 'blur(6px)',
          zIndex: 2,
        }}
      >
        🌿 Website Resmi Desa Rejosari 2026
      </div>

      {/* Heading */}
      <h1
        className="anim-2"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(52px, 7vw, 88px)',
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.08,
          marginBottom: 24,
          maxWidth: 900,
          zIndex: 2,
          textShadow: '0 10px 30px rgba(0,0,0,0.25)',
        }}
      >
        Desa Maju,
        <br />
        Sejahtera & Bermartabat
      </h1>

      {/* Description */}
      <p
        className="anim-3"
        style={{
          fontSize: 19,
          color: 'rgba(255,255,255,0.82)',
          maxWidth: 700,
          margin: '0 auto 46px',
          fontWeight: 300,
          lineHeight: 1.8,
          zIndex: 2,
        }}
      >
        Portal digital resmi Desa Rejosari untuk layanan administrasi,
        informasi publik, pengembangan UMKM, wisata desa, dan berbagai
        potensi daerah yang terbuka untuk seluruh masyarakat.
      </p>

      {/* CTA */}
      <div
        className="anim-4"
        style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 70,
          zIndex: 2,
        }}
      >
        <a
          href="/layanan"
          style={{
            background: '#fff',
            color: '#1D6A3A',
            padding: '16px 34px',
            borderRadius: 14,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
            boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
            transition: 'all .3s ease',
          }}
        >
          Layanan Online
        </a>

        <a
          href="/profil"
          style={{
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            padding: '16px 34px',
            borderRadius: 14,
            fontWeight: 600,
            fontSize: 16,
            textDecoration: 'none',
            border: '1.5px solid rgba(255,255,255,0.35)',
            backdropFilter: 'blur(8px)',
          }}
        >
          Profil Desa
        </a>
      </div>

      {/* Stats */}
      <div
        className="anim-5"
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 24,
          padding: '28px 42px',
          display: 'flex',
          backdropFilter: 'blur(12px)',
          maxWidth: 760,
          width: '100%',
          zIndex: 2,
          marginBottom: 60,
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
        }}
      >
        {STAT_DESA.map((s, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              textAlign: 'center',
              borderRight:
                i < STAT_DESA.length - 1
                  ? '1px solid rgba(255,255,255,0.18)'
                  : 'none',
              padding: '0 20px',
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 34,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              {s.nilai}
            </div>

            <div
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.72)',
                marginTop: 6,
                letterSpacing: '.4px',
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Section */}
      <div
        style={{
          width: '100%',
          maxWidth: 1100,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24,
          zIndex: 2,
        }}
      >
        {[
          {
            icon: '🏡',
            title: 'Pelayanan Cepat',
            desc: 'Administrasi desa lebih mudah dan cepat melalui sistem digital modern.',
          },
          {
            icon: '🌾',
            title: 'Potensi Pertanian',
            desc: 'Mendukung pengembangan hasil tani dan UMKM lokal masyarakat desa.',
          },
          {
            icon: '📢',
            title: 'Informasi Terbuka',
            desc: 'Menyediakan berita dan pengumuman resmi secara transparan.',
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: 22,
              padding: '28px',
              backdropFilter: 'blur(10px)',
              textAlign: 'left',
              boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
            }}
          >
            <div
              style={{
                fontSize: 38,
                marginBottom: 18,
              }}
            >
              {item.icon}
            </div>

            <h3
              style={{
                color: '#fff',
                fontSize: 22,
                marginBottom: 12,
                fontWeight: 700,
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: 'rgba(255,255,255,0.76)',
                fontSize: 15,
                lineHeight: 1.7,
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.7)',
          fontSize: 13,
          letterSpacing: '1px',
          zIndex: 2,
        }}
      >
        Scroll Down ↓
      </div>
    </section>
  )
}