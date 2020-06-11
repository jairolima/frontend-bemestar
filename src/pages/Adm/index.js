import React, { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import 'mdbreact/dist/css/mdb.css';

import api from '~/services/api';

import { Container, Box, Appointment, Shadow } from './styles';

export default function Adm() {
  const profile = useSelector(state => state.user.profile);

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
      {profile.id === 17 && (
        <>
          <Box>
            <Shadow>
              <strong>
                {quantity.numdaily}
                <span>Hoje</span>
              </strong>
            </Shadow>
            <Shadow>
              <strong>
                {quantity.numappointments}
                <span>Agendamentos</span>
              </strong>
            </Shadow>
            <Shadow>
              <strong>
                {quantity.numusers}
                <span>Clientes</span>
              </strong>
            </Shadow>
            <Shadow>
              <strong>
                {quantity.numproviders}
                <span>Serviços</span>
              </strong>
            </Shadow>
          </Box>

          <Appointment>
            Todos os agendamentos:
            <MDBDataTable striped bordered hover data={data} />
          </Appointment>
        </>
      )}
    </Container>
  );
}
