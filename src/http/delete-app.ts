interface DeleteAppRequest {
  appId: string
}

export async function deleteApp({ appId }: DeleteAppRequest) {
  await fetch(`/api/apps/${appId}`, {
    method: 'DELETE',
  })
}
