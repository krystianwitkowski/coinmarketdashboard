import { filter } from './js/DOM';
import { getState, setState, isTokenExpired } from 'reusable/utilities';

const filters = ['market_cap', 'price', 'volume_24h', 'circulating_supply', 'percent_change_24h']

const setStateSort = sort => setState(Object.assign({}, getState({}), { sort }))
const setStateOrder = () => setState(Object.assign({}, getState({}), { order: [...getState(null, 'order')].reverse()}))
const setStatePage = () => setState(Object.assign({}, getState({}), { page: 0 }))

const getStateFilter = (sort, order, accessToken) => Object.assign({}, getState({}), { sort: getState(null, 'sort'), order: getState(null, 'order')[0], page: getState(null, 'page'), accessToken: getState(null, 'accessToken')})

const compose = (redirect, getStateFilter, setStatePage, setStateOrder, setStateSort, isTokenExpired) => async sort =>
redirect(getStateFilter(setStatePage(setStateOrder(setStateSort(sort, await isTokenExpired())))))

const redirect = ({ sort, order, accessToken }) => location.assign(`/dashboard/page/0?sort=${sort}&order=${order}&accessToken=${accessToken}`)
const getSort = compose(redirect, getStateFilter, setStatePage, setStateOrder, setStateSort, isTokenExpired)

const attachClickEventListeners = (handler, name, i) => handler[i].addEventListener('click', e => getSort(name))
export const attachClickFilters = [...filters].map(attachClickEventListeners.bind(null, filter))
