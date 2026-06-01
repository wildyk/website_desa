import Potensi from '@/components/sections/Potensi'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Potensi Desa — Desa Rejosari',
  description: 'Potensi wisata, pertanian, UMKM, dan budaya Desa Rejosari yang terus berkembang.',
  openGraph: {
    title: 'Potensi Desa Rejosari',
    description: 'Wisata, pertanian, UMKM, dan budaya unggulan Desa Rejosari.',
    type: 'website',
  },
}

export default function PotensiPage() {
  return <main style={{ paddingTop: '80px' }}><Potensi /></main>
}
