import { prisma } from '@sahayeta/app/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const category = await prisma.category.findMany({
    where: {},
    select: {
      id: true,
      name: true,
      displayName: true,
      description: true,
      Campaign: true
    }
  })

  return NextResponse.json({ category })
}
