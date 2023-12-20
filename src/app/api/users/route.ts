import { prisma } from '@sahayeta/app/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    where: {},
    select: {
      id: true,
      username: true,
      name: true,
      address: true,
      phoneNum: true,
      bio: true,
      profileImage: true,
      dob: true,
      ctzImg: true,
      balance: true,
      orgName: true,
      assignedOn: true,
      postedOn: true,
      createdAt: true,
      updatedAt: true,
      email: true,
      password: false
    }
  })

  return NextResponse.json({ users })
}

export async function POST(request: NextRequest) {
  try {
    const user = await request.json()

    const {
      username,
      name,
      address,
      phoneNum,
      bio,
      profileImage,
      dob,
      ctzImg,
      balance,
      orgName,
      assignedOn,
      postedOn,
      createdAt,
      updatedAt,
      email,
      password
    } = user

    const newuser = await prisma.user.create({
      data: {
        username,
        name,
        address,
        phoneNum,
        bio,
        profileImage,
        dob,
        ctzImg,
        balance,
        orgName,
        assignedOn,
        postedOn,
        createdAt,
        updatedAt,
        email,
        password
      }
    })

    return NextResponse.json(newuser)
  } catch (error) {
    return NextResponse.json(
      { message: 'POST Error', error: error.message },
      { status: 500 }
    )
  }
}
