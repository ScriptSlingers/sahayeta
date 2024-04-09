import { prisma } from '@sahayeta/lib'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, password, username } = (await req.json()) as {
      name: string
      email: string
      password: string
      username: string
    }

    const lowerCaseEmail = email.toLowerCase()

    const existingUser = await prisma.user.findFirst({
      where: {
        email: lowerCaseEmail
      }
    })

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({
          status: 'error',
          message: 'Email already in use'
        }),
        { status: 400 }
      )
    }

    const hashed_password = await hash(password, 12)
    const generatedUsername = await email.split('@')[0]
    const user = await prisma.user.create({
      data: {
        name,
        username: generatedUsername,
        email: lowerCaseEmail,
        password: hashed_password
      }
    })

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email
      }
    })
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
