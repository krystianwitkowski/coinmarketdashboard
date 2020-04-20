import express from 'express';
const Router = express.Router();

Router.route('/')
.get((req, res) => {
  if(req.cookies.theme){
    const clearCookie = res.clearCookie('theme')
    return res.json({ clearCookie: true })
  }

  const setCookie = res.cookie('theme', 'theme-dark')
  return res.json({ setCookie: true })
})

export default Router;
