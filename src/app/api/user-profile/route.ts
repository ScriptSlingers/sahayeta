import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@sahayeta/app/lib'

export async function GET() {
  const session = await getServerSession()
  if (session?.user) {
    const user = await prisma.user.findFirst({
      where: { email: session?.user?.email || '' },
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
    return NextResponse.json(user)
  } else {
    return NextResponse.json({ message: 'Unauthorized access' })
  }
}

/* ToDos
 2. Make API for updateUser POST request for user-profile page
*/

export async function POST() {
  const session = await getServerSession()
  if (session?.user) {
    // const user = await prisma.user.upsert({
    //   id = session?.user?.id
    // })
    return NextResponse.json({})
  } else {
    return NextResponse.json({ message: 'Unauthorized access' })
  }
}
