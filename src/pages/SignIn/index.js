import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import InputMask from 'react-input-mask';
import logo from '~/assets/logo.svg';

import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  phone: Yup.string().required('O Telefone é obrigatório'),
  password_hash: Yup.string().required('A Senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ phone, password_hash }) {
    dispatch(signInRequest(phone, password_hash));
  }

  return (
    <>
      <img src={logo} alt="GoBarberWeb" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <InputMask mask="(99)99999-9999">
          {() => <Input name="phone" placeholder="Seu telefone" />}
        </InputMask>
        <InputMask mask="999.999.999-99">
          {() => <Input name="password_hash" placeholder="000.000.000-00" />}
        </InputMask>
        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/register">Criar conta gratuíta</Link>
      </Form>
    </>
  );
}
