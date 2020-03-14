import React, { useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
// import history from '~/services/history';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { Container } from './styles';

export default function Confirm() {
  const { providerId, time, providerName } = useParams();

  const history = useHistory();

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: providerId,
      date: time,
    });
    toast.sucess('Agendamento efetuado com sucesso!');
    history.push('/booking');
  }

  return (
    <Container>
      <div>
        <strong>
          Você deseja agendar {providerName} para {dateFormatted}, com o
          profissional {providerId}?
        </strong>

        <form onSubmit={handleAddAppointment}>
          <button type="submit">Sim</button>
        </form>
      </div>
    </Container>
  );
}
