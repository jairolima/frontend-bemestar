/* eslint-disable no-shadow */
import React from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';


import { Confirmation } from './styles';


export default function WhatsappCancel() {
  const { bookingId } = useParams();

  async function handleSubmit({ bookingId }) {
    const data = {
      bookingId: atob(bookingId),
      confirmed: 'Cancelado',
    };

try {

  await api.put('confirmation', data);
  toast.success('Agendamento cancelado!');
  history.push('/wz/confirmation/false');
} catch {
  toast.error('Erro!');
}

  }

  return (
<>

<Confirmation>
<Card>
  <Card.Header as="h5">Confirmação</Card.Header>
  <Card.Body>
    <Card.Title>Clique no botão abaixo para cancelar</Card.Title>
    {/* <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text> */}
    <Form onSubmit={handleSubmit}>
   <Input name="bookingId" type="hidden" value={bookingId} />
    <Button variant="success" type="submit">Cancelar agendamento</Button>
 </Form>
  </Card.Body>
</Card>
</Confirmation>

</>
  );
}
