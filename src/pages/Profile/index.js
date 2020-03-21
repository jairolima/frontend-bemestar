import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from './styles';

import AvatarInput from './AvatarInput';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        {profile.provider && <AvatarInput name="avatar_id" />}
        <Input name="name" placeholder="Nome completo" disabled />
        <Input name="email" placeholder="Seu endereço completo" disabled />
        <Input name="password_hash" placeholder="Seu CPF" disabled />
        <hr />
        <Input name="phone" placeholder="Seu telefone" />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="submit" onClick={handleSignOut}>
        Sair
      </button>
    </Container>
  );
}
