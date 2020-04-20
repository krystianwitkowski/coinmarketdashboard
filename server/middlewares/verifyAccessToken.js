import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.accessToken;

  if(!token){
    return res.status(401).json({ message: 'Token is missing' })
  }

  const verify = jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if(err){
      return res.status(401).json({ message: 'Token expired', expired: true })
    }
    req.decoded = decoded;
    next()
  })
}
