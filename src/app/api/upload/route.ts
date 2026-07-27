import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file')
  if (!(file instanceof File) || !file.type.startsWith('image/')) return NextResponse.json({ error: 'Pilih file gambar yang valid.' }, { status: 400 })
  if (file.size > 500 * 1024) return NextResponse.json({ error: 'Ukuran gambar maksimal 500 KB.' }, { status: 400 })

  const extension = file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'jpg'
  const filename = `${randomUUID()}.${extension}`
  const directory = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(directory, { recursive: true })
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()))
  return NextResponse.json({ url: `/uploads/${filename}` })
}
