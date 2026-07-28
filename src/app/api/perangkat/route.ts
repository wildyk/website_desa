import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// GET all perangkat desa
export async function GET() {
  try {
    const perangkat = await prisma.perangkatDesa.findMany({
      orderBy: { urutan: 'asc' },
    })
    return NextResponse.json(perangkat)
  } catch (error) {
    console.error('GET /api/perangkat error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch perangkat desa' },
      { status: 500 }
    )
  }
}

// POST new perangkat desa
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nama, jabatan, foto, inisial, warnaBg, urutan } = body

    if (!nama?.trim() || !jabatan?.trim()) {
      return NextResponse.json(
        { error: 'Nama dan jabatan wajib diisi' },
        { status: 400 }
      )
    }

    const calcInisial = inisial?.trim() || nama.trim().split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

    const perangkat = await prisma.perangkatDesa.create({
      data: {
        nama: nama.trim(),
        jabatan: jabatan.trim(),
        foto: foto || null,
        inisial: calcInisial,
        warnaBg: warnaBg || '#1D6A3A',
        urutan: typeof urutan === 'number' ? urutan : 0,
      },
    })

    return NextResponse.json(perangkat, { status: 201 })
  } catch (error) {
    console.error('POST /api/perangkat error:', error)
    return NextResponse.json(
      { error: 'Failed to create perangkat desa' },
      { status: 500 }
    )
  }
}
