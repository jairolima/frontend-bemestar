export function signInRequest(phone, password_hash) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { phone, password_hash },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signUpRequest(name, phone, email, password_hash) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, phone, email, password_hash },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
