import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password_hash } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password_hash,
    });

    const { token, user } = response.data;

    // if (!user.provider) {
    //   toast.error('usuario nao é prestador de servico');
    //   return;
    // }

    api.defaults.headers.Authorization = `Baerer ${token}`;

    yield put(signInSuccess(token, user));

    if (user.provider) {
      history.push('/Dashboard');
    } else {
      history.push('/Booking');
    }
  } catch (err) {
    toast.error('Falha na autenticação, verifique seu email/senha');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, phone, email, password_hash } = payload;

    yield call(api.post, 'users', {
      name,
      phone,
      email,
      password_hash,
      provider: false,
    });
    toast.success('Conta criada com sucesso!');
    const response = yield call(api.post, 'sessions', {
      email,
      password_hash,
    });
    const { token, user } = response.data;

    // if (!user.provider) {
    //   toast.error('usuario nao é prestador de servico');
    //   return;
    // }

    api.defaults.headers.Authorization = `Baerer ${token}`;

    yield put(signInSuccess(token, user));

    if (user.provider) {
      history.push('/Dashboard');
    } else {
      history.push('/Booking');
    }
  } catch (err) {
    toast.error('Falha no cadastro verifique seus dados!');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Baerer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
