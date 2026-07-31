import Profil from '@/components/sections/Profil'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profil Dusun — Dusun Rejosari',
  description: 'Mengenal Dusun Rejosari: sejarah, visi misi, struktur organisasi, dan perangkat dusun.',
  openGraph: {
    title: 'Profil Dusun Rejosari',
    description: 'Sejarah, visi misi, dan perangkat Dusun Rejosari.',
    type: 'website',
  },
}

export default function ProfilPage() {
  return <main style={{ paddingTop: '80px' }}><Profil /></main>
}