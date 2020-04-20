import { home, logout } from 'pages/dashboard/nav'
import { next, prev } from 'pages/dashboard/page'
import search from 'pages/dashboard/search'
import filter from 'pages/dashboard/filter'

/* Menu Navigation */
const attachClickHome = home
const attachClickLogout = logout

/* Next, Prev page table */
const attachClickNext = next
const attachClickPrev = prev

/* Search cryptocurrencies */
const attachClickSearch = search

/* Filter Table */
const attachClickFilters = filter
