import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { name, url } = await request.json()

  await prisma.app.create({
    data: {
      name,
      url,
    },
  })

  return new Response(null, {
    status: 201,
  })
}

export async function GET(request: NextRequest) {
  const apps = await prisma.app.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return Response.json({ apps })
}
