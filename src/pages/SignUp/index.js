import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import InputMask from 'react-input-mask';
import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('O nome é obrigatório')
    .strict(false)
    .trim('Nome não pode ter espaços no inicio ou final'),
  password_hash: Yup.string().required('O CPF é obrigatório'),
  phone: Yup.string()
    .required('O telefone é obrigatorio')
    .min(8, 'Telefone deve ter pelo menos 8 digitos')
    .max(16, 'Telefone deve ter no maximo 12 digitos'),
  email: Yup.string().email('Insira um email válido'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, phone, email, password_hash }) {
    dispatch(signUpRequest(name, phone, email, password_hash));
  }

  return (
    <>
      <img src={logo} alt="GoBarberWeb" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <InputMask mask="(99)99999-9999">
          {() => <Input name="phone" placeholder="Seu telefone*" />}
        </InputMask>
        <Input name="name" type="text" placeholder="Nome completo*" />
        <InputMask mask="999.999.999-99">
          {() => <Input name="password_hash" placeholder="000.000.000-00*" />}
        </InputMask>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
