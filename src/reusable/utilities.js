import { STATE_APP } from 'reusable/constants';
import { fetchRefreshToken, fetchIsExpired } from 'reusable/API';

export const setState = async data => {
  return localStorage.setItem(STATE_APP, JSON.stringify(data));
}

export const getState = (all, property) => {
  const isExist = localStorage.getItem(STATE_APP)
  return isExist ? all && typeof(all) === 'object' ? JSON.parse(isExist) : property ? JSON.parse(isExist)[property] : undefined : {}
}

export const prevent = e => e.preventDefault();

export const redirect = url => location.assign(url);

const isToken = async (fetchIsExpired, fetchRefreshToken) => {
  const isExpired = await fetchIsExpired()
  const token = isExpired.expired ? await fetchRefreshToken() : null
  return token ? setState(Object.assign({}, getState({}), { accessToken: token.accessToken, refreshToken: token.refreshToken})) : null;
}

export const isTokenExpired = () => isToken(fetchIsExpired, fetchRefreshToken);
