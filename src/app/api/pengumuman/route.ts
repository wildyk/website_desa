import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// GET all pengumuman
export async function GET() {
  try {
    const pengumuman = await prisma.pengumuman.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(pengumuman)
  } catch (error) {
    console.error('GET /api/pengumuman error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pengumuman' },
      { status: 500 }
    )
  }
}

// POST new pengumuman
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { judul, isi, pengirim, status, tanggal } = body

    if (!judul || !isi) {
      return NextResponse.json(
        { error: 'judul dan isi diperlukan' },
        { status: 400 }
      )
    }

    const pengumuman = await prisma.pengumuman.create({
      data: {
        judul,
        isi,
        pengirim: pengirim || '',
        status: status || 'aktif',
        tanggal: tanggal || new Date().toISOString().split('T')[0],
      },
    })

    return NextResponse.json(pengumuman, { status: 201 })
  } catch (error) {
    console.error('POST /api/pengumuman error:', error)
    return NextResponse.json(
      { error: 'Failed to create pengumuman' },
      { status: 500 }
    )
  }
}
