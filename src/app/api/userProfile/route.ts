import { authOptions, prisma } from '@sahayeta/app/lib'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await getServerSession()

    if (session?.user) {
      const user = await prisma.user.findFirst({
        where: { email: session?.user?.email },
        select: {
          id: true,
          name: true,
          username: true,
          profileImage: true,
          role: true,
          orgName: true,
          email: true,
          emailVerified: true,
          bio: true,
          phoneNum: true,
          address: true,
          dob: true,
          ctzImg: false,
          balance: true,
          campaign: true
        }
      })

      if (user) {
        return NextResponse.json(user)
      } else {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }
    } else {
      return NextResponse.json(
        { message: 'Unauthorized access' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  type User = {
    name?: string
    email?: string
    image?: string
    userDetails?: {
      id: string
    }
  }

  try {
    const body = await req.json()
    if (!session) {
      NextResponse.json({ message: 'You must be logged in.' }, { status: 404 })
    } else {
      const id = (session.user as User).userDetails?.id
      const updateUser = await prisma.user.update({
        where: { id },
        data: body
      })
      if (!updateUser) {
        return NextResponse.json(
          { message: 'Method not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(updateUser)
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating user', error },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  type User = {
    name?: string
    email?: string
    image?: string
    userDetails?: {
      id: string
    }
  }
  try {
    const id = (session.user as User).userDetails?.id
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
