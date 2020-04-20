import { getState } from 'reusable/utilities';

export const fetchRefreshToken = async () => {
  const url = '/refresh';
  const promise = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-refresh-token': getState(null, 'refreshToken')
    }
  })

  return promise.json()
}

export const fetchIsExpired = async () => {
  const url = '/isExpired';
  const promise = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': getState(null, 'accessToken')
    }
  })

  return promise.json()
}
