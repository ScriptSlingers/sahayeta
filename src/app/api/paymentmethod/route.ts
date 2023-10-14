import { prisma } from '@sahayeta/app/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const PaymentMethods = await prisma.paymentMethod.findMany({
    where: {},
    select: {
      methodId: true,
      methodName: true,
      displayName: true,
      Payment: true
    }
  })

  return NextResponse.json({ PaymentMethods })
}
