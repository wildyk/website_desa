import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const DEFAULT_USERNAME = 'edirejosari'
const DEFAULT_PASSWORD = 'desa2024'

async function ensureDefaultAdmin() {
  try {
    let admin = await prisma.adminUser.findFirst()
    if (!admin) {
      admin = await prisma.adminUser.create({
        data: {
          username: DEFAULT_USERNAME,
          password: hashPassword(DEFAULT_PASSWORD),
        },
      })
    }
    return admin
  } catch (error) {
    console.error('ensureDefaultAdmin error:', error)
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { username, password } = body

    if (!username?.trim() || !password?.trim()) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi.' },
        { status: 400 }
      )
    }

    await ensureDefaultAdmin()

    const admin = await prisma.adminUser.findFirst({
      where: {
        username: {
          equals: username.trim(),
          mode: 'insensitive',
        },
      },
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Username atau password salah.' },
        { status: 401 }
      )
    }

    const isValid = verifyPassword(password, admin.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Username atau password salah.' },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: true, username: admin.username })
  } catch (error) {
    console.error('POST /api/admin/login error:', error)
    return NextResponse.json(
      { error: 'Gagal melakukan verifikasi login.' },
      { status: 500 }
    )
  }
}
