import { authOptions } from '@sahayeta/app/lib'
import { prisma } from '@sahayeta/app/lib/prismadb'
import { useServerSession } from '@sahayeta/app/utils/useServerSession'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const session = getServerSession(authOptions)
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
  const currentUser = await useServerSession()
  if (currentUser?.role !== 'admin') {
    return NextResponse.json(
      { message: 'You must login as admin' },
      { status: 404 }
    )
  }
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
