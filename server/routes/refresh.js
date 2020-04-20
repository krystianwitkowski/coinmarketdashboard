import express from 'express';
import jwt from 'jsonwebtoken';
import generateTokens from '../utilities/generateTokens';
const Router = express.Router();

Router.route('/')
.get((req, res) =>{
  const token = req.headers['x-refresh-token'] || req.query.refreshToken;

  if(!token){
    return res.status(401).json({ message: 'Token refresh is missing' })
  }

  const verify = jwt.verify(token, process.env.REFRESH_TOKEN_KEY, async (err, decoded) => {
    if(err){
      return res.status(401).json({ message: 'Token refresh expired' })
    }

    const generate = await generateTokens({ id: decoded.id })
    return res.json(generate)
  })
})

export default Router;
