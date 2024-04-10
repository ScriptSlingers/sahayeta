import { prisma } from '@sahayeta/lib/prismadb'
import { useServerSession } from '@sahayeta/utils/useServerSession'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const payments = await prisma.payment.findMany({
    where: {},
    select: {
      paymentId: true,
      paymentStatus: true,
      paymentDate: true,
      paymentById: true,
      paymentMethodId: true,
      paymentAmount: true,
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
    if (!payment.paymentMethodId || !payment.campaignId) {
      throw new Error('Incomplete payment data')
    }
    const { paymentMethodId, campaignId } = payment

    const newPayment = await prisma.payment.create({
      data: {
        paymentDate: new Date(),
        paymentById: currentUser.id,
        campaignId: campaignId,
        paymentMethodId,
        paymentAmount: 0
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
