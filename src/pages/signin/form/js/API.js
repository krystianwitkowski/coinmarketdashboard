export async function fetchAuth(inputs) {
  const url = '/auth';
  const promise = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(inputs)
  });
  return promise.json()
}
