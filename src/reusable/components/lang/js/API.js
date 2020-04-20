export const fetchLang = async currentLang => {
  const url = '/lang'
  const promise = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(currentLang)
  })

  return promise.json()
}
