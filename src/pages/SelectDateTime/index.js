import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useParams, Link } from 'react-router-dom';
import api from '~/services/api';
import { Container, Time } from './styles';

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

  return (
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
      <ul>
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
  );
}
