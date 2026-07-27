'use client'

import { useEffect, useState } from 'react'

type Stat = { id: number; label: string; nilai: string }
type Profil = { captionUtama: string; subcaption: string } | null

const defaultProfil = {
  captionUtama: 'Desa Maju, Sejahtera & Bermartabat',
  subcaption: 'Portal digital resmi desa untuk informasi publik dan kegiatan masyarakat.',
}

export default function Hero() {
  const [profil, setProfil] = useState<Profil>(defaultProfil)
  const [stats, setStats] = useState<Stat[]>([])

  useEffect(() => {
    Promise.all([fetch('/api/profil'), fetch('/api/statistik')])
      .then(async ([profilRes, statsRes]) => {
        if (profilRes.ok) setProfil(await profilRes.json())
        if (statsRes.ok) setStats(await statsRes.json())
      })
      .catch(() => undefined)
  }, [])

  const heading = (profil?.captionUtama || defaultProfil.captionUtama).split(', ')

  return (
    <section id="beranda" style={{ minHeight: '100vh', backgroundImage: 'url("/images/hero.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 5% 80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(15,61,30,0.88), rgba(29,106,58,0.76) 50%, rgba(46,139,87,0.68))', pointerEvents: 'none' }} />
      <div className="anim-1" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.92)', fontSize: 14, fontWeight: 600, padding: '8px 18px', borderRadius: 100, marginBottom: 28, zIndex: 2 }}>🌿 Website Resmi Desa Rejosari</div>
      <h1 className="anim-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(48px, 7vw, 82px)', fontWeight: 700, color: '#fff', lineHeight: 1.08, marginBottom: 24, maxWidth: 900, zIndex: 2, textShadow: '0 10px 30px rgba(0,0,0,0.25)' }}>{heading.map((line, index) => <span key={line}>{line}{index < heading.length - 1 && <br />}</span>)}</h1>
      <p className="anim-3" style={{ fontSize: 19, color: 'rgba(255,255,255,0.82)', maxWidth: 700, margin: '0 auto 46px', fontWeight: 300, lineHeight: 1.8, zIndex: 2 }}>{profil?.subcaption || defaultProfil.subcaption}</p>
      <div className="anim-4" style={{ marginBottom: 54, zIndex: 2 }}><a href="/#profil" style={{ background: '#fff', color: '#1D6A3A', padding: '16px 34px', borderRadius: 14, fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 12px 30px rgba(0,0,0,0.18)' }}>Profil Desa</a></div>
      {stats.length > 0 && <div className="anim-5" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 24, padding: '28px 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', backdropFilter: 'blur(12px)', maxWidth: 760, width: '100%', zIndex: 2 }}>
        {stats.map((s, i) => <div key={s.id} style={{ flex: '1 1 130px', textAlign: 'center', borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.18)' : 'none', padding: '0 16px' }}><div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: '#fff' }}>{s.nilai}</div><div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', marginTop: 6 }}>{s.label}</div></div>)}
      </div>}
    </section>
  )
}
