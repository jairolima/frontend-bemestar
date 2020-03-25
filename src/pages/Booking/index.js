import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import { toast } from 'react-toastify';

import Worker from '~/components/Worker';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Appointment, Del } from './styles';

export default function Booking() {
  const [appointments, setAppointments] = useState([]);

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

  return (
    <Container>
      <div>
        {appointments.map(appointment => (
          <Appointment>
            <Del>
              <Form onSubmit={deleteSubmit}>
                <Input
                  type="hidden"
                  name="delappointment"
                  value={appointment.id}
                />
                <strong>Agendado {appointment.provider.name} para</strong>

                <strong> {appointment.date}</strong>

                <button type="submit">Desmarcar</button>
              </Form>
            </Del>
          </Appointment>
        ))}

        <Worker />
      </div>
    </Container>
  );
}
