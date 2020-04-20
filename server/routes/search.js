import express from 'express';
import User from '../models/user';
import { fetchSearch, fetchGlobalMetrics } from '../utilities/API';
const Router = express.Router();

Router.route('/')
.get(async(req, res) => {
  try {
    const getGlobalMetrics = await fetchGlobalMetrics()
    const getSearch = await fetchSearch(req.query.query)

    const toArr = Object.values(getSearch.data)
    const user = await User.findOne({ _id: req.decoded.id })

    return res.render('search', { getSearch: toArr, getGlobalMetrics, cookies: req.cookies, user })
  } catch (err){
    const getGlobalMetrics = await fetchGlobalMetrics()
    const user = await User.findOne({ _id: req.decoded.id })

    return res.render('search-notfound', { getGlobalMetrics, cookies: req.cookies, user })
  }
})

export default Router;
