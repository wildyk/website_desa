import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const categoryAppearance: Record<string, { emoji: string; bgColor: string }> = {
  Pembangunan: { emoji: '🏗️', bgColor: '#E8F5E9' }, Budaya: { emoji: '🎭', bgColor: '#FFF8E1' },
  Kesehatan: { emoji: '💊', bgColor: '#E3F2FD' }, Pendidikan: { emoji: '📚', bgColor: '#F3E8FF' },
  Umum: { emoji: '📰', bgColor: '#E8EDE9' },
}
// PUT edit berita
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await req.json()
    const { judul, ringkasan, isi, kategori } = body
    const appearance = categoryAppearance[kategori] ?? categoryAppearance.Umum

    const berita = await prisma.berita.update({
      where: { id },
      data: {
        judul,
        ringkasan,
        isi,
        kategori,
        emoji: appearance.emoji,
        bgColor: appearance.bgColor,
      },
    })

    return NextResponse.json(berita)
  } catch (error: any) {
    console.error('PUT /api/berita/[id] error:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Berita tidak ditemukan' }, { status: 404 })
    }
    return NextResponse.json(
      { error: 'Failed to update berita' },
      { status: 500 }
    )
  }
}

// DELETE berita
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    await prisma.berita.delete({
      where: { id },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('DELETE /api/berita/[id] error:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Berita tidak ditemukan' }, { status: 404 })
    }
    return NextResponse.json(
      { error: 'Failed to delete berita' },
      { status: 500 }
    )
  }
}
