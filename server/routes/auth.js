import express from 'express';
import bcrypt from 'bcrypt';
import generateTokens from '../utilities/generateTokens.js';
import User from '../models/user.js';
const Router = express.Router()

Router.route('/')
.post(async (req, res, next) => {
  const [ username, password ] = req.body;

  const empty = req.cookies.lang && req.cookies.lang.flag === 'eng' ? '* The fields cannot be an empty' :  req.cookies.lang && req.cookies.lang.flag === 'pl' ? '* Pola nie mogą być puste' : '* The fields cannot be an empty'

  if(username.length === 0 && password.length === 0){
    return res.status(422).json({ message: [empty, empty]})
  }

  else if(username.length > 0 && password.length === 0){
    return res.status(422).json({ message: ['', empty]})
  }

  else if(password.length > 0 && username.length === 0){
    return res.status(422).json({ message: [empty, '']})
  }

  try {
    const user = await User.findOne({ username })
    const match = bcrypt.compareSync(password, user.password);

    if(!match){
      const failed = req.cookies.lang && req.cookies.lang.flag === 'eng' ? 'Authentication failed. Wrong password' :  req.cookies.lang && req.cookies.lang.flag === 'pl' ? 'Uwierzytelnienie nie powiodło się. Złe hasło' : 'Authentication failed. Wrong password'
      return res.status(422).json({ message: ['', failed] })
    }

    if(user.verify !== true){
      const notVerifed = req.cookies.lang && req.cookies.lang.flag === 'eng' ? 'Your account is not verified' :  req.cookies.lang && req.cookies.lang.flag === 'pl' ? 'Twoje konto jest niezweryfikowane' : 'Your account is not verified'
      return res.status(401).json({ message: ['', notVerifed]})
    }

    const generate = await generateTokens({ id: user._id });
    return res.json({ message: ['', ''], tokens: { accessToken: generate.accessToken, refreshToken: generate.refreshToken }, success: true})

  } catch (err) {
    const notFound = req.cookies.lang && req.cookies.lang.flag === 'eng' ? 'Authentication failed' :  req.cookies.lang && req.cookies.lang.flag === 'pl' ? 'Uwierzytelnienie nie powiodło się' : 'Authentication failed'
    return res.status(422).json({ message: ['', notFound]})
  }
})

export default Router;
