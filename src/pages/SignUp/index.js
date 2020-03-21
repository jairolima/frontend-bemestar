import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import InputMask from 'react-input-mask';
import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  password_hash: Yup.string().required('O CPF é obrigatório'),
  phone: Yup.string()
    .required('O telefone é obrigatorio')
    .matches(/^[0-9]+$/, 'Telefone deve ter apenas numeros')
    .min(8, 'Telefone deve ter pelo menos 8 digitos')
    .max(12, 'Telefone deve ter no maxmio 12 digitos'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O Email é obrigatório'),
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
        <InputMask
          mask="999.999.999-99"
          name="password_hash"
          type="text"
          placeholder="Seu CPF"
        />
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="phone" type="tel" placeholder="Seu telefone" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
