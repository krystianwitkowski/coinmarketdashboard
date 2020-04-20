export async function fetchUser(inputs) {
  const url = '/user';
  const promise = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(inputs)
  });
  return promise.json();
}
