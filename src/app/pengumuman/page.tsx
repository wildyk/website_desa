import Pengumuman from '@/components/sections/Pengumuman'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pengumuman — Desa Rejosari',
  description: 'Pengumuman resmi dari Pemerintah Desa Rejosari untuk masyarakat.',
  openGraph: {
    title: 'Pengumuman Desa Rejosari',
    description: 'Informasi pengumuman terbaru dari Desa Rejosari.',
    type: 'website',
  },
}

export default function PengumumanPage() {
  return <main style={{ paddingTop: '80px' }}><Pengumuman /></main>
}