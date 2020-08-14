import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Container, Background, Margin, Appointment, Del } from './styles';
import history from '~/services/history';
import api from '~/services/api';

import AvatarInput from './AvatarInput';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const [appointments, setAppointments] = useState([]);
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('appointments');

      setAppointments(response.data);
    }

    loadAppointments();
  }, [setAppointments]);

  async function deleteSubmit({ delappointment }) {
    try {
      await api.delete(`appointments/${delappointment}`);
      toast.success('Agendamento cancelado com sucesso!');
      history.push('/paginanaoexiste');
      history.push('/');
    } catch (err) {
      toast.error(
        'Agendamentos só podem ser cancelados com mais de 2h de antecedencia'
      );
    }
  }

  return (
    <Background>
      <Margin />
      <Container>
        {appointments.map(appointment => (
          <>
            <Form onSubmit={deleteSubmit}>
              {!appointment.past && (
                <Appointment>
                  <Input
                    type="hidden"
                    name="delappointment"
                    value={appointment.id}
                    style={{ alignSelf: 'center' }}
                  />
                  <strong>
                    Agendado {appointment.provider.name} para {appointment.date}
                  </strong>
                  <div style={{ alignSelf: 'flex-end' }}>
                    <Del>
                      <button type="submit">Desmarcar</button>
                    </Del>
                  </div>
                </Appointment>
              )}
            </Form>
          </>
        ))}
        {/* `***.***.**${profile.password_hash.substring(10, 14)}` */}
        <Form initialData={profile} onSubmit={handleSubmit}>
          {profile.provider && <AvatarInput name="avatar_id" />}

          <Input name="email" placeholder="Seu email" disabled />
          <Input
            name="password_hash"
            value={profile.password_hash}
            placeholder="Seu CPF"
            disabled
          />
          <hr />
          {/* {profile.provider && (
          <Input name="specialty" placeholder="Sua especialidade" />
        )}
        {profile.provider && <Input name="crm" placeholder="Seu CRM" />} */}
          <Input name="name" placeholder="Nome completo" />
          <Input name="phone" placeholder="Seu telefone" />

          <button type="submit">Atualizar perfil</button>
        </Form>

        <button type="submit" onClick={handleSignOut}>
          Sair
        </button>
      </Container>
    </Background>
  );
}
