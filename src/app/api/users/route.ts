import { prisma } from '@sahayeta/app/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    where: {},
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
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
