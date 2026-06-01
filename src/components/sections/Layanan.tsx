'use client'

import { useState } from 'react'
import { LAYANAN_SURAT } from '@/lib/data'
import type { FormLayanan } from '@/types'

const DEFAULT_FORM: FormLayanan = { namaLengkap: '', noHp: '', jenisSurat: LAYANAN_SURAT[0].nama, keperluan: '' }

export default function Layanan() {
  const [form, setForm] = useState<FormLayanan>(DEFAULT_FORM)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const toast = document.getElementById('toast')
    if (toast) {
      toast.textContent = '✅ Permohonan Anda telah dikirim! Kami akan menghubungi via WhatsApp.'
      toast.classList.add('show')
      setTimeout(() => toast.classList.remove('show'), 3500)
    }
    setForm(DEFAULT_FORM)
  }

  return (
    <section id="layanan" style={{ padding: '88px 5%', background: '#F0FAF4' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <span style={{
            display: 'inline-block', background: '#fff', color: '#1D6A3A',
            fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 100,
            textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 20,
            border: '1px solid rgba(29,106,58,0.15)',
        }}>Layanan Online</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, marginBottom: 14 }}>
          Layanan Administrasi Digital
        </h2>
        <p style={{ fontSize: 16, color: '#4A5E4F', maxWidth: 520, lineHeight: 1.7 }}>
          Urus surat keterangan dari mana saja, tanpa perlu antri di kantor desa.
        </p>
      </div>

      {/* Grid Layanan */}
      <div className="reveal" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 20,
      }}>
        {LAYANAN_SURAT.map((l) => (
          <div
            key={l.id}
            style={{
              background: '#FAFDF8', border: '1px solid #E8EDE9',
              borderRadius: 14, padding: '24px 26px',
              display: 'flex', gap: 18, alignItems: 'flex-start',
              cursor: 'pointer', transition: 'all .2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#4CAF77'
              el.style.background = '#F0FAF4'
              el.style.transform = 'translateX(4px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = '#E8EDE9'
              el.style.background = '#FAFDF8'
              el.style.transform = ''
            }}
            onClick={() => setForm(f => ({ ...f, jenisSurat: l.nama }))}
          >
            <div style={{ width: 46, height: 46, flexShrink: 0, background: '#F0FAF4', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              {l.emoji}
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 5 }}>{l.nama}</h3>
              <p style={{ fontSize: 13, color: '#6B7A6E', lineHeight: 1.5 }}>{l.deskripsi}</p>
              <span style={{ display: 'inline-block', marginTop: 10, fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: '#F0FAF4', color: '#1D6A3A' }}>
                {l.estimasi}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Form Pengajuan */}
      <div className="reveal" style={{
        background: '#1D6A3A', borderRadius: 22, padding: '40px',
        marginTop: 48,
        display: 'flex', gap: 48, alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        {/* Info */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            Ajukan Surat Sekarang
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>
            Isi formulir dan tim kami akan memproses permohonan Anda dalam 1–2 hari kerja.
            Anda akan dihubungi via WhatsApp.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ flex: 1.5, minWidth: 280 }}>
          <div style={{ display: 'flex', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 140, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>Nama Lengkap</label>
              <input
                type="text" required placeholder="Nama sesuai KTP"
                value={form.namaLengkap}
                onChange={e => setForm(f => ({ ...f, namaLengkap: e.target.value }))}
                style={{ padding: '11px 14px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 140, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>No. HP / WhatsApp</label>
              <input
                type="tel" required placeholder="08xx-xxxx-xxxx"
                value={form.noHp}
                onChange={e => setForm(f => ({ ...f, noHp: e.target.value }))}
                style={{ padding: '11px 14px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 140, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>Jenis Surat</label>
              <select
                value={form.jenisSurat}
                onChange={e => setForm(f => ({ ...f, jenisSurat: e.target.value }))}
                style={{ padding: '11px 14px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
              >
                {LAYANAN_SURAT.map(l => <option key={l.id} value={l.nama} style={{ background: '#1D6A3A' }}>{l.nama}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 140, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>Keperluan</label>
              <input
                type="text" required placeholder="Ditulis singkat"
                value={form.keperluan}
                onChange={e => setForm(f => ({ ...f, keperluan: e.target.value }))}
                style={{ padding: '11px 14px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
              />
            </div>
          </div>
          <button type="submit" style={{
            width: '100%', padding: 13,
            background: '#fff', color: '#1D6A3A',
            border: 'none', borderRadius: 10,
            fontSize: 15, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'inherit', transition: 'background .2s',
          }}>
            Kirim Permohonan →
          </button>
        </form>
      </div>
    </section>
  )
}
