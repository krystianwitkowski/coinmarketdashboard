import state from 'reusable/initState';
import hamburger from 'reusable/components/hamburger';
import { lang, dropdown } from 'reusable/components/lang'
import theme from 'reusable/components/theme';
import form from 'pages/home/form';

/* Toggle mobile menu */
const attachClickHamburger = hamburger

/* Load new theme*/
const attachClickTheme = theme

/* Create new user */
const attachClickSubmit = form

/* Toggle dropdown and settings lang*/
const attachClickLang = lang
const attachClickDropdown = dropdown

/* Default states app */
const initState = state();
