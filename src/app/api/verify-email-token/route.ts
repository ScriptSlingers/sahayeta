import { prisma } from '@sahayeta/lib'
import crypto from 'crypto'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { verificationToken } = await req.json()
  const hashedToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex')

  const expiryDate = new Date(Date.now()).toISOString()
  const user = await prisma.user.findFirst({
    where: {
      verificationToken: hashedToken,
      verificationExpiry: {
        gt: expiryDate
      }
    }
  })
  console.log(hashedToken)

  if (!user) {
    return new NextResponse('Invalid token or has expired', {
      status: 400
    })
  } else if (user && user.isVerified === true) {
    return new NextResponse('Email is already verified', {
      status: 400
    })
  } else return new NextResponse(JSON.stringify(user), { status: 200 })
}
