import { nav } from './js/DOM';
import { getState, setState, prevent, isTokenExpired } from 'reusable/utilities';

const setStatePage = () => setState(Object.assign({}, getState({}), { page: 1 }))

const defaultSort = 'market_cap';
const setStoreSort = sort => setState(Object.assign({}, getState({}), { sort }))
const setStateSort = () => setStoreSort(defaultSort)

const defaultOrder = ['desc', 'asc']
const setStoreOrder = order => setState(Object.assign({}, getState({}), { order: [...order] }))
const setStateOrder = () => setStoreOrder(defaultOrder)

const getStateAccessToken = () => Object.assign({}, { accessToken: getState(null, 'accessToken')})
const redirect = ({ accessToken }) => location.assign(`/dashboard?accessToken=${accessToken}`)

const compose = (redirect, getStateAccessToken, setStateOrder, setStateSort, setStatePage, isTokenExpired, prevent) => async e =>
redirect(getStateAccessToken(setStateOrder(setStateSort(setStatePage(await isTokenExpired(prevent(e)))))))

const getHome = compose(redirect, getStateAccessToken, setStateOrder, setStateSort, setStatePage, isTokenExpired, prevent);
const attachClickHome = nav.home.addEventListener('click', e => getHome(e))

export default attachClickHome;
