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
import { useSelector } from 'react-redux';
import { utcToZonedTime } from 'date-fns-tz';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';
import { Container, Time, Background, Margin } from './styles';

export default function Dashboard() {
  const doctor = useSelector(state => state.user.doctor);
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  const range = useMemo(() => {
    const { mon, tue, wed, thu, fri, sat, sun } = doctor;

    const weekday = date.getDay();

    // function that returns the day to search in find doctor
    function myWeekDay() {
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

    function checkEmpty() {
      const emptyenum = '000:000';
      if (myWeekDay() === '') {
        return emptyenum;
      }
      return myWeekDay();
    }

    // converting string from doctor persist to an array
    return Array.from(checkEmpty().split(','));
  }, [date, doctor]);

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map(time => {
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
  }, [date, range]);

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
        <p>{doctor.mon}</p>
        <header>
          <button type="button">
            <MdChevronLeft size={36} color="FFF" onClick={handlePrevDay} />
          </button>
          <strong>{dateFormatted}</strong>
          <button type="button">
            <MdChevronRight size={36} color="FFF" onClick={handleNextDay} />
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
                <strong>vazio</strong>
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
