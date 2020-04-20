import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import verifyEmail from '../utilities/verifyEmail.js'

const Router = express.Router();

Router.route('/')
.post(async (req, res) => {
  const [ username, password, email ] = req.body

  const empty = req.cookies.lang && req.cookies.lang.flag === 'eng' ? '* The fields cannot be an empty' :  req.cookies.lang && req.cookies.lang.flag === 'pl' ? '* Pola nie mogą być puste' : '* The fields cannot be an empty'
  const character = req.cookies.lang && req.cookies.lang.flag === 'eng' ? '* The e-mail must contain an "@" character' :  req.cookies.lang && req.cookies.lang.flag === 'pl' ? '* E-mail musi zawierać znak "@"' : '* The e-mail must contain an "@" character'


  if(username.length === 0 && password.length === 0 && email.length === 0){
    return res.status(422).json({ message: [empty, empty, empty] })
  }

  else if(username.length > 0 && password.length === 0 && email.length === 0){
    return res.status(422).json({ message: ['', empty, empty]})
  }

  else if(password.length > 0 && username.length === 0 && email.length === 0){
    return res.status(422).json({ message: [empty, '', empty]})
  }

  else if(email.length > 0 && username.length === 0 && password.length === 0){
    return res.status(422).json({ message: [empty, empty, '']})
  }

  else if(email.length > 0 && username.length > 0 && password.length === 0){
    return res.status(422).json({ message: ['', empty, '']})
  }

  else if(email.length > 0 && password.length > 0 && username.length === 0){
    return res.status(422).json({ message: [empty, '', '']})
  }

  else if(username.length > 0 && password.length > 0 && email.length === 0){
    return res.status(422).json({ message: ['', '', empty]})
  }

  else if(email.length > 0 && new RegExp('^[^@]+@[^@]+\.[^@]+$').test(email) !== true){
    return res.status(422).json({ message: ['', '', character]})
  }

  else{
  const saltRounds = 10;
  const exists = req.cookies.lang && req.cookies.lang.flag === 'eng' ? 'Your email is already busy' :  req.cookies.lang && req.cookies.lang.flag === 'pl' ? 'Twój email jest już zajęty' : 'Your email is already busy';
    bcrypt.hash(password, saltRounds, (err, hash) => {
      User.findOne({ email })
      .then(user => {
        if(user){
          return res.status(400).json({message: ['', '', exists]})
        }
        else{
          const user = new User({ username, password: hash, email: email })
          const save = user.save((err, user) => {
            return res.status(201).json({ message: ['', '', ''], success: true })
          })
          const sendVerify = verifyEmail({ verify: email, username });
        }
      })
    });
  }
})

export default Router;
