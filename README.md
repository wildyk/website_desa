# 🌿 Desa Sukamaju — Website Resmi Desa

Website digital resmi Desa Sukamaju yang dibangun dengan **Next.js 14**, **TypeScript**, dan **Tailwind CSS**.

---

## 🚀 Cara Menjalankan

### 1. Clone / Download Project

```bash
git clone https://github.com/username/desa-sukamaju.git
cd desa-sukamaju
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

```bash
cp .env.example .env.local
# Edit .env.local sesuai kebutuhan
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📁 Struktur Project

```
desa-sukamaju/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (font, metadata)
│   │   └── page.tsx            # Halaman utama (assembles semua section)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Navigasi atas (fixed, scroll-aware)
│   │   │   └── Footer.tsx      # Footer dengan link navigasi
│   │   │
│   │   ├── sections/           # Setiap section = 1 file
│   │   │   ├── Hero.tsx        # Banner hero + statistik desa
│   │   │   ├── Berita.tsx      # Kartu berita terbaru
│   │   │   ├── Layanan.tsx     # Layanan administrasi + form
│   │   │   ├── Potensi.tsx     # Potensi wisata, pertanian, UMKM
│   │   │   ├── Galeri.tsx      # Grid foto kegiatan desa
│   │   │   ├── Profil.tsx      # Profil, visi-misi, perangkat desa
│   │   │   ├── Pengumuman.tsx  # Daftar pengumuman resmi
│   │   │   └── Kontak.tsx      # Kontak & peta lokasi
│   │   │
│   │   └── ui/                 # Komponen UI yang dapat dipakai ulang
│   │       ├── AdminModal.tsx  # Popup login admin
│   │       ├── Toast.tsx       # Notifikasi feedback
│   │       ├── ScrollReveal.tsx # Animasi scroll
│   │       └── SectionHeader.tsx # Header section standar
│   │
│   ├── lib/
│   │   ├── data.ts             # Semua data/konten desa (ganti di sini!)
│   │   └── utils.ts            # Helper functions (format tanggal, dll)
│   │
│   ├── styles/
│   │   └── globals.css         # CSS global + animasi
│   │
│   └── types/
│       └── index.ts            # TypeScript interfaces & types
│
├── public/                     # Aset statis (logo, gambar, favicon)
├── .env.example                # Contoh env variables
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ✏️ Cara Mengganti Konten Desa

Semua data desa berada di **`src/lib/data.ts`**. Cukup edit file ini:

| Data | Variabel |
|------|----------|
| Statistik desa | `STAT_DESA` |
| Berita | `BERITA` |
| Pengumuman | `PENGUMUMAN` |
| Layanan surat | `LAYANAN_SURAT` |
| Perangkat desa | `PERANGKAT` |
| Potensi desa | `POTENSI` |
| Galeri | `GALERI` |

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Font | Playfair Display + Plus Jakarta Sans |
| Database | Neon PostgreSQL (opsional) |
| Deployment | Vercel (rekomendasi) |

---

## 📦 Deploy ke Vercel

```bash
npm run build   # Pastikan build berhasil
```

Kemudian push ke GitHub dan connect ke [vercel.com](https://vercel.com).

---

## 🔮 Pengembangan Selanjutnya

- [ ] Dashboard Admin (CRUD berita, pengumuman, layanan)
- [ ] Integrasi Database (Neon PostgreSQL + Prisma)
- [ ] Autentikasi Admin (NextAuth.js)
- [ ] Sistem Pengaduan Masyarakat
- [ ] Notifikasi WhatsApp (Fonnte / WA Cloud API)
- [ ] Upload Foto Galeri (Cloudinary)
- [ ] Halaman detail berita dinamis

---

> Dibangun dengan ❤️ untuk kemajuan desa Indonesia.
