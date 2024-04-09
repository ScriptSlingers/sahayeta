import { prisma } from '@sahayeta/lib/prismadb'
import { useServerSession } from '@sahayeta/utils/useServerSession'
import { NextRequest, NextResponse } from 'next/server'

//GET endpoint
export async function GET(req: NextRequest, { params }) {
  try {
    const { id } = params

    const payment = await prisma.payment.findFirst({
      where: { paymentId: id }
    })

    if (!payment.paymentId) {
      return NextResponse.json(
        { message: 'Payment not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(payment)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error retriving the Payment Details', error },
      { status: 500 }
    )
  }
}

// PATCH endpoint
export async function PATCH(req: NextRequest, { params }) {
  const currentUser = await useServerSession()
  if (!currentUser) {
    return NextResponse.json(
      { message: 'You must be logged in.' },
      { status: 404 }
    )
  }
  try {
    const body = await req.json()
    const { paymentDate, paymentById, paymentMethodId } = body

    const { id } = params

    const updatedPayment = await prisma.payment.update({
      where: { paymentId: id },
      data: {
        paymentDate,
        paymentById,
        paymentMethodId
      }
    })

    if (!updatedPayment) {
      return NextResponse.json({ message: 'Method not found' }, { status: 404 })
    }
    return NextResponse.json(updatedPayment)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating payment details', error },
      { status: 500 }
    )
  }
}

// DELETE endpoint
export async function DELETE(req: NextRequest, { params }) {
  const currentUser = await useServerSession()
  if (!currentUser) {
    return NextResponse.json(
      { message: 'You must be logged in.' },
      { status: 404 }
    )
  }
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { message: 'paymentId is required for deletion' },
        { status: 400 }
      )
    }

    const payment = await prisma.payment.findFirst({
      where: { paymentId: id }
    })

    if (!payment) {
      return NextResponse.json(
        { message: 'Payment not found' },
        { status: 404 }
      )
    } else {
      await prisma.payment.delete({
        where: { paymentId: id }
      })

      if (
        req.method === 'DELETE' &&
        req.headers.get('accept') === 'application/json'
      ) {
        return new NextResponse(null, { status: 204 })
      } else {
        return new NextResponse(null, {
          status: 204,
          statusText: 'payment deleted successfully'
        })
      }
    }
  } catch (error) {
    console.error('Error:', error)

    return NextResponse.json(
      { message: 'Error in deleting the payment', error },
      { status: 500 }
    )
  }
}
