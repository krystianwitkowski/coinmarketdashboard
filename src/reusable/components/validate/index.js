const isMessage = (valid, msg, i) => [...valid][i].textContent = msg;

export default async (promise, valid) => {
  const user = await promise;
  const render = [...user.message].map(isMessage.bind(null, valid))
  return user;
}
