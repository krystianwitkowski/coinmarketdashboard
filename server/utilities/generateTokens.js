import jwt from 'jsonwebtoken';

export default async data => {
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_KEY, { expiresIn: '15m' })
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_KEY, { expiresIn: '1h' })

  return {
    accessToken,
    refreshToken
  }
}
