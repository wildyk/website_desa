'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Kredensial admin — ganti sesuai kebutuhan
// Untuk produksi, gunakan autentikasi server-side
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'desa2024',
}

export default function AdminModal() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const closeModal = () => {
    document.getElementById('adminModal')?.classList.remove('active')
    document.body.style.overflow = ''
    setError('')
    setForm({ username: '', password: '' })
  }

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      setError('Username dan password wajib diisi.')
      return
    }

    setLoading(true)
    setError('')

    // Simulasi delay network
    await new Promise(r => setTimeout(r, 800))

    if (
      form.username === ADMIN_CREDENTIALS.username &&
      form.password === ADMIN_CREDENTIALS.password
    ) {
      // Simpan sesi sederhana
      sessionStorage.setItem('admin_logged_in', 'true')
      closeModal()
      router.push('/admin')
    } else {
      setError('Username atau password salah.')
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin()
  }

  const inputStyle = (focused: boolean = false) => ({
    width: '100%', padding: '11px 14px',
    border: `1.5px solid ${focused ? '#1D6A3A' : '#E8EDE9'}`,
    borderRadius: 10, fontSize: 14,
    fontFamily: 'inherit', outline: 'none',
    transition: 'border-color .2s',
    boxSizing: 'border-box' as const,
  })

  return (
    <>
      <div
        id="adminModal"
        onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        style={{
          display: 'none',
          position: 'fixed', inset: 0,
          background: 'rgba(15,30,20,0.7)',
          backdropFilter: 'blur(6px)',
          zIndex: 2000,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          background: '#fff', borderRadius: 22,
          padding: 40, width: '100%', maxWidth: 420,
          margin: '0 20px', position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}>
          {/* Close */}
          <button
            onClick={closeModal}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'none', border: 'none', fontSize: 20,
              cursor: 'pointer', color: '#6B7A6E',
              width: 32, height: 32, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: '#F0FAF4', marginBottom: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24,
            }}>🔐</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 6, color: '#1A2E1F' }}>
              Login Admin
            </h2>
            <p style={{ fontSize: 14, color: '#6B7A6E' }}>
              Masuk ke Dashboard Admin Desa Sukamaju
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: '#FEE2E2', color: '#DC2626',
              padding: '10px 14px', borderRadius: 9,
              fontSize: 13, marginBottom: 16,
              border: '1px solid #FECACA',
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Username */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#1A2E1F' }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Masukkan username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              onKeyDown={handleKeyDown}
              style={inputStyle()}
              onFocus={e => (e.target.style.borderColor = '#1D6A3A')}
              onBlur={e => (e.target.style.borderColor = '#E8EDE9')}
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#1A2E1F' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Masukkan password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                onKeyDown={handleKeyDown}
                style={{ ...inputStyle(), paddingRight: 44 }}
                onFocus={e => (e.target.style.borderColor = '#1D6A3A')}
                onBlur={e => (e.target.style.borderColor = '#E8EDE9')}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                style={{
                  position: 'absolute', right: 12, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  cursor: 'pointer', fontSize: 16, color: '#6B7A6E',
                }}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Tombol Login */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: '100%', padding: 13,
              background: loading ? '#6B9E7A' : '#1D6A3A',
              color: '#fff', border: 'none', borderRadius: 10,
              fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', transition: 'background .2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff', borderRadius: '50%',
                  display: 'inline-block', animation: 'spin 0.7s linear infinite',
                }} />
                Memverifikasi…
              </>
            ) : 'Masuk ke Dashboard →'}
          </button>

          {/* Info kredensial default */}
          <p style={{ fontSize: 11, color: '#6B7A6E', textAlign: 'center', marginTop: 14 }}>
            Demo: username <code style={{ background: '#F0FAF4', padding: '1px 5px', borderRadius: 4 }}>admin</code> / password <code style={{ background: '#F0FAF4', padding: '1px 5px', borderRadius: 4 }}>desa2024</code>
          </p>
        </div>
      </div>

      <style>{`
        #adminModal.active { display: flex !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  )
}
