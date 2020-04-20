import { nav } from './js/DOM';
import { STATE_APP } from 'reusable/constants';
import { redirect, prevent } from 'reusable/utilities';

const removeSession = state => localStorage.removeItem(state)

const compose = (redirect, removeSession, prevent) => e => STATE_APP => url =>
redirect(url, removeSession(STATE_APP, prevent(e)))

const getLogout = compose(redirect, removeSession, prevent);

const attachClickLogout = nav.logout.addEventListener('click', e => getLogout(e)(STATE_APP)('/signin'))

export default attachClickLogout;
