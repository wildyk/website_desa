'use client'

import { useEffect, useState } from 'react'
import { PERANGKAT as defaultPerangkat } from '@/lib/data'

interface PerangkatItem {
  id: number
  nama: string
  jabatan: string
  foto?: string | null
  inisial?: string | null
  warnaBg?: string | null
  urutan?: number
}

function AvatarCard({ p }: { p: PerangkatItem }) {
  const inisialText = p.inisial || p.nama.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const bg = p.warnaBg || '#1D6A3A'

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 8, minWidth: 100, maxWidth: 130,
    }}>
      {/* Avatar — Inisial */}
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        border: '3px solid #fff',
        boxShadow: '0 4px 16px rgba(29,106,58,0.18)',
        flexShrink: 0,
        background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontWeight: 700, fontSize: 20,
          color: '#fff',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          {inisialText}
        </span>
      </div>

      {/* Info */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 12, fontWeight: 600, color: '#1A2E1F',
          lineHeight: 1.3, marginBottom: 3,
        }}>
          {p.nama.split(',')[0]}
        </div>
        <div style={{
          fontSize: 10, color: '#fff',
          background: '#1D6A3A',
          padding: '2px 8px', borderRadius: 100,
          fontWeight: 500, whiteSpace: 'nowrap',
        }}>
          {p.jabatan}
        </div>
      </div>
    </div>
  )
}

function GarisPenghubung() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      height: 28,
    }}>
      <div style={{ width: 2, background: '#C8E6D4', height: '100%' }} />
    </div>
  )
}

export default function Profil() {
  const [perangkatList, setPerangkatList] = useState<PerangkatItem[]>(defaultPerangkat)

  useEffect(() => {
    fetch('/api/perangkat')
      .then(res => (res.ok ? res.json() : []))
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPerangkatList(data)
        }
      })
      .catch(() => undefined)
  }, [])

  // Organisasi hierarki otomatis berdasar urutan atau susunan
  const kepala = perangkatList[0] || null
  const sekretaris = perangkatList[1] || null
  const kaurList = perangkatList.slice(2, 4)
  const kasiStafList = perangkatList.slice(4)

  const piramida = [
    kepala ? [kepala] : [],
    sekretaris ? [sekretaris] : [],
    kaurList,
    kasiStafList,
  ].filter(level => level.length > 0)

  return (
    <section id="profil" style={{ padding: '88px 5%', background: '#F0FAF4' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 60, alignItems: 'start',
      }}>

        {/* Kiri — Narasi */}
        <div className="reveal">
          <span style={{
            display: 'inline-block', background: '#fff', color: '#1D6A3A',
            fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 100,
            textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 20,
            border: '1px solid rgba(29,106,58,0.15)',
          }}>
            Profil Desa
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, marginBottom: 14,
          }}>
            Mengenal Lebih Dekat Desa Rejosari
          </h2>
          <p style={{ color: '#4A5E4F', fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
            Desa Rejosari berdiri sejak tahun 1920 dan merupakan salah satu desa tua di Kecamatan Indah.
            Dengan luas wilayah 247 hektare, desa ini terdiri dari dua dusun dan delapan RT/RW.
          </p>
          <p style={{ color: '#4A5E4F', fontSize: 15, lineHeight: 1.75, marginBottom: 24 }}>
            Sebagian besar penduduk bermata pencaharian sebagai petani, pengrajin, dan pelaku UMKM.
            Desa ini terus berkembang seiring dengan program pembangunan desa yang berkelanjutan.
          </p>

          {/* Visi */}
          <div style={{
            background: '#fff', border: '1px solid #E8EDE9',
            borderRadius: 14, padding: '20px 22px', marginBottom: 12,
            borderLeft: '4px solid #1D6A3A',
          }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: '#1D6A3A', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 8 }}>
              Visi
            </h4>
            <p style={{ color: '#4A5E4F', fontSize: 14, lineHeight: 1.6 }}>
              "Terwujudnya Desa Rejosari yang Maju, Mandiri, dan Sejahtera berlandaskan nilai-nilai Gotong Royong."
            </p>
          </div>

          {/* Misi */}
          <div style={{
            background: '#fff', border: '1px solid #E8EDE9',
            borderRadius: 14, padding: '20px 22px',
            borderLeft: '4px solid #4CAF77',
          }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: '#1D6A3A', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: 8 }}>
              Misi
            </h4>
            <p style={{ color: '#4A5E4F', fontSize: 14, lineHeight: 1.6 }}>
              Meningkatkan kualitas SDM, pembangunan infrastruktur merata, dan pengembangan ekonomi berbasis potensi lokal desa.
            </p>
          </div>
        </div>

        {/* Kanan — Struktur Organisasi Piramida */}
        <div className="reveal">
          <div style={{
            background: '#fff', border: '1px solid #E8EDE9',
            borderRadius: 22, padding: '32px 24px',
            boxShadow: '0 4px 24px rgba(29,106,58,0.08)',
          }}>
            <h3 style={{
              fontSize: 24, fontWeight: 600, color: '#1D6A3A',
              textTransform: 'uppercase', letterSpacing: '.7px',
              marginBottom: 28, textAlign: 'center',
            }}>
              Struktur Organisasi
            </h3>

            {/* Piramida */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {piramida.map((level, li) => (
                <div key={li} style={{ width: '100%' }}>
                  {/* Garis penghubung antar level */}
                  {li > 0 && <GarisPenghubung />}

                  {/* Garis horizontal kalau lebih dari 1 node */}
                  {level.length > 1 && (
                    <div style={{
                      display: 'flex', justifyContent: 'center',
                      marginBottom: -2,
                    }}>
                      <div style={{
                        width: `${level.length * 60}%`,
                        height: 2, background: '#C8E6D4',
                        maxWidth: 240,
                      }} />
                    </div>
                  )}

                  {/* Node di level ini */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: level.length === 1 ? 0 : 'clamp(16px, 4vw, 40px)',
                  }}>
                    {level.map(p => (
                      <AvatarCard key={p.id} p={p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
