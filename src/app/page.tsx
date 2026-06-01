import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import Hero          from '@/components/sections/Hero'
import Berita        from '@/components/sections/Berita'
import ScrollReveal  from '@/components/ui/ScrollReveal'
import Toast         from '@/components/ui/Toast'
import AdminModal    from '@/components/ui/AdminModal'

export default function Home() {
  return (
    <>
      {/* Layout */}
      <Navbar />

      <main>
        <Hero />
        <Berita />
      </main>


      {/* Global UI */}
      <ScrollReveal />
      <Toast />
      <AdminModal />
    </>
  )
}
