import { prisma } from '@sahayeta/lib'
import { useServerSession } from '@sahayeta/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const campaigns = await prisma.campaign.findMany({
    where: {},
    select: {
      campaignId: true,
      title: true,
      isVerified: true,
      image: true,
      description: true,
      goalAmount: true,
      currentAmount: true,
      collectedAmount: true,
      startDate: true,
      endDate: true,
      createdById: true,
      createdBy: true,
      category: true,
      status: true,
      payments: {
        where:{
          paymentStatus: "completed"
        },
        include:{
          paymentBy:{
            select:{
              name: true,
            }
          }
        }
      },
      latitude: true,
      longitude: true,
      address: true
    }
  })
  
  return NextResponse.json({ campaigns })
}
export async function POST(request: NextRequest) {
  const currentUser = await useServerSession()
  if (!currentUser) {
    return NextResponse.json(
      { message: 'You must be logged in.' },
      { status: 404 }
    )
  }
  try {
    const campaign = await request.json()
    const {
      title,
      image,
      isVerified,
      description,
      goalAmount,
      createdById,
      categoryId,
      endDate,
      startDate,
      latitude,
      longitude,
      address

    } = campaign

    const newCampaign = await prisma.campaign.create({
      data: {
        title,
        image,
        isVerified,
        description,
        goalAmount,
        createdById,
        categoryId,
        endDate,
        startDate,
        latitude,
        longitude,
        address
      }
    })

    return NextResponse.json(newCampaign)
  } catch (error) {
    return NextResponse.json(
      { message: 'POST Error', error: error.message },
      { status: 500 }
    )
  }
}
