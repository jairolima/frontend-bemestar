import React, { useState, useEffect } from 'react';
// import { MDBDataTable } from 'mdbreact';
import 'bootstrap-css-only/css/bootstrap.min.css';
import MUIDataTable from 'mui-datatables';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { updateBookingRequest } from '~/store/modules/user/actions';
import whatsapp from '~/assets/whatsapp.svg';

import 'mdbreact/dist/css/mdb.css';

import api from '~/services/api';

import { Container, Box, Appointment, Shadow, Login, Whatsapp } from './styles';

export default function Adm() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  const [allappointments, setAllappointments] = useState([]);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    async function loadQuantity() {
      const response = await api.get('quantityappointments');

      setQuantity(response.data);
    }

    loadQuantity();
  }, []);

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('allappointments');

      setAllappointments(response.data);
    }

    loadAppointments();
  }, []);

  const columns = [
    'ID',
    'Cliente',
    'Prestador',
    'Data',
    'CPF',
    'Telefone',
    'Filtro',
    'Preço',
    'Plano',
    'Confirmou',
    'Compareceu',
    'Pagamento',
    'Descrição',
    'Recepcionista',
    'Desconto',
    'Comissão'
  ];

  const datarows = allappointments.rows;

  const [show, setShow] = useState(false);
  const [currentRowData, setCurrentRowData] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleEdit(par1) {
    setCurrentRowData(par1);
    handleShow();
  }

  const options = {
    elevation: '0',
    selectableRows: false,
    onRowClick: rowData => {
      handleEdit(rowData);
    },
    onRowsDelete: 'false',
    customToolbarSelect: () => {},
  };

  function handleSubmit2(data) {
    const { Pagamento, Recepcionista, id } = data;
    dispatch(updateBookingRequest(Pagamento, Recepcionista, id));
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = data => handleSubmit2(data);

  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar agendamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Whatsapp>
            <a href={`https://api.whatsapp.com/send?phone=55${parseInt(String(currentRowData[5]).replace(/[^0-9]/g, ''), 10)}&text=Oi ${currentRowData[1]}, este é um lembrete que você tem uma consulta com ${currentRowData[2]} para ${currentRowData[3]}, *Clique neste link para confirmar:* https://agenda.policlinicabemestar.com/wz/confirm/${btoa(currentRowData[0])} Ou neste link para cancelar: https://agenda.policlinicabemestar.com/wz/cancel/${btoa(currentRowData[0])}`} rel="noopener noreferrer" target="_blank">

          <img
                width="35%"
                height="35%"
                src={whatsapp}
                alt="Policlinica BemEstar"
              />
              </a>
          </Whatsapp>
          <Login>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                required
                type="hidden"
                value={currentRowData[0]}
                name="id"
                ref={register}
              />
              <select required name="Pagamento" ref={register}>
                <option disabled selected value="">
                  {' '}
                  -- Pagamento --{' '}
                </option>
                <option value="DINHEIRO">Dinheiro</option>
                <option value="CRÉDITO">Crédito</option>
                <option value="DEBITO">Debito</option>
              </select>
              <br />
              <br />
              <select required name="Recepcionista" ref={register}>
                <option value="" disabled selected>
                  {' '}
                  -- Recepcionista --{' '}
                </option>
                <option value="Thaís">Thaís</option>
                <option value="Bruna">Bruna</option>
                <option value="Mozielle">Mozielle</option>
              </select>
              <br />
              <br />
              <Button className="shadow-none" variant="success" type="submit">
                Salvar mudanças
              </Button>
            </form>
          </Login>
        </Modal.Body>
      </Modal>
      {profile.id === 17 && (
        <>
          <Box>
            <Shadow>
              <strong>
                {quantity.numdaily}
                <span>Hoje</span>
              </strong>
            </Shadow>
            <Shadow>
              <strong>
                {quantity.numappointments}
                <span>Agendamentos</span>
              </strong>
            </Shadow>
            <Shadow>
              <strong>
                {quantity.numusers}
                <span>Clientes</span>
              </strong>
            </Shadow>
            <Shadow>
              <strong>
                {quantity.numproviders}
                <span>Serviços</span>
              </strong>
            </Shadow>
          </Box>

          <Appointment>
            {/* <MDBDataTable striped bordered hover data={data} /> */}
            <MUIDataTable
              title="Todos os agendamentos:"
              data={datarows}
              columns={columns}
              options={options}
            />
          </Appointment>
        </>
      )}
    </Container>
  );
}
