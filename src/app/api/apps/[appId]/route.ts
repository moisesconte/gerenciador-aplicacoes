import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ appId: string }> }
) {
  const { appId } = await params

  await prisma.app.delete({
    where: {
      id: appId,
    },
  })

  return new Response(null, {
    status: 203,
  })
}
