import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import PageLoader from '@/components/ui/PageLoader'
import AdminModal from '@/components/ui/AdminModal'

export const metadata: Metadata = {
  title: 'Desa Rejosari — Website Resmi Desa',
  description:
    'Portal digital resmi Desa Rejosari untuk layanan administrasi, informasi, dan potensi desa.',
  keywords: [
    'desa Rejosari',
    'website desa',
    'administrasi desa',
    'layanan desa',
    'potensi desa'
  ],

  verification: {
    google: '43OcDx5nKidiEumN5oHxg-OxB74pAflE6VQV8JGRHbA',
  },

  openGraph: {
    title: 'Desa Rejosari',
    description:
      'Portal resmi Desa Rejosari — Maju, Sejahtera & Bermartabat',
    type: 'website',
    url: 'https://desarejosari.vercel.app',
    siteName: 'Website Desa Rejosari',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AdminModal />
        <PageLoader />
        <Navbar />
        <ScrollReveal />
        {children}
        <Footer />
      </body>
    </html>
  )
}