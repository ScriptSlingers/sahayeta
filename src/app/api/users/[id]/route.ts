import { prisma } from '@sahayeta/app/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

//GET endpoint
export async function GET(req: NextRequest, { params }) {
  try {
    const { id } = params

    const user = await prisma.user.findFirst({
      where: { id }
    })

    if (!user) {
      return NextResponse.json({ message: 'user not found' }, { status: 404 })
    }
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error retriving the user', error },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest, { params }) {
  try {
    const body = await req.json()

    const { id } = params

    const updateuser = await prisma.user.update({
      where: { id },
      data: body
    })

    if (!updateuser) {
      return NextResponse.json({ message: 'Method not found' }, { status: 404 })
    }
    return NextResponse.json(updateuser)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating user', error },
      { status: 500 }
    )
  }
}

// DELETE endpoint
export async function DELETE(req: NextRequest, { params }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { message: 'methodId is required for deletion' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findFirst({
      where: { id }
    })

    if (!user) {
      return NextResponse.json({ message: 'user not found' }, { status: 404 })
    } else {
      await prisma.user.delete({
        where: { id }
      })

      if (
        req.method === 'DELETE' &&
        req.headers.get('accept') === 'application/json'
      ) {
        return new NextResponse(null, { status: 204 })
      } else {
        return new NextResponse(null, {
          status: 204,
          statusText: 'user deleted successfully'
        })
      }
    }
  } catch (error) {
    console.error('Error:', error)

    return NextResponse.json(
      { message: 'Error in deleting the user', error },
      { status: 500 }
    )
  }
}
