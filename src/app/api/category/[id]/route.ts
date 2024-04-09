import { prisma } from '@sahayeta/lib/prismadb'
import { useServerSession } from '@sahayeta/utils/useServerSession'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }) {
  try {
    const { id } = params

    const category = await prisma.category.findUnique({
      where: { id }
    })

    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(category)
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
    const { name, displayName, description } = body

    const { id } = params

    const updateCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        displayName,
        description
      }
    })

    if (!updateCategory) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(updateCategory)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating category', error },
      { status: 500 }
    )
  }
}

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
    const category = await prisma.category.findUnique({
      where: { id }
    })

    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    } else {
      await prisma.category.delete({
        where: { id: category.id }
      })
      if (
        req.method === 'DELETE' &&
        req.headers.get('accept') === 'application/json'
      ) {
        return new NextResponse(null, { status: 204 })
      } else {
        return new NextResponse(null, {
          status: 204,
          statusText: 'Category deleted successfully'
        })
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error in deleting the category', error },
      { status: 500 }
    )
  }
}
