import { menu, dropdown } from './js/DOM';
import { ENG, PL } from 'reusable/languages';
import { fetchLang } from './js/API';
import { getState, setState, prevent, redirect } from 'reusable/utilities';

const setStateDropdown = () => setState(Object.assign({}, getState({}), { dropdown: !getState(null, 'dropdown') }))
const getStateDropdown = () => getState(null, 'dropdown');

export const toggleDropdown = (dropdown, node) => dropdown ? node.classList.add('dropdown-lang--active') : node.classList.remove('dropdown-lang--active')

const compose = (toggleDropdown, getStateDropdown, setStateDropdown, prevent) => e => node =>
toggleDropdown(getStateDropdown(setStateDropdown(prevent(e))), node)
const getDropdown = compose(toggleDropdown, getStateDropdown, setStateDropdown, prevent)

export const attachClickLang = menu.lang.addEventListener('click', e => getDropdown(e)(dropdown))

const getCurrentLang = e => e.target.textContent === 'Eng' ? ENG : e.target.textContent === 'Pl' ? PL : null
const composeDropdown = (redirect, fetchLang, getCurrentLang, prevent) => e => async url => redirect(url, await fetchLang(getCurrentLang(e, prevent(e))))
const getLang = composeDropdown(redirect, fetchLang, getCurrentLang, prevent)

export const attachClickDropdown = dropdown.addEventListener('click', e => getLang(e)(location.href))
