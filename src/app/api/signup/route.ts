import { prisma } from '@sahayeta/app/lib'
import { SHA256 } from 'crypto-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  const hashPassword = (password: string) => {
    return SHA256(password).toString()
  }
  try {
    const user = await req.json()
    await prisma.user.findFirstOrThrow({
      where: { email: user.email }
    })
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 409 }
    )
  } catch (error: any) {
    if (error.name == 'NotFoundError') {
      const user = await req.json()

      const { email, password } = user
      const newUser = await prisma.user.create({
        data: {
          email,
          password
        }
      })
      return NextResponse.json(newUser)
    }
  }
}
