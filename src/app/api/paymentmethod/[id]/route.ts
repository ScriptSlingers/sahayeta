import { prisma } from '@sahayeta/lib/prismadb'
import { useServerSession } from '@sahayeta/utils/useServerSession'
import { NextRequest, NextResponse } from 'next/server'

//GET endpoint
export async function GET(req: NextRequest, { params }) {
  try {
    const { id } = params
    const paymentMethod = await prisma.paymentMethod.findFirst({
      where: { methodId: id }
    })
    if (!paymentMethod) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(paymentMethod)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error retriving the categories', error },
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
    const { methodName, displayName } = body

    const { id } = params

    const updatePaymentMethod = await prisma.paymentMethod.update({
      where: { methodId: id },
      data: {
        methodName,
        displayName
      }
    })

    if (!updatePaymentMethod) {
      return NextResponse.json({ message: 'Method not found' }, { status: 404 })
    }
    return NextResponse.json(updatePaymentMethod)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating category', error },
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
        { message: 'methodId is required for deletion' },
        { status: 400 }
      )
    }

    const paymentMethod = await prisma.paymentMethod.findFirst({
      where: { methodId: id }
    })

    if (!paymentMethod) {
      return NextResponse.json(
        { message: 'paymentMethod not found' },
        { status: 404 }
      )
    } else {
      await prisma.paymentMethod.delete({
        where: { methodId: id }
      })

      if (
        req.method === 'DELETE' &&
        req.headers.get('accept') === 'application/json'
      ) {
        return new NextResponse(null, { status: 204 })
      } else {
        return new NextResponse(null, {
          status: 204,
          statusText: 'paymentMethod deleted successfully'
        })
      }
    }
  } catch (error) {
    console.error('Error:', error)

    return NextResponse.json(
      { message: 'Error in deleting the paymentMethod', error },
      { status: 500 }
    )
  }
}
