import Galeri from '@/components/sections/Galeri'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galeri — Desa Rejosari',
  description: 'Dokumentasi foto dan video kegiatan masyarakat Desa Rejosari.',
  openGraph: {
    title: 'Galeri Desa Rejosari',
    description: 'Foto dan dokumentasi kegiatan Desa Rejosari.',
    type: 'website',
  },
}

export default function GaleriPage() {
  return <main style={{ paddingTop: '80px' }}><Galeri /></main>
}