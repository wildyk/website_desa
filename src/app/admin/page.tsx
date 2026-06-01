import type { Metadata } from 'next'
import AdminDashboard from '@/components/admin/AdminDashboard'

export const metadata: Metadata = {
  title: 'Dashboard Admin — Desa Sukamaju',
  description: 'Halaman admin untuk mengelola konten website Desa Sukamaju.',
  robots: 'noindex, nofollow', // Sembunyikan dari search engine
}

export default function AdminPage() {
  return <AdminDashboard />
}
