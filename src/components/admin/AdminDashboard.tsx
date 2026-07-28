'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Tab = 'overview' | 'beranda' | 'potensi' | 'berita' | 'pengumuman' | 'galeri'

interface Berita {
  id: number
  judul: string
  ringkasan: string
  isi: string | null
  kategori: string
  emoji: string
  bgColor: string
  tanggal: string
}

interface Pengumuman {
  id: number
  judul: string
  isi: string
  pengirim: string
  status: string
  tanggal: string
}

interface StatDesa {
  id: number
  label: string
  nilai: string
}

interface Profil { id: number; captionUtama: string; subcaption: string }
interface GaleriItem { id: number; judul: string; image: string }
interface PotensiDesa { id: number; judul: string; deskripsi: string; emoji: string }

// ── Warna & konstanta ─────────────────────────────────────────
const H = '#1D6A3A'
const H2 = '#2E8B57'
const BG = '#F4F8F5'
const CARD = '#fff'
const BORDER = '#E2EBE5'
const TEXT = '#1A2E1F'
const MUTED = '#6B7A6E'

// ── Komponen kecil ────────────────────────────────────────────
function StatCard({ icon, label, value, sub }: { icon: string; label: string; value: string | number; sub?: string }) {
  return (
    <div style={{
      background: CARD, borderRadius: 16, padding: '20px 24px',
      border: `1px solid ${BORDER}`,
      display: 'flex', gap: 16, alignItems: 'center',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: '#F0FAF4', fontSize: 22,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 13, color: MUTED, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: TEXT, fontFamily: "'Playfair Display', serif" }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: H2, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  )
}

function Badge({ status }: { status: string }) {
  const isActive = status === 'aktif'
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100,
      background: isActive ? '#E8F5E9' : '#F5F5F5',
      color: isActive ? H : MUTED,
    }}>{isActive ? 'Aktif' : 'Selesai'}</span>
  )
}

// ── Main Dashboard ────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('overview')
  const [beritaList, setBeritaList] = useState<Berita[]>([])
  const [pengumumanList, setPengumumanList] = useState<Pengumuman[]>([])
  const [statList, setStatList] = useState<StatDesa[]>([])
  const [profil, setProfil] = useState<Profil | null>(null)
  const [galeriList, setGaleriList] = useState<GaleriItem[]>([])
  const [potensiList, setPotensiList] = useState<PotensiDesa[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Account management state
  const [accountForm, setAccountForm] = useState({
    username: 'edirejosari',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [updatingAccount, setUpdatingAccount] = useState(false)

  // Custom Toast State
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    show: false,
    message: '',
    type: 'info',
  })

  // Custom Confirm Dialog State
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean
    title: string
    message: string
    confirmText: string
    cancelText: string
    danger: boolean
    onConfirm: () => void
  }>({
    show: false,
    title: '',
    message: '',
    confirmText: 'Ya, Lanjutkan',
    cancelText: 'Batal',
    danger: true,
    onConfirm: () => {},
  })

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast(t => ({ ...t, show: false }))
    }, 4000)
  }

  const askConfirm = ({
    title,
    message,
    confirmText = 'Ya, Lanjutkan',
    cancelText = 'Batal',
    danger = true,
    onConfirm,
  }: {
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    danger?: boolean
    onConfirm: () => void
  }) => {
    setConfirmModal({
      show: true,
      title,
      message,
      confirmText,
      cancelText,
      danger,
      onConfirm: () => {
        setConfirmModal(c => ({ ...c, show: false }))
        onConfirm()
      },
    })
  }

  // Load data dari API saat mount & cek auth
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_logged_in') !== 'true') {
      router.push('/')
      return
    }
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setLoading(true)
      const [beritaRes, pengumumanRes, statistikRes, profilRes, galeriRes, potensiRes] = await Promise.all([
        fetch('/api/berita'),
        fetch('/api/pengumuman'),
        fetch('/api/statistik'),
        fetch('/api/profil'),
        fetch('/api/galeri'),
        fetch('/api/potensi'),
      ])
      
      if (beritaRes.ok) setBeritaList(await beritaRes.json())
      if (pengumumanRes.ok) setPengumumanList(await pengumumanRes.json())
      if (statistikRes.ok) setStatList(await statistikRes.json())
      if (profilRes.ok) {
        const profilData = await profilRes.json()
        setProfil(profilData)
        if (profilData) setProfilForm({ captionUtama: profilData.captionUtama, subcaption: profilData.subcaption })
      }
      if (galeriRes.ok) setGaleriList(await galeriRes.json())
      if (potensiRes.ok) setPotensiList(await potensiRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
      showToast('Gagal memuat data dari server.', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Modal state
  const [showBeritaForm, setShowBeritaForm] = useState(false)
  const [showPengumumanForm, setShowPengumumanForm] = useState(false)
  const [showStatForm, setShowStatForm] = useState(false)
  const [showGaleriForm, setShowGaleriForm] = useState(false)
  const [showPotensiForm, setShowPotensiForm] = useState(false)

  const [editBerita, setEditBerita] = useState<Berita | null>(null)
  const [editPengumuman, setEditPengumuman] = useState<Pengumuman | null>(null)
  const [editStat, setEditStat] = useState<StatDesa | null>(null)
  const [editGaleri, setEditGaleri] = useState<GaleriItem | null>(null)
  const [editPotensi, setEditPotensi] = useState<PotensiDesa | null>(null)

  // Form state
  const [bForm, setBForm] = useState({ judul: '', ringkasan: '', kategori: 'Umum' })
  const [pForm, setPForm] = useState({ judul: '', isi: '', pengirim: '', status: 'aktif' })
  const [sForm, setSForm] = useState({ label: '', nilai: '' })
  const [profilForm, setProfilForm] = useState({ captionUtama: '', subcaption: '' })
  const [gForm, setGForm] = useState({ judul: '', image: '' })
  const [potensiForm, setPotensiForm] = useState({ judul: '', deskripsi: '', emoji: '🌱' })

  // ── Handler Ganti Password / Account ──
  const handleUpdateAccount = async () => {
    if (!accountForm.currentPassword.trim() || !accountForm.newPassword.trim()) {
      showToast('Password saat ini dan password baru wajib diisi.', 'error')
      return
    }

    if (accountForm.newPassword !== accountForm.confirmNewPassword) {
      showToast('Konfirmasi password baru tidak cocok.', 'error')
      return
    }

    if (accountForm.newPassword.length < 6) {
      showToast('Password baru minimal 6 karakter.', 'error')
      return
    }

    setUpdatingAccount(true)
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: accountForm.username,
          currentPassword: accountForm.currentPassword,
          newPassword: accountForm.newPassword,
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        showToast(data.message || 'Akun admin berhasil diperbarui!', 'success')
        setAccountForm({
          username: data.username || accountForm.username,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        })
      } else {
        showToast(data.error || 'Gagal memperbarui akun admin.', 'error')
      }
    } catch (error) {
      console.error('Update account error:', error)
      showToast('Terjadi kesalahan saat memperbarui akun.', 'error')
    } finally {
      setUpdatingAccount(false)
    }
  }

  // ── Handlers Potensi ──
  const openAddPotensi = () => {
    setEditPotensi(null)
    setPotensiForm({ judul: '', deskripsi: '', emoji: '🌱' })
    setShowPotensiForm(true)
  }

  const openEditPotensi = (p: PotensiDesa) => {
    setEditPotensi(p)
    setPotensiForm({ judul: p.judul, deskripsi: p.deskripsi, emoji: p.emoji || '🌱' })
    setShowPotensiForm(true)
  }

  const savePotensi = async () => {
    if (!potensiForm.judul.trim() || !potensiForm.deskripsi.trim()) {
      showToast('Judul dan deskripsi potensi wajib diisi.', 'error')
      return
    }
    setSaving(true)
    try {
      if (editPotensi) {
        const res = await fetch(`/api/potensi/${editPotensi.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(potensiForm),
        })
        if (res.ok) {
          const updated = await res.json()
          setPotensiList(list => list.map(item => item.id === editPotensi.id ? updated : item))
          setShowPotensiForm(false)
          showToast('Berhasil memperbarui potensi desa!', 'success')
        } else {
          showToast('Gagal mengedit potensi desa.', 'error')
        }
      } else {
        const res = await fetch('/api/potensi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(potensiForm),
        })
        if (res.ok) {
          const newItem = await res.json()
          setPotensiList(list => [newItem, ...list])
          setShowPotensiForm(false)
          showToast('Berhasil menambahkan potensi desa baru!', 'success')
        } else {
          showToast('Gagal menambahkan potensi desa.', 'error')
        }
      }
    } catch (error) {
      console.error('Error saving potensi:', error)
      showToast('Terjadi kesalahan pada server.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const deletePotensi = (id: number) => {
    askConfirm({
      title: 'Hapus Potensi Desa',
      message: 'Apakah Anda yakin ingin menghapus data potensi desa ini?',
      confirmText: 'Ya, Hapus',
      danger: true,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/potensi/${id}`, { method: 'DELETE' })
          if (res.ok) {
            setPotensiList(list => list.filter(item => item.id !== id))
            showToast('Potensi desa berhasil dihapus.', 'success')
          } else {
            showToast('Gagal menghapus potensi desa.', 'error')
          }
        } catch (error) {
          console.error('Error deleting potensi:', error)
          showToast('Terjadi kesalahan saat menghapus.', 'error')
        }
      },
    })
  }

  // ── Handlers Berita ──
  const openAddBerita = () => {
    setEditBerita(null)
    setBForm({ judul: '', ringkasan: '', kategori: 'Umum' })
    setShowBeritaForm(true)
  }

  const openEditBerita = (b: Berita) => {
    setEditBerita(b)
    setBForm({ judul: b.judul, ringkasan: b.ringkasan, kategori: b.kategori })
    setShowBeritaForm(true)
  }

  const saveBerita = async () => {
    if (!bForm.judul.trim() || !bForm.ringkasan.trim()) {
      showToast('Judul dan ringkasan berita wajib diisi.', 'error')
      return
    }
    setSaving(true)
    try {
      if (editBerita) {
        const res = await fetch(`/api/berita/${editBerita.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bForm),
        })
        if (res.ok) {
          setBeritaList(list => list.map(b => b.id === editBerita.id ? { ...b, ...bForm, tanggal: b.tanggal } : b))
          setShowBeritaForm(false)
          showToast('Berita berhasil diperbarui!', 'success')
        }
      } else {
        const res = await fetch('/api/berita', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...bForm,
            tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          }),
        })
        if (res.ok) {
          const newBerita = await res.json()
          setBeritaList([newBerita, ...beritaList])
          setShowBeritaForm(false)
          showToast('Berita berhasil ditambahkan!', 'success')
        }
      }
    } catch (error) {
      console.error('Error saving berita:', error)
      showToast('Gagal menyimpan berita.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const deleteBerita = (id: number) => {
    askConfirm({
      title: 'Hapus Berita',
      message: 'Apakah Anda yakin ingin menghapus berita ini secara permanen?',
      confirmText: 'Ya, Hapus',
      danger: true,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/berita/${id}`, { method: 'DELETE' })
          if (res.ok) {
            setBeritaList(list => list.filter(b => b.id !== id))
            showToast('Berita berhasil dihapus.', 'success')
          }
        } catch (error) {
          console.error('Error deleting berita:', error)
          showToast('Gagal menghapus berita.', 'error')
        }
      },
    })
  }

  // ── Handlers Pengumuman ──
  const openAddPengumuman = () => {
    setEditPengumuman(null)
    setPForm({ judul: '', isi: '', pengirim: '', status: 'aktif' })
    setShowPengumumanForm(true)
  }

  const openEditPengumuman = (p: Pengumuman) => {
    setEditPengumuman(p)
    setPForm({ judul: p.judul, isi: p.isi, pengirim: p.pengirim, status: p.status })
    setShowPengumumanForm(true)
  }

  const savePengumuman = async () => {
    if (!pForm.judul.trim() || !pForm.isi.trim()) {
      showToast('Judul dan isi pengumuman wajib diisi.', 'error')
      return
    }
    setSaving(true)
    try {
      if (editPengumuman) {
        const res = await fetch(`/api/pengumuman/${editPengumuman.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pForm),
        })
        if (res.ok) {
          setPengumumanList(list => list.map(p => p.id === editPengumuman.id ? { ...p, ...pForm } : p))
          setShowPengumumanForm(false)
          showToast('Pengumuman berhasil diperbarui!', 'success')
        }
      } else {
        const res = await fetch('/api/pengumuman', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...pForm,
            tanggal: new Date().toISOString().split('T')[0],
          }),
        })
        if (res.ok) {
          const newPengumuman = await res.json()
          setPengumumanList([newPengumuman, ...pengumumanList])
          setShowPengumumanForm(false)
          showToast('Pengumuman berhasil ditambahkan!', 'success')
        }
      }
    } catch (error) {
      console.error('Error saving pengumuman:', error)
      showToast('Gagal menyimpan pengumuman.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const deletePengumuman = (id: number) => {
    askConfirm({
      title: 'Hapus Pengumuman',
      message: 'Apakah Anda yakin ingin menghapus pengumuman ini?',
      confirmText: 'Ya, Hapus',
      danger: true,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/pengumuman/${id}`, { method: 'DELETE' })
          if (res.ok) {
            setPengumumanList(list => list.filter(p => p.id !== id))
            showToast('Pengumuman berhasil dihapus.', 'success')
          }
        } catch (error) {
          console.error('Error deleting pengumuman:', error)
          showToast('Gagal menghapus pengumuman.', 'error')
        }
      },
    })
  }

  // ── Handlers Statistik ──
  const openEditStat = (s: StatDesa) => {
    setEditStat(s)
    setSForm({ label: s.label, nilai: s.nilai })
    setShowStatForm(true)
  }

  const saveStat = async () => {
    if (!sForm.label.trim() || !sForm.nilai.trim()) {
      showToast('Label dan nilai statistik wajib diisi.', 'error')
      return
    }
    setSaving(true)
    try {
      if (editStat) {
        const res = await fetch(`/api/statistik/${editStat.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sForm),
        })
        if (res.ok) {
          setStatList(list => list.map(s => s.id === editStat.id ? { ...s, ...sForm } : s))
          setShowStatForm(false)
          showToast('Statistik berhasil diperbarui!', 'success')
        }
      }
    } catch (error) {
      console.error('Error saving statistik:', error)
      showToast('Gagal menyimpan statistik.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const saveProfil = async () => {
    const response = await fetch('/api/profil', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profilForm) })
    if (response.ok) {
      setProfil(await response.json())
      showToast('Caption beranda berhasil disimpan!', 'success')
    }
  }

  const openGaleriForm = (item?: GaleriItem) => {
    setEditGaleri(item ?? null)
    setGForm(item ? { judul: item.judul, image: item.image } : { judul: '', image: '' })
    setShowGaleriForm(true)
  }

  const saveGaleri = async () => {
    if (!gForm.judul.trim() || !gForm.image.trim()) {
      showToast('Judul dan gambar wajib diisi.', 'error')
      return
    }
    const response = await fetch(editGaleri ? `/api/galeri/${editGaleri.id}` : '/api/galeri', { method: editGaleri ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(gForm) })
    if (response.ok) {
      const item = await response.json()
      setGaleriList(list => editGaleri ? list.map(g => g.id === item.id ? item : g) : [item, ...list])
      setShowGaleriForm(false)
      showToast('Foto galeri berhasil disimpan!', 'success')
    }
  }

  const uploadGaleriImage = async (file?: File) => {
    if (!file) return
    if (file.size > 500 * 1024) {
      showToast('Ukuran berkas gambar melebihi batas maksimal 500 KB.', 'error')
      return
    }
    const data = new FormData()
    data.append('file', file)
    const response = await fetch('/api/upload', { method: 'POST', body: data })
    if (response.ok) {
      const { url } = await response.json()
      setGForm(form => ({ ...form, image: url }))
      showToast('Gambar berhasil diunggah!', 'success')
    } else {
      const res = await response.json()
      showToast(res.error || 'Gagal mengunggah gambar. Ukuran maksimal 500 KB.', 'error')
    }
  }

  const deleteGaleri = (id: number) => {
    askConfirm({
      title: 'Hapus Foto Galeri',
      message: 'Apakah Anda yakin ingin menghapus foto kegiatan ini?',
      confirmText: 'Ya, Hapus',
      danger: true,
      onConfirm: async () => {
        const response = await fetch(`/api/galeri/${id}`, { method: 'DELETE' })
        if (response.ok) {
          setGaleriList(list => list.filter(g => g.id !== id))
          showToast('Foto galeri berhasil dihapus.', 'success')
        } else {
          showToast('Gagal menghapus foto galeri.', 'error')
        }
      },
    })
  }

  const handleLogout = () => {
    askConfirm({
      title: 'Konfirmasi Keluar',
      message: 'Apakah Anda yakin ingin keluar dari Dashboard Admin?',
      confirmText: 'Keluar',
      cancelText: 'Batal',
      danger: true,
      onConfirm: () => {
        sessionStorage.removeItem('admin_logged_in')
        router.push('/')
      },
    })
  }

  // ── Style helpers ──
  const navItem = (active: boolean) => ({
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 16px', borderRadius: 10,
    fontSize: 14, fontWeight: active ? 600 : 400,
    color: active ? H : MUTED,
    background: active ? '#F0FAF4' : 'transparent',
    cursor: 'pointer', border: 'none', width: '100%',
    textAlign: 'left' as const, transition: 'all .15s',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  })

  const inputStyle = {
    width: '100%', padding: '10px 13px',
    border: `1.5px solid ${BORDER}`, borderRadius: 9,
    fontSize: 14, fontFamily: 'inherit',
    outline: 'none', color: TEXT, background: '#FAFDF8',
    boxSizing: 'border-box' as const,
  }

  const btnPrimary = {
    padding: '9px 20px', background: H, color: '#fff',
    border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'inherit', opacity: saving || updatingAccount ? 0.6 : 1,
  }

  const btnDanger = {
    padding: '6px 12px', background: '#FEE2E2', color: '#DC2626',
    border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'inherit',
  }

  const btnSecondary = {
    padding: '6px 12px', background: '#F0FAF4', color: H,
    border: `1px solid ${BORDER}`, borderRadius: 7, fontSize: 12, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'inherit',
  }

  const totalPenduduk = statList.find(s => s.label === 'Total Penduduk')?.nilai ?? '-'

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: BG }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>⏳</div>
          <div style={{ fontSize: 14, color: MUTED }}>Memuat data...</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: BG, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── Toast Notification Container ── */}
      {toast.show && (
        <div style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
          background: toast.type === 'error' ? '#FEF2F2' : toast.type === 'success' ? '#F0FAF4' : '#F0F9FF',
          color: toast.type === 'error' ? '#991B1B' : toast.type === 'success' ? '#166534' : '#075985',
          border: `1px solid ${toast.type === 'error' ? '#FECACA' : toast.type === 'success' ? '#BBF7D0' : '#BAE6FD'}`,
          borderRadius: 14, padding: '14px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
          display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, fontWeight: 500,
          animation: 'fadeIn 0.3s ease-out', maxWidth: 400,
        }}>
          <span style={{ fontSize: 20 }}>
            {toast.type === 'error' ? '⚠️' : toast.type === 'success' ? '✅' : 'ℹ️'}
          </span>
          <div style={{ flex: 1 }}>{toast.message}</div>
          <button onClick={() => setToast(t => ({ ...t, show: false }))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'inherit', opacity: 0.7 }}>✕</button>
        </div>
      )}

      {/* ── Custom Confirm Modal ── */}
      {confirmModal.show && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,30,20,0.65)',
          backdropFilter: 'blur(4px)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }} onClick={e => { if (e.target === e.currentTarget) setConfirmModal(c => ({ ...c, show: false })) }}>
          <div style={{
            background: CARD, borderRadius: 20, padding: 32, width: '100%', maxWidth: 420,
            boxShadow: '0 20px 50px rgba(0,0,0,0.25)', textAlign: 'center',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: confirmModal.danger ? '#FEE2E2' : '#F0FAF4',
              color: confirmModal.danger ? '#DC2626' : H,
              fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              {confirmModal.danger ? '🗑️' : '❓'}
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: TEXT, marginBottom: 8 }}>
              {confirmModal.title}
            </h3>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.5, marginBottom: 24 }}>
              {confirmModal.message}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={() => setConfirmModal(c => ({ ...c, show: false }))}
                style={{
                  flex: 1, padding: '11px 18px', background: '#F0FAF4', color: TEXT,
                  border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {confirmModal.cancelText}
              </button>
              <button
                onClick={confirmModal.onConfirm}
                style={{
                  flex: 1, padding: '11px 18px',
                  background: confirmModal.danger ? '#DC2626' : H,
                  color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Sidebar ── */}
      <aside style={{
        width: 240, background: CARD, borderRight: `1px solid ${BORDER}`,
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
        padding: '0 12px',
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 8px 20px', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 9, background: H,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#fff',
            }}>S</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>Desa Rejosari</div>
              <div style={{ fontSize: 11, color: MUTED }}>Admin Dashboard</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {([
            { id: 'overview', icon: '📊', label: 'Overview' },
            { id: 'beranda', icon: '🏠', label: 'Beranda' },
            { id: 'potensi', icon: '🌱', label: 'Potensi Desa' },
            { id: 'berita', icon: '📰', label: 'Berita' },
            { id: 'pengumuman', icon: '📢', label: 'Pengumuman' },
            { id: 'galeri', icon: '🖼️', label: 'Galeri' },
          ] as { id: Tab; icon: string; label: string }[]).map(item => (
            <button key={item.id} style={navItem(tab === item.id) as any} onClick={() => setTab(item.id)}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '16px 0', borderTop: `1px solid ${BORDER}` }}>
          <button style={{ ...navItem(false), color: '#DC2626' } as any} onClick={handleLogout}>
            <span>🚪</span> Keluar
          </button>
        </div>
      </aside>

      {/* ── Konten Utama ── */}
      <main style={{ marginLeft: 240, flex: 1, padding: '32px 36px', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28, fontWeight: 700, color: TEXT, marginBottom: 4,
          }}>
            {tab === 'overview' && '📊 Overview'}
            {tab === 'beranda' && '🏠 Kelola Beranda'}
            {tab === 'potensi' && '🌱 Kelola Potensi Desa'}
            {tab === 'berita' && '📰 Kelola Berita'}
            {tab === 'pengumuman' && '📢 Kelola Pengumuman'}
            {tab === 'galeri' && '🖼️ Kelola Galeri'}
          </h1>
          <p style={{ fontSize: 14, color: MUTED }}>
            Selamat datang, Admin • Desa Rejosari
          </p>
        </div>

        {/* ── TAB: Overview ── */}
        {tab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
              <StatCard icon="📰" label="Total Berita" value={beritaList.length} sub="artikel dipublikasi" />
              <StatCard icon="📢" label="Pengumuman Aktif" value={pengumumanList.filter(p => p.status === 'aktif').length} sub={`dari ${pengumumanList.length} total`} />
              <StatCard icon="🌱" label="Potensi Desa" value={potensiList.length} sub="sektor potensi" />
              <StatCard icon="👥" label="Penduduk" value={totalPenduduk} sub="jiwa terdaftar" />
            </div>

            {/* Berita terbaru */}
            <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
              <div style={{ padding: '18px 24px', borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: TEXT }}>Berita Terbaru</h2>
                <button style={btnSecondary as any} onClick={() => setTab('berita')}>Lihat Semua</button>
              </div>
              {beritaList.slice(0, 3).map((b, i) => (
                <div key={b.id} style={{
                  padding: '14px 24px', display: 'flex', gap: 14, alignItems: 'center',
                  borderBottom: i < 2 ? `1px solid ${BORDER}` : 'none',
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: b.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{b.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: TEXT, marginBottom: 2 }}>{b.judul}</div>
                    <div style={{ fontSize: 12, color: MUTED }}>{b.tanggal}</div>
                  </div>
                  <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 100, background: '#F0FAF4', color: H, fontWeight: 600 }}>{b.kategori}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: Beranda ── */}
        {tab === 'beranda' && (
          <div style={{ maxWidth: 720, display: 'grid', gap: 28 }}>

            {/* Section 1: Caption Beranda */}
            <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24 }}>
              <h2 style={{ fontSize: 17, marginBottom: 18 }}>Caption Beranda</h2>
              <div style={{ display: 'grid', gap: 14 }}>
                <div><label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Caption utama</label><input style={inputStyle as any} value={profilForm.captionUtama || profil?.captionUtama || ''} onChange={e => setProfilForm(f => ({ ...f, captionUtama: e.target.value }))} placeholder="Desa Maju, Sejahtera & Bermartabat" /></div>
                <div><label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Subcaption</label><textarea style={{ ...inputStyle, minHeight: 100 } as any} value={profilForm.subcaption || profil?.subcaption || ''} onChange={e => setProfilForm(f => ({ ...f, subcaption: e.target.value }))} placeholder="Deskripsi singkat beranda" /></div>
                <div><button style={btnPrimary as any} onClick={saveProfil}>Simpan Caption</button></div>
              </div>
            </div>

            {/* Section 2: Statistik Beranda */}
            <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24 }}>
              <h2 style={{ fontSize: 17, marginBottom: 18 }}>Statistik Beranda</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14 }}>
                {statList.map(s => (
                  <div key={s.id} style={{ border: `1px solid ${BORDER}`, borderRadius: 12, padding: 16 }}>
                    <div style={{ color: MUTED, fontSize: 13 }}>{s.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, margin: '4px 0 12px' }}>{s.nilai}</div>
                    <button style={btnSecondary as any} onClick={() => openEditStat(s)}>Edit</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Pengaturan Akun Admin */}
            <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24 }}>
              <h2 style={{ fontSize: 17, marginBottom: 18, color: TEXT }}>🔐 Pengaturan Akun Admin</h2>
              <div style={{ display: 'grid', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Username Admin</label>
                  <input
                    style={inputStyle as any}
                    value={accountForm.username}
                    onChange={e => setAccountForm(f => ({ ...f, username: e.target.value }))}
                    placeholder="edirejosari"
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Password Saat Ini</label>
                    <input
                      type="password"
                      style={inputStyle as any}
                      value={accountForm.currentPassword}
                      onChange={e => setAccountForm(f => ({ ...f, currentPassword: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Password Baru</label>
                    <input
                      type="password"
                      style={inputStyle as any}
                      value={accountForm.newPassword}
                      onChange={e => setAccountForm(f => ({ ...f, newPassword: e.target.value }))}
                      placeholder="Minimal 6 karakter"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Konfirmasi Password Baru</label>
                    <input
                      type="password"
                      style={inputStyle as any}
                      value={accountForm.confirmNewPassword}
                      onChange={e => setAccountForm(f => ({ ...f, confirmNewPassword: e.target.value }))}
                      placeholder="Ulangi password baru"
                    />
                  </div>
                </div>
                <div>
                  <button
                    style={btnPrimary as any}
                    onClick={handleUpdateAccount}
                    disabled={updatingAccount}
                  >
                    {updatingAccount ? 'Menyimpan...' : 'Simpan Perubahan Akun'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ── TAB: Potensi Desa ── */}
        {tab === 'potensi' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
              <button style={btnPrimary as any} onClick={openAddPotensi}>+ Tambah Potensi</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {potensiList.map((p) => (
                <div key={p.id} style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 22, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{p.emoji}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 6 }}>{p.judul}</h3>
                  <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.5, flex: 1, marginBottom: 16 }}>{p.deskripsi}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={btnSecondary as any} onClick={() => openEditPotensi(p)}>✏️ Edit</button>
                    <button style={btnDanger as any} onClick={() => deletePotensi(p.id)}>🗑️ Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: Galeri ── */}
        {tab === 'galeri' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
              <button style={btnPrimary as any} onClick={() => openGaleriForm()}>+ Tambah Foto</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {galeriList.map(g => (
                <div key={g.id} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden' }}>
                  <img src={g.image} alt={g.judul} style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' }} />
                  <div style={{ padding: 14 }}>
                    <div style={{ fontWeight: 600, marginBottom: 12 }}>{g.judul}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={btnSecondary as any} onClick={() => openGaleriForm(g)}>Edit</button>
                      <button style={btnDanger as any} onClick={() => deleteGaleri(g.id)}>Hapus</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: Berita ── */}
        {tab === 'berita' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
              <button style={btnPrimary as any} onClick={openAddBerita}>+ Tambah Berita</button>
            </div>
            <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#F8FBF9' }}>
                    {['Berita', 'Kategori', 'Tanggal', 'Aksi'].map(h => (
                      <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 600, color: MUTED, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.5px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {beritaList.map((b) => (
                    <tr key={b.id} style={{ borderTop: `1px solid ${BORDER}` }}>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <div style={{ width: 36, height: 36, borderRadius: 8, background: b.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{b.emoji}</div>
                          <div>
                            <div style={{ fontWeight: 500, color: TEXT, lineHeight: 1.3 }}>{b.judul}</div>
                            <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{b.ringkasan.slice(0, 50)}…</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 100, background: '#F0FAF4', color: H, fontWeight: 600 }}>{b.kategori}</span>
                      </td>
                      <td style={{ padding: '14px 20px', color: MUTED, fontSize: 13 }}>{b.tanggal}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button style={btnSecondary as any} onClick={() => openEditBerita(b)}>✏️ Edit</button>
                          <button style={btnDanger as any} onClick={() => deleteBerita(b.id)}>🗑️ Hapus</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: Pengumuman ── */}
        {tab === 'pengumuman' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
              <button style={btnPrimary as any} onClick={openAddPengumuman}>+ Tambah Pengumuman</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {pengumumanList.map((p) => (
                <div key={p.id} style={{ background: CARD, borderRadius: 14, border: `1px solid ${BORDER}`, padding: '18px 22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                        <Badge status={p.status} />
                        <span style={{ fontSize: 12, color: MUTED }}>{p.tanggal}</span>
                        <span style={{ fontSize: 12, color: MUTED }}>• {p.pengirim}</span>
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 6 }}>{p.judul}</h3>
                      <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{p.isi}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button style={btnSecondary as any} onClick={() => openEditPengumuman(p)}>✏️ Edit</button>
                      <button style={btnDanger as any} onClick={() => deletePengumuman(p.id)}>🗑️ Hapus</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ── Modal Form Potensi ── */}
      {showPotensiForm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)', zIndex: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }} onClick={e => { if (e.target === e.currentTarget) setShowPotensiForm(false) }}>
          <div style={{ background: CARD, borderRadius: 18, padding: 32, width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 20, color: TEXT }}>
              {editPotensi ? 'Edit Potensi Desa' : 'Tambah Potensi Desa Baru'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 80 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Emoji</label>
                  <input style={{ ...inputStyle, textAlign: 'center', fontSize: 18 } as any} placeholder="🌱" value={potensiForm.emoji} onChange={e => setPotensiForm(f => ({ ...f, emoji: e.target.value }))} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Judul Potensi</label>
                  <input style={inputStyle as any} placeholder="cth: Wisata Alam" value={potensiForm.judul} onChange={e => setPotensiForm(f => ({ ...f, judul: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Deskripsi</label>
                <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical' } as any} placeholder="Penjelasan singkat potensi desa" value={potensiForm.deskripsi} onChange={e => setPotensiForm(f => ({ ...f, deskripsi: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
              <button style={{ ...btnSecondary, padding: '9px 20px' } as any} onClick={() => setShowPotensiForm(false)}>Batal</button>
              <button style={btnPrimary as any} onClick={savePotensi}>{editPotensi ? 'Simpan Perubahan' : 'Tambah Potensi'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Form Galeri ── */}
      {showGaleriForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={e => { if (e.target === e.currentTarget) setShowGaleriForm(false) }}>
          <div style={{ background: CARD, borderRadius: 18, padding: 32, width: '100%', maxWidth: 500 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 20 }}>{editGaleri ? 'Edit Foto' : 'Tambah Foto Kegiatan'}</h2>
            <div style={{ display: 'grid', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Judul foto</label>
                <input style={inputStyle as any} value={gForm.judul} onChange={e => setGForm(f => ({ ...f, judul: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Unggah gambar (maksimal 500 KB)</label>
                <input type="file" accept="image/*" onChange={e => uploadGaleriImage(e.target.files?.[0])} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Atau URL gambar</label>
                <input style={inputStyle as any} type="url" placeholder="https://..." value={gForm.image} onChange={e => setGForm(f => ({ ...f, image: e.target.value }))} />
              </div>
              {gForm.image && <img src={gForm.image} alt="Pratinjau" style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 10 }} />}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
              <button style={btnSecondary as any} onClick={() => setShowGaleriForm(false)}>Batal</button>
              <button style={btnPrimary as any} onClick={saveGaleri}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Form Berita ── */}
      {showBeritaForm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)', zIndex: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }} onClick={e => { if (e.target === e.currentTarget) setShowBeritaForm(false) }}>
          <div style={{ background: CARD, borderRadius: 18, padding: 32, width: '100%', maxWidth: 500, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 20, color: TEXT }}>
              {editBerita ? 'Edit Berita' : 'Tambah Berita Baru'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Judul Berita</label>
                <input style={inputStyle as any} placeholder="Masukkan judul berita" value={bForm.judul} onChange={e => setBForm(f => ({ ...f, judul: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Ringkasan</label>
                <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' } as any} placeholder="Ringkasan singkat berita" value={bForm.ringkasan} onChange={e => setBForm(f => ({ ...f, ringkasan: e.target.value }))} />
              </div>
              <div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Kategori</label>
                  <select style={inputStyle as any} value={bForm.kategori} onChange={e => setBForm(f => ({ ...f, kategori: e.target.value }))}>
                    {['Pembangunan', 'Budaya', 'Kesehatan', 'Pendidikan', 'Umum'].map(k => <option key={k}>{k}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
              <button style={{ ...btnSecondary, padding: '9px 20px' } as any} onClick={() => setShowBeritaForm(false)}>Batal</button>
              <button style={btnPrimary as any} onClick={saveBerita}>{editBerita ? 'Simpan Perubahan' : 'Tambah Berita'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Form Pengumuman ── */}
      {showPengumumanForm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)', zIndex: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }} onClick={e => { if (e.target === e.currentTarget) setShowPengumumanForm(false) }}>
          <div style={{ background: CARD, borderRadius: 18, padding: 32, width: '100%', maxWidth: 500, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 20, color: TEXT }}>
              {editPengumuman ? 'Edit Pengumuman' : 'Tambah Pengumuman Baru'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Judul</label>
                <input style={inputStyle as any} placeholder="Judul pengumuman" value={pForm.judul} onChange={e => setPForm(f => ({ ...f, judul: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Isi Pengumuman</label>
                <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical' } as any} placeholder="Detail isi pengumuman" value={pForm.isi} onChange={e => setPForm(f => ({ ...f, isi: e.target.value }))} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Pengirim</label>
                  <input style={inputStyle as any} placeholder="cth: Pemerintah Desa" value={pForm.pengirim} onChange={e => setPForm(f => ({ ...f, pengirim: e.target.value }))} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Status</label>
                  <select style={inputStyle as any} value={pForm.status} onChange={e => setPForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="aktif">Aktif</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
              <button style={{ ...btnSecondary, padding: '9px 20px' } as any} onClick={() => setShowPengumumanForm(false)}>Batal</button>
              <button style={btnPrimary as any} onClick={savePengumuman}>{editPengumuman ? 'Simpan Perubahan' : 'Tambah Pengumuman'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Form Statistik ── */}
      {showStatForm && editStat && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)', zIndex: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }} onClick={e => { if (e.target === e.currentTarget) setShowStatForm(false) }}>
          <div style={{ background: CARD, borderRadius: 18, padding: 32, width: '100%', maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 20, color: TEXT }}>
              Edit {editStat.label}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Label</label>
                <input style={inputStyle as any} value={sForm.label} onChange={e => setSForm(f => ({ ...f, label: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: TEXT }}>Nilai</label>
                <input style={inputStyle as any} value={sForm.nilai} onChange={e => setSForm(f => ({ ...f, nilai: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
              <button style={{ ...btnSecondary, padding: '9px 20px' } as any} onClick={() => setShowStatForm(false)}>Batal</button>
              <button style={btnPrimary as any} onClick={saveStat}>Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
