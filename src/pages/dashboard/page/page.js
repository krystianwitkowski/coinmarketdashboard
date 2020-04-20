import { button } from './js/DOM';
import { getState, setState, isTokenExpired } from 'reusable/utilities';

const setStateNextPage = () => setState(Object.assign({}, getState({}), { page: getState(null, 'page') + 1}))
const setStatePrevPage = () => setState(Object.assign({}, getState({}), { page: getState(null, 'page') === 0 ? 0 : getState(null, 'page') - 1}))

const getStatePage = () => Object.assign({}, { page: getState(null, 'page'), sort: getState(null, 'sort'), order: getState(null, 'order')[0], accessToken: getState(null, 'accessToken') })

const redirect = ({ page, sort, order, accessToken }) => location.assign(`/dashboard/page/${page}?sort=${sort}&order=${order}&accessToken=${accessToken}`)
const compose = (redirect, getStatePage, setStatePage, isTokenExpired) => async () => redirect(getStatePage(setStatePage(await isTokenExpired())))

const getNextPage = compose(redirect, getStatePage, setStateNextPage, isTokenExpired)
const getPrevPage = compose(redirect, getStatePage, setStatePrevPage, isTokenExpired)

export const attachClickNext = button.next.addEventListener('click', getNextPage)
export const attachClickPrev = button.prev.addEventListener('click', getPrevPage)
