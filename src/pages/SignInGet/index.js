import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';
import history from '~/services/history';

export default function SignInGet(phone, password_hash) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signInRequest(phone, password_hash));
    history.push('/');
  }, [dispatch, password_hash, phone]);

  return (
    <>
      <Container>
        <h1>Carregando...</h1>
      </Container>
    </>
  );
}
