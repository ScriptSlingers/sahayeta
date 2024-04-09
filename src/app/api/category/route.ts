import { prisma } from '@sahayeta/lib/prismadb'
import { useServerSession } from '@sahayeta/utils/useServerSession'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const category = await prisma.category.findMany({
      where: {},
      select: {
        id: true,
        name: true,
        displayName: true,
        description: true
        // campaign: true
      }
    })

    return NextResponse.json({ category })
  } catch (error) {
    return NextResponse.json({ message: 'GET Error', error }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const currentUser = await useServerSession()
  if (!currentUser) {
    return NextResponse.json(
      { message: 'You must be logged in.' },
      { status: 404 }
    )
  }
  try {
    const category = await req.json()
    if (
      !category ||
      !category.name ||
      !category.displayName ||
      !category.description
    ) {
      throw new Error('Incomplete category data')
    }

    const { name, displayName, description } = category
    const newCategory = await prisma.category.create({
      data: {
        name,
        displayName,
        description
      }
    })

    return NextResponse.json(newCategory)
  } catch (error) {
    return NextResponse.json(
      { message: 'POST Error', error: error.message },
      { status: 500 }
    )
  }
}
