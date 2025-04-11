interface CheckStatusRequest {
  id: string
  name: string
  url: string
}

export async function checkStatus(app: CheckStatusRequest) {
  try {
    const response = await fetch(
      `/api/check-status?url=${encodeURIComponent(app.url)}&app_id=${app.id}`
    )
    const data = await response.json()
    return data.status
  } catch {
    return 'Offline'
  }
}
