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
            {quantity.numusers}
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

      <div style={{ color: '#fff', marginTop: '40px' }}>
        <strong>Notas atualizacao (1.0.6):</strong>
        <ul>
          <li>- Adicionado dia da semana ao listar horarios</li>
          <li>
            - Mudança horario ultrassonografia 8:00 às 12:00 de 15 em 15min
          </li>
          <li>
            - Mudança nos horarios de todos os serviços 07:00 às 12:00 de 20 em
            20 min excluindo sabados e domingos
          </li>
          <li>- Adicionado Gastroenterologista e Pediatra</li>
          <li>
            - Adicionado mensagem de agenda nao disponivel caso o servico nao
            estiver disponivel na data pesquisada
          </li>
          <li>- Correcao bug listagem agendamentos em vigor</li>
          <li>- Alteracao cor botao voltar agendamento</li>
        </ul>
      </div>
    </Container>
  );
}
