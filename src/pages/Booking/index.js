/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Worker from '~/components/Worker';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Appointment, Del } from './styles';

export default function Booking() {
  const [appointments, setAppointments] = useState([]);
  const profile = useSelector(state => state.user.profile);

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
      history.push('/booking');
    } catch (err) {
      toast.error(
        'Agendamentos só podem ser cancelados com mais de 2h de antecedencia'
      );
    }
  }

  function onload() {
    if (profile.id == 17) {
      history.push('/adm');
    } else if (profile.provider) {
      history.push('/dashboard');
    }
  }

  return (
    <Container onLoad={onload}>
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

      <Worker />
    </Container>
  );
}
