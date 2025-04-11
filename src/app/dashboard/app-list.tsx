'use client'

import { checkStatus } from '@/http/check-status'
import { deleteApp } from '@/http/delete-app'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import type { App } from './page'

interface AppListProps {
  apps: App[]
  setApps: (apps: App[]) => void
  onAppRemoved?: () => void
}

export function AppList({ apps, setApps, onAppRemoved }: AppListProps) {
  async function handleDeleteApp(appId: string) {
    await deleteApp({
      appId,
    })

    onAppRemoved ? onAppRemoved() : null
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedApps = await Promise.all(
        apps.map(async app => {
          const status = await checkStatus(app)
          return { ...app, status }
        })
      )

      setApps(updatedApps)
    }, 30000)

    return () => clearInterval(interval)
  }, [apps, setApps])

  return (
    <div className="grid gap-4">
      <div className="w-full border rounded-xl border-gray-600 p-4">
        <table className="table-auto min-w-full divide-y-1 bg-white text-sm">
          <thead className="text-gray-400 text-sm font-semibold">
            <tr>
              <th className="text-left whitespace-nowrap py-2">Nome</th>
              <th className="text-left whitespace-nowrap py-2">URL</th>
              <th className="text-left whitespace-nowrap py-2">Status</th>
              <th className="text-left whitespace-nowrap py-2">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm divide-y divide-gray-400 bg-white">
            {apps.map(app => (
              <tr key={app.id} className="py-2">
                <td className="py-2 whitespace-nowrap">{app.name}</td>
                <td className="py-2 whitespace-nowrap">
                  <Link
                    className="text-sm text-gray-300"
                    href={app.url}
                    target="_blank"
                  >
                    {app.url}
                  </Link>
                </td>
                <td className="py-2">
                  <div className="relative flex">
                    <span
                      className={clsx('absolute inline-flex h-full ', {
                        'w-10 animate-ping rounded-full bg-danger opacity-30':
                          app.status === 'Offline',
                      })}
                    />
                    <span
                      className={
                        app.status === 'Online'
                          ? 'text-purple relative'
                          : 'text-danger'
                      }
                    >
                      {app.status}
                    </span>
                  </div>
                </td>
                <td className="py-2">
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      className="cursor-pointer group"
                      onClick={() => handleDeleteApp(app.id)}
                    >
                      <FaTrash
                        size={12}
                        className="text-gray-400 group-hover:text-danger"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {apps.map(app => (
        <div key={app.id} className="border rounded-xl border-gray-600">
          <div className="p-4 flex justify-between">
            <div>
              <h2 className="text-lg font-semibold">{app.name}</h2>
              <Link
                className="text-sm text-gray-300"
                href={app.url}
                target="_blank"
              >
                {app.url}
              </Link>
            </div>
            <div className="relative flex items-center gap-2">
              <span
                className={
                  app.status === 'Online' ? 'text-purple' : 'text-danger'
                }
              >
                {app.status}
              </span>
              <button
                type="button"
                className="absolute -top-2 -right-2 cursor-pointer group"
                onClick={() => handleDeleteApp(app.id)}
              >
                <FaTrash
                  size={12}
                  className="text-gray-400 group-hover:text-danger"
                />
              </button>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  )
}
