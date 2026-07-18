import type {
  Berita,
  Pengumuman,
  LayananSurat,
  Perangkat,
  PotensiDesa,
  GaleriItem,
  StatDesa,
} from '@/types'

// ── Statistik Desa ──────────────────────────────────────────
export const STAT_DESA: StatDesa[] = [
  { id: 1, label: 'Total Penduduk', nilai: '3.842' },
  { id: 2, label: 'Kepala Keluarga', nilai: '1.024' },
  { id: 3, label: 'RT / RW', nilai: '8' },
  { id: 4, label: 'Dusun', nilai: '2' },
]
// ── Berita ───────────────────────────────────────────────────
export const BERITA: Berita[] = [
  {
    id: 1,
    judul: 'Pembangunan Jalan Dusun Kidul Tahap II Telah Selesai',
    ringkasan:
      'Pelebaran jalan sepanjang 1,2 km kini dapat digunakan oleh warga untuk aktivitas sehari-hari.',
    isi: '',
    kategori: 'Pembangunan',
    tanggal: '15 November 2024',
    emoji: '🏗️',
    bgColor: '#E8F5E9',
  },
  {
    id: 2,
    judul: 'Festival Panen Raya Desa Rejosari 2026 Berlangsung Meriah',
    ringkasan:
      'Ratusan warga hadir memeriahkan tradisi syukuran panen yang telah ada sejak turun-temurun.',
    isi: '',
    kategori: 'Budaya',
    tanggal: '3 November 2024',
    emoji: '🎉',
    bgColor: '#FFF8E1',
  },
  {
    id: 3,
    judul: 'Posyandu Bulan Oktober: 98% Balita Hadir Imunisasi',
    ringkasan:
      'Program imunisasi berjalan sukses dengan capaian tertinggi sepanjang tahun 2024 ini.',
    isi: '',
    kategori: 'Kesehatan',
    tanggal: '28 Oktober 2026',
    emoji: '💊',
    bgColor: '#E3F2FD',
  },
]

// ── Pengumuman ───────────────────────────────────────────────
export const PENGUMUMAN: Pengumuman[] = [
  {
    id: 1,
    judul: 'Jadwal Pembagian BLT Dana Desa Tahap IV Tahun 2025',
    isi: 'Pembagian BLT dilaksanakan pada Kamis, 23 November 2025 di Balai Desa mulai pukul 08.00 WIB. Harap membawa KTP asli.',
    tanggal: '2025-11-20',
    pengirim: 'Pemerintah Desa',
    status: 'aktif',
  },
  {
    id: 2,
    judul: 'Musyawarah Desa (Musdes) Penyusunan RKPDes 2025',
    isi: 'Mengundang seluruh perangkat desa, BPD, tokoh masyarakat, dan perwakilan warga, tanggal 25 November 2024 pukul 09.00 WIB.',
    tanggal: '2024-11-15',
    pengirim: 'Sekretariat Desa',
    status: 'aktif',
  },
  {
    id: 3,
    judul: 'Pelayanan KTP Elektronik Keliling — Jadwal November 2024',
    isi: 'Perekaman e-KTP setiap hari Selasa di Balai Desa pukul 09.00–12.00 WIB bagi yang belum memiliki KTP elektronik.',
    tanggal: '2024-11-01',
    pengirim: 'Kaur Pemerintahan',
    status: 'aktif',
  },
  {
    id: 4,
    judul: 'Pembukaan Pendaftaran Program Beasiswa Desa 2024',
    isi: 'Desa membuka beasiswa bagi pelajar berprestasi dari keluarga kurang mampu. Pendaftaran ditutup 31 Oktober 2024.',
    tanggal: '2024-10-10',
    pengirim: 'Kasi Kesejahteraan',
    status: 'selesai',
  },
]

// ── Layanan Surat ────────────────────────────────────────────
export const LAYANAN_SURAT: LayananSurat[] = [
  { id: 1, nama: 'Surat Keterangan Domisili',  deskripsi: 'Keterangan tempat tinggal resmi untuk keperluan administrasi kependudukan.', emoji: '🏠', estimasi: 'Proses 1–2 Hari' },
  { id: 2, nama: 'Surat Keterangan Usaha',     deskripsi: 'Dokumen resmi penunjang izin usaha mikro dan kecil di lingkungan desa.',       emoji: '🏪', estimasi: 'Proses 1–2 Hari' },
  { id: 3, nama: 'Surat Pengantar KTP',        deskripsi: 'Pengantar untuk pembuatan atau perpanjangan Kartu Tanda Penduduk.',             emoji: '🪪', estimasi: 'Proses 1 Hari'   },
  { id: 4, nama: 'Surat Pengantar KK',         deskripsi: 'Pengantar untuk pembuatan atau perubahan Kartu Keluarga.',                      emoji: '👨‍👩‍👧‍👦', estimasi: 'Proses 1 Hari'   },
  { id: 5, nama: 'Surat Keterangan Kematian',  deskripsi: 'Keterangan resmi sebagai syarat akta kematian dan keperluan ahli waris.',       emoji: '📋', estimasi: 'Proses 1 Hari'   },
  { id: 6, nama: 'Surat Pengantar SKCK',       deskripsi: 'Pengantar dari desa untuk keperluan pembuatan SKCK di kepolisian.',             emoji: '🔒', estimasi: 'Proses 1 Hari'   },
]

// ── Perangkat Desa ───────────────────────────────────────────
export const PERANGKAT: Perangkat[] = [
  { id: 1, nama: 'Budi Hartono, S.Sos', jabatan: 'Kepala Desa',        inisial: 'BH', warnaBg: '#1D6A3A' },
  { id: 2, nama: 'Sari Rahayu',         jabatan: 'Sekretaris Desa',    inisial: 'SR', warnaBg: '#2E8B57' },
  { id: 3, nama: 'Dwi Wibowo',          jabatan: 'Kaur Keuangan',      inisial: 'DW', warnaBg: '#E8B84B', warnaText: '#5C3D1E' },
  { id: 4, nama: 'Ani Nurlaila',        jabatan: 'Kaur Pemerintahan',  inisial: 'AN', warnaBg: '#5C3D1E' },
  { id: 5, nama: 'Rudi Hermawan',       jabatan: 'Kasi Pelayanan',     inisial: 'RH', warnaBg: '#2E8B57' },
  { id: 6, nama: 'Yuni Sulistyowati',  jabatan: 'Staf Administrasi',  inisial: 'YS', warnaBg: '#888888' },
]

// ── Potensi Desa ─────────────────────────────────────────────
export const POTENSI: PotensiDesa[] = [
  { id: 1, judul: 'Wisata Alam',     deskripsi: 'Curug Rejosari dan Bukit Hijau menjadi destinasi favorit wisatawan alam yang tumbuh pesat.',           emoji: '🏔️' },
  { id: 2, judul: 'Pertanian',       deskripsi: 'Hamparan sawah dan kebun pisang organik menjadi produk unggulan petani lokal yang diekspor.',           emoji: '🌾' },
  { id: 3, judul: 'Kerajinan & UMKM',deskripsi: 'Anyaman bambu dan batik tulis khas desa telah menembus pasar nasional dengan kualitas terjamin.',       emoji: '🏺' },
  { id: 4, judul: 'Budaya Desa',     deskripsi: 'Kesenian karawitan dan tradisi bersih desa terus dilestarikan oleh generasi muda setempat.',             emoji: '🎭' },
]

// ── Galeri ───────────────────────────────────────────────────
export const GALERI: GaleriItem[] = [
  { id: 1, judul: 'Festival Panen Raya 2024', emoji: '🌾', bgColor: '#E8F5E9', span: 'wide' },
  { id: 2, judul: 'Gotong Royong',            emoji: '🏗️', bgColor: '#E3F2FD' },
  { id: 3, judul: 'Kesenian Desa',            emoji: '🎎', bgColor: '#FFF8E1' },
  { id: 4, judul: 'Posyandu Balita',          emoji: '👶', bgColor: '#F3E5F5' },
  { id: 5, judul: 'Wisata Alam',              emoji: '🌿', bgColor: '#E8F5E9' },
  { id: 6, judul: 'UMKM Kerajinan',           emoji: '🏺', bgColor: '#FBE9E7' },
]
