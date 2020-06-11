import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import {
  updateProfileSuccess,
  updateProfilefailure,
  updateDoctorProfileSuccess,
  updateDoctorProfilefailure,
} from './actions';
import history from '~/services/history';

export function* updateProfile({ payload }) {
  try {
    const { name, email, password_hash, phone, avatar_id } = payload.data;

    const profile = {
      name,
      email,
      password_hash,
      phone,
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

export function* updateDoctorProfile({ payload }) {
  try {
    const {
      specialty,
      crm,
      user_id,
      mon,
      tue,
      wed,
      thu,
      fri,
      sat,
      sun,
    } = payload.data;

    const doctor = {
      specialty,
      crm,
      user_id,
      mon,
      tue,
      wed,
      thu,
      fri,
      sat,
      sun,
    };
    const response = yield call(api.put, 'doctors', doctor);
    toast.success('Perfil de medico atualizado com sucesso!');
    yield put(updateDoctorProfileSuccess(response.data));
  } catch (error) {
    console.tron.log(error);
    toast.error('Erro ao atualizar Perfil de Medico');
    yield put(updateDoctorProfilefailure());
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
  takeLatest('@user/UPDATE_DOCTOR_PROFILE_REQUEST', updateDoctorProfile),
  takeLatest('@user/UPDATE_PROFILE_BOOKING', updateProfileBooking),
]);
