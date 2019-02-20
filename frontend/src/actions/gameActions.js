import Cookie from 'js-cookie';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = ({username, userId, token}) => (
  {
    type: RECEIVE_CURRENT_USER,
    username: username,
    userId: userId
  }
)

export const authorize = credentials => dispatch => {
  return fetch('users/authorize', {
    method: 'POST',
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password
    }),
    headers: {"Content-Type": "application/json"}
  })
  .then(res => res.json())
  .then(json => {
    Cookie.set('access-token', json.token)
    return dispatch(receiveCurrentUser(json))
  })
}

export const refreshAuthorize = token => dispatch => {
  return fetch('/users/refreshAuthorize', {
    method: 'POST',
    body: JSON.stringify({
      userId: token.userId,
      password: token.password
    }),
    headers: {"Content-Type": "application/json"}
  })
  .then(res => res.json())
  .then(json => {
    return dispatch(receiveCurrentUser(json));
  });
};
