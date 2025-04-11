'use client'

import { getApps } from '@/http/get-apps'
import { useEffect, useState } from 'react'
import { AppList } from './app-list'
import { FormAddApp } from './form-add-app'

export interface App {
  id: string
  name: string
  url: string
  status: string
  actived: boolean
}

export default function Dashboard() {
  const [apps, setApps] = useState<App[]>([])

  async function fetchApps() {
    const data = await getApps()
    setApps(
      data.apps.map(app => {
        return {
          ...app,
          status: 'Checando...',
        }
      })
    )
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchApps()
  }, [])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Aplicações</h1>

      <FormAddApp onAppAdded={fetchApps} />

      <AppList apps={apps} setApps={setApps} onAppRemoved={fetchApps} />
    </div>
  )
}
