import { prisma } from '@sahayeta/app/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const Campaigns = await prisma.campaign.findMany({
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
      createdBy: true,
      category: true,
      status: true,
      payment: true
    }
  })

  return NextResponse.json({ Campaigns })
}
export async function POST(request: NextRequest) {
  try {
    const campaign = await request.json()
    if (
      !campaign.title ||
      !campaign.image ||
      !campaign.isVerified ||
      !campaign.description ||
      !campaign.goalAmount ||
      !campaign.createdById ||
      !campaign.categoryId
    ) {
      return NextResponse.json(
        { message: 'Missing required properties in the request' },
        { status: 400 }
      )
    }

    const {
      title,
      image,
      isVerified,
      description,
      goalAmount,
      createdById,
      categoryId
    } = campaign

    const newCampaign = await prisma.campaign.create({
      data: {
        title,
        image,
        isVerified,
        description,
        goalAmount,
        createdById,
        categoryId
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
