import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { updateProfileSuccess, updateProfilefailure } from './actions';
import history from '~/services/history';

export function* updateProfile({ payload }) {
  try {
    const {
      name,
      email,
      password_hash,
      phone,
      specialty,
      crm,
      avatar_id,
    } = payload.data;

    const profile = {
      name,
      email,
      password_hash,
      phone,
      specialty,
      crm,
      avatar_id,
    };

    const response = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    console.tron.log(error);
    toast.error('Erro ao atualizar Perfil');
    yield put(updateProfilefailure());
  }
}

export function* updateProfileBooking({ payload }) {
  try {
    const { date, provider_id } = payload;

    yield call(api.post, 'appointments', {
      date,
      provider_id,
    });
    toast.success('Agendamento efetuado com sucesso!');
    history.push('/booking');
  } catch (err) {
    toast.error('Falha no agendamento, verifique seus dados!');
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/UPDATE_PROFILE_BOOKING', updateProfileBooking),
]);
