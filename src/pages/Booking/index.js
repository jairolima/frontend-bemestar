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
          <Form onSubmit={deleteSubmit}>
            {!appointment.past && (
              <strong>
                <Appointment>
                  <Del>
                    <Input
                      type="hidden"
                      name="delappointment"
                      value={appointment.id}
                    />
                    Agendado {appointment.provider.name} para {appointment.date}
                    <button type="submit">Desmarcar</button>
                  </Del>
                </Appointment>
              </strong>
            )}
          </Form>
        ))}

        <Worker />
      </div>
    </Container>
  );
}
