import express from 'express';
import User from '../models/user';
import { fetchGlobalMetrics, fetchCryptocurrencies } from '../utilities/API';

const Router = express.Router()

Router.route('/')
.get(async(req, res) => {
  try {
    const getGlobalMetrics = await fetchGlobalMetrics();
    const getCryptocurrencies = await fetchCryptocurrencies();
    const user = await User.findOne({ _id: req.decoded.id })

    return res.render('dashboard', { getGlobalMetrics, getCryptocurrencies, cookies: req.cookies, user })
  } catch (err) {
    throw err
  }
})

export default Router
