import React, { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import api from '~/services/api';

import { Container, Box, Appointment } from './styles';

export default function Adm() {
  const [allappointments, setAllappointments] = useState([]);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    async function loadQuantity() {
      const response = await api.get('quantityappointments');

      setQuantity(response.data);
    }

    loadQuantity();
  }, []);

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('allappointments');

      setAllappointments(response.data);
    }

    loadAppointments();
  }, []);

  const data = allappointments;

  return (
    <Container>
      <Box>
        <div>
          <strong>
            {quantity.numdaily}
            <span>Hoje</span>
          </strong>
        </div>
        <div>
          <strong>
            {quantity.numappointments}
            <span>Agendamentos</span>
          </strong>
        </div>
        <div>
          <strong>
            {quantity.numappointments}
            <span>Clientes</span>
          </strong>
        </div>
        <div>
          <strong>
            {quantity.numproviders}
            <span>Serviços</span>
          </strong>
        </div>
      </Box>

      <Appointment>
        Todos os agendamentos:
        <MDBDataTable striped bordered hover data={data} />
      </Appointment>
    </Container>
  );
}
