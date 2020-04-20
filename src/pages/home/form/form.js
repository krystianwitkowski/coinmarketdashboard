import { inputs, valid, submit } from './js/DOM';
import { fetchUser } from './js/API';
import { prevent } from 'reusable/utilities';
import validate from 'reusable/components/validate';

const isValue = node => node.value;
const getInputs = inputs => [...inputs].map(isValue)

const redirect = async (promise, url) => {
  const user = await promise;
  return user.success ? location.assign('/success') : null;
}

const compose = (redirect, validate, fetchUser, getInputs, prevent) =>
(e, inputs, valid, url) => redirect(validate(fetchUser(getInputs(inputs, prevent(e))), valid))

const getCreateUser = compose(redirect, validate, fetchUser, getInputs, prevent)

export const attachClickSubmit = submit.addEventListener('click', e => getCreateUser(e, inputs, valid))
