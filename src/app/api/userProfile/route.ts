import { prisma } from '@sahayeta/app/lib'
import { NextRequest, NextResponse } from 'next/server'
import { useServerSession } from '../../utils/useServerSession'

export async function GET() {
  const currentUser = await useServerSession()
  try {
    if (!currentUser) {
      return NextResponse.json(
        { message: 'You must be logged in.' },
        { status: 404 }
      )
    }
    const id = currentUser.id
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (user) {
      delete user.password
      return NextResponse.json(user)
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  const currentUser = await useServerSession()
  try {
    if (!currentUser) {
      return NextResponse.json(
        { message: 'You must be logged in.' },
        { status: 404 }
      )
    }
    const id = currentUser.id
    const body = await req.json()
    const updateUser = await prisma.user.update({
      where: { id },
      data: body
    })
    if (!updateUser) {
      return NextResponse.json({ message: 'Method not found' }, { status: 404 })
    }
    return NextResponse.json(updateUser)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating user', error },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const currentUser = await useServerSession()
  try {
    if (!currentUser) {
      return NextResponse.json(
        { message: 'You must be logged in.' },
        { status: 404 }
      )
    }
    const id = currentUser.id
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
  } catch (error) {
    console.error('Error:', error)

    return NextResponse.json(
      { message: 'Error in deleting the user', error },
      { status: 500 }
    )
  }
}
