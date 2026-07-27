import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// PUT edit pengumuman
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await req.json()
    const { judul, isi, pengirim, status } = body

    const pengumuman = await prisma.pengumuman.update({
      where: { id },
      data: {
        judul,
        isi,
        pengirim,
        status,
      },
    })

    return NextResponse.json(pengumuman)
  } catch (error: any) {
    console.error('PUT /api/pengumuman/[id] error:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Pengumuman tidak ditemukan' }, { status: 404 })
    }
    return NextResponse.json(
      { error: 'Failed to update pengumuman' },
      { status: 500 }
    )
  }
}

// DELETE pengumuman
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    await prisma.pengumuman.delete({
      where: { id },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('DELETE /api/pengumuman/[id] error:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Pengumuman tidak ditemukan' }, { status: 404 })
    }
    return NextResponse.json(
      { error: 'Failed to delete pengumuman' },
      { status: 500 }
    )
  }
}
