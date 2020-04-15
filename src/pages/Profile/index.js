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
        <Input name="email" placeholder="Seu email" disabled />
        <Input name="password_hash" placeholder="Seu CPF" disabled />
        <hr />
        {/* {profile.provider && (
          <Input name="specialty" placeholder="Sua especialidade" />
        )}
        {profile.provider && <Input name="crm" placeholder="Seu CRM" />} */}

        <Input name="phone" placeholder="Seu telefone" />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="submit" onClick={handleSignOut}>
        Sair
      </button>
    </Container>
  );
}
