import state from 'reusable/initState';
import { setState, getState } from 'reusable/utilities';
import { lang, dropdown } from 'reusable/components/lang'
import hamburger from 'reusable/components/hamburger';
import theme from 'reusable/components/theme';
import form from 'pages/signin/form';

/* Toggle mobile menu */
const attachClickHamburger = hamburger

/* Load new theme*/
const attachClickTheme = theme

/* Authenticate user */
const attachClickSubmit = form

/* Toggle dropdown and settings lang*/
const attachClickLang = lang
const attachClickDropdown = dropdown

/* Default states app */
const initState = state();
