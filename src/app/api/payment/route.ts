import { prisma } from '@sahayeta/app/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const Payments = await prisma.payment.findMany({
    where: {},
    select: {
      paymentId: true,
      paymentType: true,
      expirationDate: true,
      paymentById: true,
      paymentBy: true,
      paymentMethodId: true,
      paymentMethod: true,
      campaign: true
    }
  })

  return NextResponse.json({ Payments })
}
