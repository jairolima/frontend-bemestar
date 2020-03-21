import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';
import { Container } from './styles';

export default function Confirm() {
  const { providerId, time, providerName } = useParams();

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  // - redirecionamento funcionando
  function redirectWorking() {
    history.push('/booking');
  }

  async function handleAddAppointment() {
    try {
      await api
        .post('appointments', {
          provider_id: providerId,
          date: time,
        })
        .then(response => {
          // - redirecionamento nao funciona
          toast.success('Confirmado o agendamento!');
          history.push('/booking');
          return response;
        });
    } catch (err) {
      toast.error('Horario invalido!');
    }
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

        <form onSubmit={redirectWorking}>
          <button type="submit">Redirecionar</button>
        </form>
      </div>
    </Container>
  );
}
