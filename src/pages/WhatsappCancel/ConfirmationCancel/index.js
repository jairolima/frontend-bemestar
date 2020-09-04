/* eslint-disable no-shadow */
import React from 'react';
import { Card } from 'react-bootstrap';
import { Confirmation } from './styles';

export default function ConfirmationCancel() {
  return (
<>

<Confirmation>
<Card>
  <Card.Header as="h5">Confirmação</Card.Header>
  <Card.Body>
    <Card.Title>Cancelamento efetuado!</Card.Title>
    {/* <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text> */}
  </Card.Body>
</Card>
</Confirmation>
</>
  );
}
