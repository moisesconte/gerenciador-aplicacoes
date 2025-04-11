export interface GetAppsResponse {
  apps: {
    id: string
    name: string
    url: string
    actived: boolean
  }[]
}

export async function getApps(): Promise<GetAppsResponse> {
  const response = await fetch('/api/apps', {
    method: 'GET',
  })

  const { apps } = await response.json()

  return { apps }
}
