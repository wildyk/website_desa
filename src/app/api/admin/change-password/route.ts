import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { currentPassword, newPassword, username } = body

    if (!currentPassword?.trim() || !newPassword?.trim()) {
      return NextResponse.json(
        { error: 'Password saat ini dan password baru wajib diisi.' },
        { status: 400 }
      )
    }

    if (newPassword.trim().length < 6) {
      return NextResponse.json(
        { error: 'Password baru minimal 6 karakter.' },
        { status: 400 }
      )
    }

    const admin = await prisma.adminUser.findFirst()

    if (!admin) {
      return NextResponse.json(
        { error: 'Akun admin tidak ditemukan.' },
        { status: 404 }
      )
    }

    const isValid = verifyPassword(currentPassword, admin.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Password saat ini tidak cocok.' },
        { status: 400 }
      )
    }

    const updatedUsername = username?.trim() || admin.username

    const updated = await prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        username: updatedUsername,
        password: hashPassword(newPassword.trim()),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Akun admin berhasil diperbarui.',
      username: updated.username,
    })
  } catch (error) {
    console.error('POST /api/admin/change-password error:', error)
    return NextResponse.json(
      { error: 'Gagal memperbarui password admin.' },
      { status: 500 }
    )
  }
}
