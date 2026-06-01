import Berita from '@/components/sections/Berita'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Berita Desa — Desa Rejosari',
  description: 'Informasi dan kabar terkini seputar kegiatan, pembangunan, dan kehidupan masyarakat Desa Rejosari.',
  openGraph: {
    title: 'Berita Desa Rejosari',
    description: 'Informasi dan kabar terkini Desa Rejosari.',
    type: 'website',
  },
}

export default function BeritaPage() {
  return <main style={{ paddingTop: '80px' }}><Berita /></main>
}