import { inputs, valid, submit } from './js/DOM';
import { fetchAuth } from './js/API';
import { setState, getState, prevent } from 'reusable/utilities';
import validate from 'reusable/components/validate';

const getStateAccessToken = () => Object.assign({}, { accessToken: getState(null, 'accessToken') })

const isValue = node => node.value;
const getInputs = inputs => [...inputs].map(isValue)

const saveTokens = async user => {
  const auth = await user;
  return auth.success ? setState(Object.assign({}, getState({}), { accessToken: auth.tokens.accessToken, refreshToken: auth.tokens.refreshToken })) : null
}

const redirect = ({ accessToken }) => accessToken ? location.assign(`/dashboard?accessToken=${accessToken}`) : null
const compose = (redirect, getStateAccessToken, saveTokens, validate, fetchAuth, getInputs, prevent) =>
e => inputs => async valid => redirect(getStateAccessToken(await saveTokens(validate(fetchAuth(getInputs(inputs, prevent(e))), valid))))

const getAuthUser = compose(redirect, getStateAccessToken, saveTokens, validate, fetchAuth, getInputs, prevent)

export const attachClickSubmit = submit.addEventListener('click', e => getAuthUser(e)(inputs)(valid))
