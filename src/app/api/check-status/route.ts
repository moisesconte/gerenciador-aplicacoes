import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const url = searchParams.get('url')
  const appId = searchParams.get('app_id')
  const date = new Date()

  if (!url || !appId) {
    return Response.json({ status: 'Invalid URL' })
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      },
    })

    const status = response.ok || response.status >= 400 ? 'Online' : 'Offline'

    if (status === 'Offline') {
      await prisma.appChecks.create({
        data: {
          appId,
          status: 'OFFLINE',
        },
      })
    }

    return Response.json({
      url,
      status,
      date,
    })
  } catch (error) {
    await prisma.appChecks.create({
      data: {
        appId,
        status: 'OFFLINE',
      },
    })

    return Response.json({ url, status: 'Offline', date })
  }
}
