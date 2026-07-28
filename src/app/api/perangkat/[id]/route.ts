import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// PUT edit perangkat desa
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await req.json()
    const { nama, jabatan, foto, inisial, warnaBg, urutan } = body

    const calcInisial = inisial?.trim() || (nama ? nama.trim().split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : undefined)

    const perangkat = await prisma.perangkatDesa.update({
      where: { id },
      data: {
        ...(nama && { nama: nama.trim() }),
        ...(jabatan && { jabatan: jabatan.trim() }),
        foto: foto ?? null,
        ...(calcInisial && { inisial: calcInisial }),
        ...(warnaBg && { warnaBg }),
        ...(typeof urutan === 'number' && { urutan }),
      },
    })

    return NextResponse.json(perangkat)
  } catch (error: any) {
    console.error('PUT /api/perangkat/[id] error:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Perangkat desa tidak ditemukan' }, { status: 404 })
    }
    return NextResponse.json(
      { error: 'Failed to update perangkat desa' },
      { status: 500 }
    )
  }
}

// DELETE perangkat desa
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    await prisma.perangkatDesa.delete({
      where: { id },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('DELETE /api/perangkat/[id] error:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Perangkat desa tidak ditemukan' }, { status: 404 })
    }
    return NextResponse.json(
      { error: 'Failed to delete perangkat desa' },
      { status: 500 }
    )
  }
}
