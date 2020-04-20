import { getState, setState } from 'reusable/utilities';

const initState = () => {
  const initStatePage = setState(Object.assign({}, getState({}), { page: 0 }))
  const initStateAccessToken = setState(Object.assign({}, getState({}), { accessToken: null }))
  const initStateRefreshToken = setState(Object.assign({}, getState({}), { refreshToken: null }))
  const initStateSearch = setState(Object.assign({}, getState({}), { search: '' }))
  const initStateSort = setState(Object.assign({}, getState({}), { sort: 'market_cap' }))
  const initStateOrder = setState(Object.assign({}, getState({}), { order: ['desc', 'asc'] }))
  const initStateDropdown = setState(Object.assign({}, getState({}), { dropdown: false }))
  const initStateMobileMenu = setState(Object.assign({}, getState({}), { mobileMenu: false }))
}

export default initState
