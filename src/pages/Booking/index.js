import React, { useState, useEffect } from 'react';
import Worker from '~/components/Worker';
import api from '~/services/api';

import { Container, Appointment } from './styles';

export default function Booking() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('appointments');

      setAppointments(response.data);
    }

    loadAppointments();
  }, []);

  return (
    <Container>
      <div>
        {appointments.map(appointment => (
          <Appointment>
            <strong>{appointment.provider.name} </strong>
            <strong>{appointment.date}</strong>
          </Appointment>
        ))}
        <Worker />
      </div>
    </Container>
  );
}
