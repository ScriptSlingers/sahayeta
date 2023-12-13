import { prisma } from '@sahayeta/app/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

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
export async function POST(request: NextRequest) {
  try {
    const paymentmethod = await request.json()

    if (
      !paymentmethod ||
      !paymentmethod.methodId ||
      !paymentmethod.methodName ||
      !paymentmethod.displayName ||
      !paymentmethod.payment
    ) {
      throw new Error('Incomplete payment method data')
    }

    const { methodName, displayName } = paymentmethod

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
