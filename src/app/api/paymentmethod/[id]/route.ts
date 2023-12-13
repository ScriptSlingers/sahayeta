import { prisma } from '@sahayeta/app/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }) {
  try {
    const { methodId } = params

    const paymentMethod = await prisma.paymentMethod.findFirst({
      where: { methodId }
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

export async function PATCH(req: NextRequest, { params }) {
  try {
    const body = await req.json()
    const { methodName, displayName } = body

    const { methodId } = params

    const updatePaymentMethod = await prisma.paymentMethod.update({
      where: { methodId },
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

// export async function DELETE(req: NextRequest, { params }) {
//   try {
//     const { id } = params
//     const category = await prisma.category.findUnique({
//       where: { id }
//     })

//     if (!category) {
//       return NextResponse.json(
//         { message: 'Category not found' },
//         { status: 404 }
//       )
//     } else {
//       await prisma.category.delete({
//         where: { id: category.id }
//       })
//       if (
//         req.method === 'DELETE' &&
//         req.headers.get('accept') === 'application/json'
//       ) {
//         return new NextResponse(null, { status: 204 })
//       } else {
//         return new NextResponse(null, {
//           status: 204,
//           statusText: 'Category deleted successfully'
//         })
//       }
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Error in deleting the category', error },
//       { status: 500 }
//     )
//   }
// }
