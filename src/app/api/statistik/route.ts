import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// GET all statistik
export async function GET() {
  try {
    const statistik = await prisma.statistikDesa.findMany({
      orderBy: { id: 'asc' },
    })
    return NextResponse.json(statistik)
  } catch (error) {
    console.error('GET /api/statistik error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistik' },
      { status: 500 }
    )
  }
}

// POST new statistik
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { label, nilai } = body

    if (!label || !nilai) {
      return NextResponse.json(
        { error: 'label dan nilai diperlukan' },
        { status: 400 }
      )
    }

    const statistik = await prisma.statistikDesa.create({
      data: {
        label,
        nilai,
      },
    })

    return NextResponse.json(statistik, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/statistik error:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Label sudah ada' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create statistik' },
      { status: 500 }
    )
  }
}
