import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const profil = await prisma.profilDesa.findFirst({ orderBy: { id: 'asc' } })
  return NextResponse.json(profil)
}

export async function PUT(request: NextRequest) {
  const { captionUtama, subcaption } = await request.json()
  if (!captionUtama?.trim() || !subcaption?.trim()) {
    return NextResponse.json({ error: 'Caption utama dan subcaption wajib diisi.' }, { status: 400 })
  }

  const existing = await prisma.profilDesa.findFirst({ orderBy: { id: 'asc' } })
  const profil = existing
    ? await prisma.profilDesa.update({ where: { id: existing.id }, data: { captionUtama, subcaption } })
    : await prisma.profilDesa.create({ data: { nama: 'Desa Rejosari', kepala: '', captionUtama, subcaption } })

  return NextResponse.json(profil)
}
