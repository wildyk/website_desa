import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { judul, image } = await request.json()
  return NextResponse.json(await prisma.galeri.update({ where: { id: Number(params.id) }, data: { judul, image } }))
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  await prisma.galeri.delete({ where: { id: Number(params.id) } })
  return NextResponse.json({ success: true })
}
