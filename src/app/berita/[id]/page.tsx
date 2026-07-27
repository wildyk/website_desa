import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function DetailBeritaPage({ params }: { params: { id: string } }) {
  const berita = await prisma.berita.findUnique({ where: { id: Number(params.id) } })
  if (!berita) notFound()

  return <main style={{ padding: '120px 5% 80px', background: '#F0FAF4', minHeight: '100vh' }}>
    <article style={{ maxWidth: 860, margin: '0 auto', background: '#fff', borderRadius: 22, overflow: 'hidden', border: '1px solid #E8EDE9' }}>
      <div style={{ height: 260, background: berita.bgColor, display: 'grid', placeItems: 'center', fontSize: 80 }}>{berita.emoji}</div>
      <div style={{ padding: '36px clamp(22px, 5vw, 56px)' }}>
        <Link href="/berita" style={{ color: '#1D6A3A', textDecoration: 'none', fontSize: 14 }}>← Kembali ke Berita</Link>
        <div style={{ marginTop: 24, marginBottom: 14, color: '#1D6A3A', fontSize: 13, fontWeight: 600 }}>{berita.kategori.toUpperCase()} · {berita.tanggal}</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 5vw, 48px)', lineHeight: 1.2, marginBottom: 22 }}>{berita.judul}</h1>
        <p style={{ color: '#4A5E4F', fontSize: 18, lineHeight: 1.8, marginBottom: 22 }}>{berita.ringkasan}</p>
        {berita.isi && <p style={{ color: '#4A5E4F', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{berita.isi}</p>}
      </div>
    </article>
  </main>
}
