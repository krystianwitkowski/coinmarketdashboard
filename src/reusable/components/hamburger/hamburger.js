import { menu, hamburger } from './js/DOM';
import { dropdown } from 'reusable/components/lang/js/DOM';
import { getState, setState } from 'reusable/utilities';
import { toggleDropdown } from 'reusable/components/lang';

const setStateMobileMenu = () => setState(Object.assign({}, getState({}), { mobileMenu: !getState(null, 'mobileMenu')}))
const setStateDropdown = () => setState(Object.assign({}, getState({}), { dropdown: false }))

const getStateMobileMenu = () => getState(null, 'mobileMenu');
const getStateDropdown = () => getState(null, 'dropdown');

const toggleMobileMenu = (mobileMenu, node) => mobileMenu ? node.classList.add('menu-list--active') : node.classList.remove('menu-list--active')

const compose = (toggleMobileMenu, getStateMobileMenu, setStateMobileMenu, toggleDropdown, getStateDropdown, setStateDropdown) => e => menu => dropdown =>
toggleMobileMenu(getStateMobileMenu(setStateMobileMenu(setStateDropdown(toggleDropdown(getStateDropdown(setStateDropdown()), dropdown)))), menu)

const getMobileMenu = compose(toggleMobileMenu, getStateMobileMenu, setStateMobileMenu, toggleDropdown, getStateDropdown, setStateDropdown)
export const attachClickHamburger = hamburger.addEventListener('click', e => getMobileMenu(e)(menu)(dropdown));
