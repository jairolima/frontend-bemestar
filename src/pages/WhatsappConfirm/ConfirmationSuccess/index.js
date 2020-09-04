/* eslint-disable no-shadow */
import React from 'react';
import { Card } from 'react-bootstrap';
import { Confirmation } from './styles';

export default function ConfirmationSuccess() {
  return (
<>

<Confirmation>
<Card>
  <Card.Header as="h5">Confirmação</Card.Header>
  <Card.Body>
    <Card.Title>Obrigado por confirmar o seu agendamento!</Card.Title>
    {/* <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text> */}
  </Card.Body>
</Card>
</Confirmation>
</>
  );
}
