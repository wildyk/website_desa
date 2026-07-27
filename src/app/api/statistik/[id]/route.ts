import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// PUT edit statistik
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await req.json()
    const { label, nilai } = body

    const statistik = await prisma.statistikDesa.update({
      where: { id },
      data: {
        label,
        nilai,
      },
    })

    return NextResponse.json(statistik)
  } catch (error: any) {
    console.error('PUT /api/statistik/[id] error:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Statistik tidak ditemukan' }, { status: 404 })
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Label sudah ada' }, { status: 400 })
    }
    return NextResponse.json(
      { error: 'Failed to update statistik' },
      { status: 500 }
    )
  }
}

// DELETE statistik
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    await prisma.statistikDesa.delete({
      where: { id },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('DELETE /api/statistik/[id] error:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Statistik tidak ditemukan' }, { status: 404 })
    }
    return NextResponse.json(
      { error: 'Failed to delete statistik' },
      { status: 500 }
    )
  }
}
