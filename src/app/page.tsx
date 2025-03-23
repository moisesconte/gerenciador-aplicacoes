'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from './components/button'
import { InputField, InputRoot } from './components/input'

interface App {
  id: number
  name: string
  url: string
  status: string
}

export default function Home() {
  const [apps, setApps] = useState<App[]>([
    {
      id: 1,
      name: 'Meu App',
      url: 'http://localhost:3000',
      status: 'Checando...',
    },
  ])
  const [newApp, setNewApp] = useState<{ name: string; url: string }>({
    name: '',
    url: '',
  })

  const addApp = () => {
    if (!newApp.name || !newApp.url) return
    setApps([...apps, { id: Date.now(), ...newApp, status: 'Checando...' }])
    setNewApp({ name: '', url: '' })
  }

  const checkStatus = useCallback(async (app: App) => {
    try {
      const response = await fetch(
        `/api/check-status?url=${encodeURIComponent(app.url)}`
      )
      const data = await response.json()
      return data.status
    } catch {
      return 'Offline'
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setApps(currentApps =>
        currentApps.map(app => {
          checkStatus(app).then(status => {
            setApps(prevApps =>
              prevApps.map(a => (a.id === app.id ? { ...a, status } : a))
            )
          })
          return app
        })
      )
    }, 60000)
    return () => clearInterval(interval)
  }, [checkStatus])

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Aplicações</h1>
      <div className="flex gap-2 mb-4">
        <InputRoot>
          <InputField
            placeholder="Nome do App"
            value={newApp.name}
            onChange={e => setNewApp({ ...newApp, name: e.target.value })}
          />
        </InputRoot>

        <InputRoot>
          <InputField
            placeholder="URL"
            value={newApp.url}
            onChange={e => setNewApp({ ...newApp, url: e.target.value })}
          />
        </InputRoot>
        <Button onClick={addApp}>Adicionar</Button>
      </div>
      <div className="grid gap-4">
        {apps.map(app => (
          <div key={app.id} className="border rounded-xl border-gray-600">
            <div className="p-4 flex justify-between">
              <div>
                <h2 className="text-lg font-semibold">{app.name}</h2>
                <p className="text-sm text-gray-300">{app.url}</p>
              </div>
              <span
                className={
                  app.status === 'Online' ? 'text-purple' : 'text-danger'
                }
              >
                {app.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
