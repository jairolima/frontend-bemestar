/* eslint-disable eqeqeq */
import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useParams, Link } from 'react-router-dom';
import api from '~/services/api';
import { Container, Time, Background, Margin } from './styles';

export default function SelectDateTime() {
  const [date, setDate] = useState(new Date());

  const [hours, setHours] = useState([]);
  const { providerId, providerName } = useParams();

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${providerId}/available`, {
        params: {
          date: date.getTime(),
        },
      });

      // console.tron.log(response.data);

      setHours(response.data);
    }
    loadAvailable();
  }, [date, providerId]);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  // REGRA
  const weekday = date.getDay();

  return (
    <Background>
      <Margin />
      <Container>
        <header>
          <button type="button">
            <MdChevronLeft size={26} color="FFF" onClick={handlePrevDay} />
          </button>
          <strong>{dateFormatted}</strong>
          <button type="button">
            <MdChevronRight size={26} color="FFF" onClick={handleNextDay} />
          </button>
        </header>
        {/* <strong>{JSON.stringify(date.getTime())}</strong> */}
        <strong>{weekday == 0 ? <h3>Domingo</h3> : ''}</strong>
        <strong>{weekday == 1 ? <h3>Segunda-Feira</h3> : ''}</strong>
        <strong>{weekday == 2 ? <h3>Terça-feira</h3> : ''}</strong>
        <strong>{weekday == 3 ? <h3>Quarta-feira</h3> : ''}</strong>
        <strong>{weekday == 4 ? <h3>Quinta-feira</h3> : ''}</strong>
        <strong>{weekday == 5 ? <h3>Sexta-feira</h3> : ''}</strong>
        <strong>{weekday == 6 ? <h3>Sábado</h3> : ''}</strong>
        {/* {JSON.stringify(hours)} */}
        <ul style={{ marginBottom: '120px' }}>
          {hours.map(time => (
            <Link
              className={!time.avaiable ? 'disabled-link' : ''}
              to={
                time.avaiable
                  ? `/confirm/${time.value}/${providerId}/${providerName}`
                  : ``
              }
            >
              <Time data={hours} avaiable={!time.avaiable} key={time.time}>
                <strong>{time.time}</strong>
                <span>{time.avaiable ? 'Disponível' : 'Indisponível'}</span>
              </Time>
            </Link>
          ))}
        </ul>
      </Container>
    </Background>
  );
}
