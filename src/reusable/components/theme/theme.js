import { menu } from './js/DOM';
import { prevent, redirect } from 'reusable/utilities';
import { fetchTheme } from './js/API';

const compose = (redirect, fetchTheme, prevent) => e => async url => redirect(url, await fetchTheme(prevent(e)))
const getTheme = compose(redirect, fetchTheme, prevent)

export const attachClickTheme = menu.theme.addEventListener('click', e => getTheme(e)(location.href))
