// ============================================================
// TYPES — Desa Sukamaju
// ============================================================

export interface Berita {
  id: number
  judul: string
  ringkasan: string
  isi: string
  kategori: 'Pembangunan' | 'Budaya' | 'Kesehatan' | 'Pendidikan' | 'Umum'
  tanggal: string
  emoji: string
  bgColor: string
}

export interface Pengumuman {
  id: number
  judul: string
  isi: string
  tanggal: string   // "YYYY-MM-DD"
  pengirim: string
  status: 'aktif' | 'selesai'
}

export interface LayananSurat {
  id: number
  nama: string
  deskripsi: string
  emoji: string
  estimasi: string
}

export interface Perangkat {
  id: number
  nama: string
  jabatan: string
  inisial: string
  warnaBg: string
  warnaText?: string
}

export interface PotensiDesa {
  id: number
  judul: string
  deskripsi: string
  emoji: string
}

export interface GaleriItem {
  id: number
  judul: string
  emoji: string
  bgColor: string
  span?: 'normal' | 'wide'
}

export interface StatDesa {
  id: number
  label: string
  nilai: string
}

export interface FormLayanan {
  namaLengkap: string
  noHp: string
  jenisSurat: string
  keperluan: string
}

export interface AdminLoginForm {
  username: string
  password: string
}
