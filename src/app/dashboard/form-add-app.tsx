'use client'

import { useState } from 'react'
import { Button } from '../components/button'
import { InputField, InputRoot } from '../components/input'

interface FormAddAppProps {
  onAppAdded: () => void
}

export function FormAddApp({ onAppAdded }: FormAddAppProps) {
  const [newApp, setNewApp] = useState<{ name: string; url: string }>({
    name: '',
    url: '',
  })

  async function addApp() {
    if (!newApp.name || !newApp.url) return

    await fetch('/api/apps', {
      method: 'POST',
      body: JSON.stringify({
        name: newApp.name,
        url: newApp.url,
      }),
    })

    setNewApp({ name: '', url: '' })
    onAppAdded()
  }

  return (
    <div className="flex gap-2 mb-4">
      <InputRoot>
        <InputField
          placeholder="Nome do App"
          value={newApp.name}
          onChange={e => setNewApp({ ...newApp, name: e.target.value })}
        />
      </InputRoot>

      <div className="w-full">
        <InputRoot>
          <InputField
            placeholder="URL"
            value={newApp.url}
            onChange={e => setNewApp({ ...newApp, url: e.target.value })}
          />
        </InputRoot>
      </div>
      <div>
        <Button onClick={addApp}>Adicionar</Button>
      </div>
    </div>
  )
}
