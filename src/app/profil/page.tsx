import Profil from '@/components/sections/Profil'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profil Desa — Desa Rejosari',
  description: 'Mengenal Desa Rejosari: sejarah, visi misi, struktur organisasi, dan perangkat desa.',
  openGraph: {
    title: 'Profil Desa Rejosari',
    description: 'Sejarah, visi misi, dan perangkat Desa Rejosari.',
    type: 'website',
  },
}

export default function ProfilPage() {
  return <main style={{ paddingTop: '80px' }}><Profil /></main>
}