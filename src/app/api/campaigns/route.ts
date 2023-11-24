import { prisma } from '@sahayeta/app/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const Campaigns = await prisma.campaign.findMany({
    where: {},
    select: {
      campaignId: true,
      title: true,
      isVerified: true,
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
