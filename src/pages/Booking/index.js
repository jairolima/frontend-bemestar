import React from 'react';
import { Container } from './styles';
import Worker from '~/components/Worker';
// import api from '~/services/api';

export default function Booking() {
  // const [appointments, setAppointments] = useState([]);

  // useEffect(() => {
  //   async function loadAppointments() {
  //     const response = await api.get('appointments');

  //     setAppointments(response.data);
  //   }

  //   loadAppointments();
  // }, []);

  return (
    <Container>
      <div>
        <Worker />
      </div>
    </Container>
  );
}
