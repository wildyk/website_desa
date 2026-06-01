import Kontak from '@/components/sections/Kontak'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontak — Desa Rejosari',
  description: 'Hubungi Pemerintah Desa Rejosari melalui telepon, email, atau kunjungi kantor desa.',
  openGraph: {
    title: 'Kontak Desa Rejosari',
    description: 'Alamat, nomor telepon, dan email Kantor Desa Rejosari.',
    type: 'website',
  },
}

export default function KontakPage() {
  return <main style={{ paddingTop: '80px' }}><Kontak /></main>
}