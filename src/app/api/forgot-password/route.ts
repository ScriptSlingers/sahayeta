import { prisma } from '@sahayeta/lib'
import crypto from 'crypto'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email: string }
    const lowerCaseEmail = email.toLowerCase()
    const existingUser = await prisma.user.findFirst({
      where: {
        email: lowerCaseEmail
      }
    })

    if (!existingUser) {
      return new NextResponse(
        JSON.stringify({
          status: 'error',
          message: 'Email does not exist'
        }),
        { status: 400 }
      )
    }

    const resetToken = crypto.randomBytes(20).toString('hex')
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')
    const passwordResetExpires = new Date(Date.now() + 3600000).toISOString()

    await prisma.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        resetToken: passwordResetToken,
        resetTokenExpiry: passwordResetExpires
      }
    })

    const resetUrl = `${process.env.NEXTAPP_URL}/reset-password/${resetToken}`
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        resetUrl,
        message: 'Password reset email sent.'
      }),
      { status: 200 }
    )
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message
      }),
      { status: 500 }
    )
  }
}
