import express from 'express';
const Router = express.Router()

Router.route('/')
.get((req, res) => {
  return res.render('signin', { cookies: req.cookies })
})

export default Router
