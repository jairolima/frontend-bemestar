import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Container } from './styles';
import history from '~/services/history';

import { updateProfileBooking } from '~/store/modules/user/actions';

export default function Confirm() {
  const { providerId, time, providerName } = useParams();

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  const dispatch = useDispatch();

  function handleSubmit({ date, provider_id }) {
    dispatch(updateProfileBooking(date, provider_id));
  }

  function redirectSubmit() {
    history.push('/booking');
  }

  return (
    <Container>
      <div>
        <strong>
          Você deseja agendar {providerName} para {dateFormatted}?
        </strong>

        <Form onSubmit={handleSubmit}>
          <Input name="date" type="hidden" value={time} />
          <Input name="provider_id" type="hidden" value={providerId} />
          <button type="submit">Sim</button>
          <button
            onClick={redirectSubmit}
            style={{ backgroundColor: '#fb6f91' }}
            type="submit"
          >
            Não
          </button>
        </Form>
      </div>
    </Container>
  );
}
