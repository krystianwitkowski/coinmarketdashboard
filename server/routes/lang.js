import express from 'express';
const Router = express.Router();

Router.route('/')
.post((req, res) => {
  const setCookie = res.cookie('lang', req.body)
  return res.json({ setCookie: true })
})

export default Router;
