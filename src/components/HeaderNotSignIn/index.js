/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import InputMask from 'react-input-mask';
import Medicine from '~/assets/medicine.svg';
import { signUpRequest, signInRequest } from '~/store/modules/auth/actions';

// import Lottie from 'react-lottie';

import logo from '~/assets/logo-purple.svg';

import { Login } from './styles';

const schema = Yup.object().shape({
  phone: Yup.string().required('O Telefone é obrigatório'),
  password_hash: Yup.string().required('A Senha é obrigatória'),
});

const schemaRegister = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  password_hash: Yup.string().required('O CPF é obrigatório'),
  phone: Yup.string()
    .required('O telefone é obrigatorio')
    .min(8, 'Telefone deve ter pelo menos 8 digitos')
    .max(16, 'Telefone deve ter no maximo 12 digitos'),
  email: Yup.string().email('Insira um email válido'),
});

export default function HeaderNotSignIn() {
  const [scrollY, setScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [register, setRegister] = useState('login');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ phone, password_hash }) {
    dispatch(signInRequest(phone, password_hash));
  }

  function handleRegisterSubmit({ name, phone, email, password_hash }) {
    dispatch(signUpRequest(name, phone, email, password_hash));
  }

  function btnSignIn() {
    setOpen(true);
    setRegister('login');
  }

  function btnRegister() {
    setOpen(true);
    setRegister('register');
  }

  function logit() {
    setScrollY(window.pageYOffset);
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener('scroll', logit);
    };
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{ height: 220, backgroundColor: '#fff' }}
          closeButton
        >
          <Container>
            <Modal.Title style={{ color: '#000' }}>Novo aqui?</Modal.Title>
            <Row
              style={{ marginTop: '10px', marginBottom: '10px' }}
              className="justify-content-md-center"
            >
              <Col
                lg="6"
                xs="6"
                style={{ backgroundColor: 'transparent', marginTop: '35px' }}
              >
                <h4 style={{ color: '#000' }}>
                  Nós cuidamos do seu Bem Estar!
                </h4>
              </Col>
              <Col lg="6" xs="6" style={{ backgroundColor: 'transparent' }}>
                <img
                  width="100%"
                  height="100%"
                  src={Medicine}
                  alt="Policlinica BemEstar"
                />
              </Col>
            </Row>
          </Container>
          {/* <Lottie height={400} width={400} /> */}
        </Modal.Header>
        <Modal.Body style={{ margin: 0, padding: 0 }}>
          <Collapse in={open}>
            {register === 'login' ? (
              <Login>
                <Form schema={schema} onSubmit={handleSubmit}>
                  <InputMask mask="(99)99999-9999">
                    {() => <Input name="phone" placeholder="Seu telefone" />}
                  </InputMask>
                  <InputMask mask="999.999.999-99">
                    {() => <Input name="password_hash" placeholder="Seu CPF" />}
                  </InputMask>
                  <Button
                    className="shadow-none"
                    variant="success"
                    type="submit"
                  >
                    {loading ? 'Carregando...' : 'Acessar'}
                  </Button>
                </Form>
              </Login>
            ) : (
              <Login>
                <Form schema={schemaRegister} onSubmit={handleRegisterSubmit}>
                  <InputMask mask="(99)99999-9999">
                    {() => <Input name="phone" placeholder="Seu telefone *" />}
                  </InputMask>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Nome completo *"
                  />
                  <InputMask mask="999.999.999-99">
                    {() => (
                      <Input
                        name="password_hash"
                        placeholder="000.000.000-00 *"
                      />
                    )}
                  </InputMask>
                  <Input name="email" type="email" placeholder="Seu e-mail" />
                  <Button
                    className="shadow-none"
                    variant="success"
                    type="submit"
                  >
                    Criar conta
                  </Button>
                </Form>
              </Login>
            )}
          </Collapse>
        </Modal.Body>
        <Modal.Footer
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            style={{
              borderRadius: 20,
              borderWidth: 2,
              borderColor: '#000',
              width: 150,
            }}
            variant="success"
            onClick={() => btnSignIn()}
            aria-controls="example-collapse-text"
          >
            Entrar
          </Button>
          <Button
            style={{
              borderRadius: 20,
              borderWidth: 2,
              borderColor: '#000',
              width: 150,
            }}
            variant="success"
            onClick={() => btnRegister()}
            aria-controls="example-collapse-text"
          >
            Cadastro
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar
        fixed="top"
        className={scrollY > 20 ? 'shadow-sm' : 'shadow-none'}
        collapseOnSelect
        expand="lg"
        bg={scrollY > 40 ? 'white' : 'transparent'}
      >
        <Navbar.Brand href="/">
          <img src={logo} width="32px" height="32px" alt="BemEstar" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              style={{
                fontWeight: 'bold',
                fontSize: '22px',
                color: 'green',
              }}
              href="/"
            >
              <strong
                style={{
                  fontFamily:
                    'Gordita, -apple-system, system-ui, "Segoe UI", Roboto, sans-serif',
                }}
              >
                CENTRAL DE AGENDAMENTOS
              </strong>
            </Nav.Link>
            <Navbar.Text
              style={{
                fontSize: '22px',
                color: 'black',
              }}
            >
              <i
                style={{
                  fontFamily:
                    'Gordita, -apple-system, system-ui, "Segoe UI", Roboto, sans-serif',
                }}
              >
                <span>/</span> Atendimento em horário comercial via chat
              </i>
            </Navbar.Text>
          </Nav>
          <Nav>
            <div>
              <Button
                style={{ borderRadius: 15 }}
                className="shadow-none"
                variant="outline-success"
                size="sm"
                onClick={handleShow}
              >
                <strong>Entrar</strong>
              </Button>{' '}
              <Button
                style={{ borderRadius: 15 }}
                className="shadow-none"
                variant="success"
                size="sm"
                onClick={handleShow}
              >
                <strong>Cadastre-se aqui</strong>
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* <Container>
        <Content>
          <nav>
            <img src={logo} width="64px" height="64px" alt="BemEstar" />
            <Link to="/">AGENDAMENTO</Link>
          </nav>

          <aside>
            <Profile>
              <div>
                <strong>Olá, visitante</strong>
                <Link onClick={handleShow}>Entrar / Criar conta</Link>
              </div>
            </Profile>
          </aside>
        </Content>
      </Container> */}
    </>
  );
}
