import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
    }

    const body = await req.json()
    const { judul, deskripsi, emoji } = body

    if (!judul?.trim() || !deskripsi?.trim()) {
      return NextResponse.json(
        { error: 'Judul dan deskripsi wajib diisi' },
        { status: 400 }
      )
    }

    const updated = await prisma.potensiDesa.update({
      where: { id },
      data: {
        judul: judul.trim(),
        deskripsi: deskripsi.trim(),
        emoji: emoji?.trim() || '🌟',
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error(`PUT /api/potensi/${params.id} error:`, error)
    return NextResponse.json(
      { error: 'Gagal mengedit potensi desa' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
    }

    await prisma.potensiDesa.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`DELETE /api/potensi/${params.id} error:`, error)
    return NextResponse.json(
      { error: 'Gagal menghapus potensi desa' },
      { status: 500 }
    )
  }
}
