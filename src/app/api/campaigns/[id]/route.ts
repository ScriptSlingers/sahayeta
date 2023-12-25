import { prisma } from '@sahayeta/lib/prismadb'
import { useServerSession } from '@sahayeta/utils/useServerSession'
import { NextRequest, NextResponse } from 'next/server'

//GET endpoint
export async function GET(req: NextRequest, { params }) {
  try {
    const { id } = params

    const campaign = await prisma.campaign.findFirst({
      where: { campaignId: id }
    })

    if (!campaign) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(campaign)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error retriving the categories', error },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest, { params }) {
  const currentUser = await useServerSession()
  if (!currentUser) {
    return NextResponse.json(
      { message: 'You must be logged in.' },
      { status: 404 }
    )
  }
  try {
    const body = await req.json()
    const { id } = params

    const updatecampaign = await prisma.campaign.update({
      where: { campaignId: id },
      data: body
    })

    if (!updatecampaign) {
      return NextResponse.json({ message: 'Method not found' }, { status: 404 })
    }
    return NextResponse.json(updatecampaign)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating campaign', error },
      { status: 500 }
    )
  }
}

// DELETE endpoint
export async function DELETE(req: NextRequest, { params }) {
  const currentUser = await useServerSession()
  if (!currentUser) {
    return NextResponse.json(
      { message: 'You must be logged in.' },
      { status: 404 }
    )
  }
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { message: 'methodId is required for deletion' },
        { status: 400 }
      )
    }

    const campaign = await prisma.campaign.findFirst({
      where: { campaignId: id }
    })

    if (!campaign) {
      return NextResponse.json(
        { message: 'campaign not found' },
        { status: 404 }
      )
    } else {
      await prisma.campaign.delete({
        where: { campaignId: id }
      })

      if (
        req.method === 'DELETE' &&
        req.headers.get('accept') === 'application/json'
      ) {
        return new NextResponse(null, { status: 204 })
      } else {
        return new NextResponse(null, {
          status: 204,
          statusText: 'campaign deleted successfully'
        })
      }
    }
  } catch (error) {
    console.error('Error:', error)

    return NextResponse.json(
      { message: 'Error in deleting the campaign', error },
      { status: 500 }
    )
  }
}
