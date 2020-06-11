import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import { useSelector } from 'react-redux';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';
import { Container, Time, Margin, Background } from './styles';

export default function Dashboard() {
  const doctor = useSelector(state => state.user.doctor);
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );
  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const { mon, tue, wed, thu, fri, sat, sun } = doctor;

      const weekday = date.getDay();

      // function that returns the day to search in find doctor
      function myweekday() {
        switch (weekday) {
          case 0:
            return sun;
          case 1:
            return mon;
          case 2:
            return tue;
          case 3:
            return wed;
          case 4:
            return thu;
          case 5:
            return fri;
          case 6:
            return sat;
          default:
            break;
        }
        return null;
      }

      function checkempty() {
        const emptyenum = '000:000';
        if (myweekday() === '') {
          return emptyenum;
        }
        return myweekday();
      }

      // converting string from doctor persist to an array
      const array = Array.from(checkempty().split(','));

      const data = array.map(time => {
        const [hour, minute] = time.split(':');
        const checkDate = setSeconds(
          setMinutes(setHours(date, hour), minute),
          0
        );
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:${minute}h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(
            a => parseISO(a.date).toString() === compareDate.toString()
          ),
        };
      });

      setSchedule(data);
    }

    loadSchedule();
  }, [date, doctor]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

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

        <ul>
          {schedule.map(time => (
            <Time
              key={time.time}
              past={time.past}
              available={!time.appointment}
            >
              {time.time === '000:000h' ? (
                <>
                  <strong>Atendimento</strong>
                  <span>Indisponivel</span>
                </>
              ) : (
                <>
                  <strong>{time.time}</strong>
                  <span>
                    {time.appointment
                      ? time.appointment.user.name
                      : 'Em aberto'}
                  </span>
                </>
              )}
            </Time>
          ))}
        </ul>
      </Container>
    </Background>
  );
}
