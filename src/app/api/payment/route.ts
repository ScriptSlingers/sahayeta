import { prisma } from '@sahayeta/app/lib/prismadb'
import { useServerSession } from '@sahayeta/app/utils/useServerSession'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const payments = await prisma.payment.findMany({
    where: {},
    select: {
      paymentId: true,
      paymentType: true,
      expirationDate: true,
      paymentBy: true,
      paymentMethod: true,
      campaign: true
    }
  })

  return NextResponse.json({ payments })
}

export async function POST(request: NextRequest) {
  const currentUser = await useServerSession()
  if (!currentUser) {
    return NextResponse.json(
      { message: 'You must be logged in.' },
      { status: 404 }
    )
  }
  try {
    const payment = await request.json()
    if (
      !payment.paymentType ||
      !payment.paymentDate ||
      !payment.paymentById ||
      !payment.expirationDate ||
      !payment.paymentMethodId
    ) {
      throw new Error('Incomplete payment data')
    }
    const {
      paymentType,
      paymentDate,
      expirationDate,
      paymentById,
      paymentMethodId
    } = payment

    const newPayment = await prisma.payment.create({
      data: {
        paymentType,
        expirationDate,
        paymentDate,
        paymentById,
        paymentMethodId
      }
    })
    return NextResponse.json(newPayment)
  } catch (error) {
    return NextResponse.json(
      { message: 'POST Error', error: error.message },
      { status: 500 }
    )
  }
}
