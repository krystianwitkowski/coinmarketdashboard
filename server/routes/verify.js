import express from 'express';
import User from '../models/user';
const Router = express.Router()

Router.route('/')
.get(async (req, res) => {
  try {
    const update = await User.findOneAndUpdate({ email: req.query.email }, { verify: true })
    return res.render('verify', { cookies: req.cookies })
  } catch (err) {
    return res.status(500).json({ message: 'Something wrong. Try again' + err })
  }
})

export default Router;
