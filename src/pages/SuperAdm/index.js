/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
// import { MDBDataTable } from 'mdbreact';
import 'bootstrap-css-only/css/bootstrap.min.css';
import MUIDataTable from 'mui-datatables';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { Bar } from 'react-chartjs-2';
import 'mdbreact/dist/css/mdb.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { updateBookingRequest } from '~/store/modules/user/actions';

import api from '~/services/api';

import { Appointment, Shadow, Login } from './styles';

export default function SuperAdm() {
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
    'Compareceu',
    'Confirmou',
    'Pagamento',
    'Descrição',
    'Recepcionista',
  ];

  const datarows = allappointments.rows;

  const [show, setShow] = useState(false);
  const [currentRowData, setCurrentRowData] = useState('');
  const [currentTableData, setCurrentTableData] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleEdit(par1) {
    setCurrentRowData(par1);
    handleShow();
  }

  function handleTableData(par1) {
    setCurrentTableData(par1);
  }

  const options = {
    elevation: '0',
    selectableRows: false,
    onRowClick: rowData => {
      handleEdit(rowData);
    },
    onRowsDelete: 'false',
    customToolbarSelect: () => {},
    onTableInit: tableData => {
      handleTableData(tableData);
    },
  };

  function handleSubmit2(data) {
    const { Pagamento, Recepcionista, id } = data;
    dispatch(updateBookingRequest(Pagamento, Recepcionista, id));
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = data => handleSubmit2(data);

  const datachart = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar agendamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
      {profile.id === 2 && (
        <>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs="3" lg="3" style={{ backgroundColor: 'transparent' }}>
                <Shadow>
                  <strong>
                    {quantity.numdaily}
                    <span>Serviços</span>
                  </strong>
                </Shadow>
              </Col>
              <Col xs="3" lg="3" style={{ backgroundColor: 'transparent' }}>
                <Shadow>
                  <strong>
                    {quantity.numappointments}
                    <span>Serviços</span>
                  </strong>
                </Shadow>
              </Col>
              <Col xs="3" lg="3" style={{ backgroundColor: 'transparent' }}>
                <Shadow>
                  <strong>
                    {quantity.numusers}
                    <span>Serviços</span>
                  </strong>
                </Shadow>
              </Col>
              <Col xs="3" lg="3" style={{ backgroundColor: 'transparent' }}>
                <Shadow>
                  <strong>
                    {quantity.numproviders}
                    <span>Serviços</span>
                  </strong>
                </Shadow>
              </Col>
            </Row>
          </Container>
          <strong>{JSON.stringify(currentTableData)}</strong>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs="6" lg="6" style={{ backgroundColor: 'transparent' }}>
                <Bar
                  data={datachart}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </Col>
              <Col xs="6" lg="6" style={{ backgroundColor: 'transparent' }}>
                <Bar
                  data={datachart}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </Col>
            </Row>
          </Container>

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
