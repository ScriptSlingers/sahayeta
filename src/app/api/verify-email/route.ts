import { prisma } from '@sahayeta/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = await req.json()
  console.log('id:', userId)

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId
      }
    })
    if (existingUser) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          isVerified: true,
          verificationExpiry: null,
          verificationToken: null
        }
      })
      console.log('test')
      return new NextResponse('User verified successfully', {
        status: 200
      })
    } else {
      return new NextResponse('Error verifying user', { status: 400 })
    }
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 })
  }
}
