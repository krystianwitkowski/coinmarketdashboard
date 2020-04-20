export const fetchTheme = async () => {
  const url = '/theme'
  const promise = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return promise.json()
}
