/* eslint-disable func-names */
import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Background, Margin } from './styles';

import { updateDoctorProfileRequest } from '~/store/modules/user/actions';

export default function Doctor() {
  const profile = useSelector(state => state.user.profile);
  const doctor = useSelector(state => state.user.doctor);
  const dispatch = useDispatch();

  function doctorSubmit(data) {
    dispatch(updateDoctorProfileRequest(data));
  }

  // function myFunction(num) {
  //   return num;
  // }
  // const newarray = item.map(myFunction);

  return (
    <Background>
      <Margin />
      <Container>
        {profile.provider ? (
          <>
            <Form initialData={doctor} onSubmit={doctorSubmit}>
              <Input name="specialty" placeholder="Especialidade" />
              <Input name="crm" placeholder="CRM" />
              <Input name="mon" placeholder="Segunda" />
              <Input name="tue" placeholder="Terça" />
              <Input name="wed" placeholder="Quarta" />
              <Input name="thu" placeholder="Quinta" />
              <Input name="fri" placeholder="Sexta" />
              <Input name="sat" placeholder="Sabado" />
              <Input name="sun" placeholder="Domingo" />
              <Input name="user_id" value={profile.id} hidden />
              <button type="submit">Atualizar</button>
            </Form>
          </>
        ) : (
          <p />
        )}
      </Container>
    </Background>
  );
}
