import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(await prisma.galeri.findMany({ orderBy: { createdAt: 'desc' } }))
}

export async function POST(request: NextRequest) {
  const { judul, image } = await request.json()
  if (!judul?.trim() || !image?.trim()) return NextResponse.json({ error: 'Judul dan URL gambar wajib diisi.' }, { status: 400 })
  return NextResponse.json(await prisma.galeri.create({ data: { judul, image } }), { status: 201 })
}
