import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const DEFAULT_POTENSI = [
  { judul: 'Wisata Alam', deskripsi: 'Curug Rejosari dan Bukit Hijau menjadi destinasi favorit wisatawan alam yang tumbuh pesat.', emoji: '🏔️' },
  { judul: 'Pertanian', deskripsi: 'Hamparan sawah dan kebun pisang organik menjadi produk unggulan petani lokal yang diekspor.', emoji: '🌾' },
  { judul: 'Kerajinan & UMKM', deskripsi: 'Anyaman bambu dan batik tulis khas desa telah menembus pasar nasional dengan kualitas terjamin.', emoji: '🏺' },
  { judul: 'Budaya Desa', deskripsi: 'Kesenian karawitan dan tradisi bersih desa terus dilestarikan oleh generasi muda setempat.', emoji: '🎭' },
]

export async function GET() {
  try {
    let data = await prisma.potensiDesa.findMany({
      orderBy: { createdAt: 'asc' },
    })

    // Seed data default jika belum ada data di DB
    if (data.length === 0) {
      await prisma.potensiDesa.createMany({
        data: DEFAULT_POTENSI,
      })
      data = await prisma.potensiDesa.findMany({
        orderBy: { createdAt: 'asc' },
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('GET /api/potensi error:', error)
    return NextResponse.json(DEFAULT_POTENSI)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { judul, deskripsi, emoji } = body

    if (!judul?.trim() || !deskripsi?.trim()) {
      return NextResponse.json(
        { error: 'Judul dan deskripsi wajib diisi' },
        { status: 400 }
      )
    }

    const item = await prisma.potensiDesa.create({
      data: {
        judul: judul.trim(),
        deskripsi: deskripsi.trim(),
        emoji: emoji?.trim() || '🌟',
      },
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('POST /api/potensi error:', error)
    return NextResponse.json(
      { error: 'Gagal menambahkan potensi desa' },
      { status: 500 }
    )
  }
}
