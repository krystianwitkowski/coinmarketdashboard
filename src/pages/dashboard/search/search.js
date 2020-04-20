import { button, input } from './js/DOM';
import { getState, setState, prevent, isTokenExpired } from 'reusable/utilities';

const setStoreSearch = input => setState(Object.assign({}, getState({}), { search: input.value }))
const setStateSearch = () => setStoreSearch(input)

const getStateSearch = () => Object.assign({}, { search: getState(null, 'search'), accessToken: getState(null, 'accessToken')})
const redirect = ({ search, accessToken }) => location.assign(`/dashboard/search?query=${search}&accessToken=${accessToken}`);

const compose = (redirect, getStateSearch, setStateSearch, isTokenExpired, prevent) => async e =>
redirect(getStateSearch(setStateSearch(await isTokenExpired(prevent(e)))))

const getSearch = compose(redirect, getStateSearch, setStateSearch, isTokenExpired, prevent)

export const attachClickSearch = button.search.addEventListener('click', e => getSearch(e))
