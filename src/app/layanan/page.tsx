import Layanan from '@/components/sections/Layanan'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Layanan Online — Desa Rejosari',
  description: 'Ajukan surat keterangan dan layanan administrasi desa secara online tanpa antri.',
  openGraph: {
    title: 'Layanan Administrasi Online Desa Rejosari',
    description: 'Urus surat keterangan dari mana saja, tanpa perlu antri di kantor desa.',
    type: 'website',
  },
}

export default function LayananPage() {
  return <main style={{ paddingTop: '80px' }}><Layanan /></main>
}