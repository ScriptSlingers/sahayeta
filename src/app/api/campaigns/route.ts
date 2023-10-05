import { prisma } from '@sahayeta/app/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
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
      createdById: true,
      createdBy: true,
      categoryId: true,
      category: true,
      status: true,
      paymentId: true,
      payment: true
    }
  });

  return NextResponse.json({ Campaigns });
}
