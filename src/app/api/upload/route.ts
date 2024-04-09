import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const originalPath = join('./public/assets/uploads', file.name)

    await writeFile(originalPath, buffer)

    const newPath = originalPath.replace(/\\/g, '/')
    const path = newPath.replace('public/assets/', '/assets/')

    return NextResponse.json({ success: true, path })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' })
  }
}
