import express from 'express';
const Router = express.Router();

Router.route('/')
.get((req, res) => {
  return res.json({ expired: false })
})

export default Router;
