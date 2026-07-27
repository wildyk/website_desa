import Hero          from '@/components/sections/Hero'
import Berita        from '@/components/sections/Berita'
import Galeri        from '@/components/sections/Galeri'
import Pengumuman    from '@/components/sections/Pengumuman'
import Potensi       from '@/components/sections/Potensi'
import Profil        from '@/components/sections/Profil'
import Kontak        from '@/components/sections/Kontak'
import Toast         from '@/components/ui/Toast'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Profil />
        <Berita />
        <Pengumuman />
        <Potensi />
        <Galeri />
        <Kontak />
      </main>

      <Toast />
    </>
  )
}
