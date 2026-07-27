import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const categoryAppearance: Record<string, { emoji: string; bgColor: string }> = {
  Pembangunan: { emoji: '🏗️', bgColor: '#E8F5E9' },
  Budaya: { emoji: '🎭', bgColor: '#FFF8E1' },
  Kesehatan: { emoji: '💊', bgColor: '#E3F2FD' },
  Pendidikan: { emoji: '📚', bgColor: '#F3E8FF' },
  Umum: { emoji: '📰', bgColor: '#E8EDE9' },
}

// GET all berita
export async function GET() {
  try {
    const berita = await prisma.berita.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(berita)
  } catch (error) {
    console.error('GET /api/berita error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch berita' },
      { status: 500 }
    )
  }
}

// POST new berita
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { judul, ringkasan, isi, kategori, tanggal } = body
    const appearance = categoryAppearance[kategori] ?? categoryAppearance.Umum

    if (!judul || !ringkasan) {
      return NextResponse.json(
        { error: 'judul dan ringkasan diperlukan' },
        { status: 400 }
      )
    }

    const berita = await prisma.berita.create({
      data: {
        judul,
        ringkasan,
        isi: isi || '',
        kategori: kategori || 'Umum',
        emoji: appearance.emoji,
        bgColor: appearance.bgColor,
        tanggal: tanggal || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      },
    })

    return NextResponse.json(berita, { status: 201 })
  } catch (error) {
    console.error('POST /api/berita error:', error)
    return NextResponse.json(
      { error: 'Failed to create berita' },
      { status: 500 }
    )
  }
}
