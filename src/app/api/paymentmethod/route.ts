import { prisma } from '@sahayeta/lib/prismadb'
import { useServerSession } from '@sahayeta/utils/useServerSession'
import { NextRequest, NextResponse } from 'next/server'

// GET endpoint
export async function GET(request: NextRequest) {
  const PaymentMethods = await prisma.paymentMethod.findMany({
    where: {},
    select: {
      methodId: true,
      methodName: true,
      displayName: true,
      payment: true
    }
  })

  return NextResponse.json({ PaymentMethods })
}

// POST endpoint
export async function POST(request: NextRequest) {
  const currentUser = await useServerSession()
  if (!currentUser) {
    return NextResponse.json(
      { message: 'You must be logged in.' },
      { status: 404 }
    )
  }
  try {
    const paymentMethod = await request.json()

    if (!paymentMethod.methodName || !paymentMethod.displayName) {
      throw new Error('Incomplete payment method data')
    }

    const { methodName, displayName } = paymentMethod

    const newPaymentMethod = await prisma.paymentMethod.create({
      data: {
        methodName,
        displayName
      }
    })

    return NextResponse.json(newPaymentMethod)
  } catch (error) {
    return NextResponse.json(
      { message: 'POST Error', error: error.message },
      { status: 500 }
    )
  }
}
