/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
// import { subDays, addDays } from 'date-fns';
// import { Link } from 'react-router-dom';
// import pt from 'date-fns/locale/pt';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AnchorLink from 'react-anchor-link-smooth-scroll';
// import { toast } from 'react-toastify';

// import Lottie from 'react-lottie';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { renderToStaticMarkup } from 'react-dom/server';
import BackgroundSVG from './backgroundSVG';
import doctors from '~/assets/doctors.svg';
import whatsapp from '~/assets/whatsapp.svg';
// import { Form, Input } from '@rocketseat/unform';
// import history from '~/services/history';
// import animationData from '~/assets/doctor.json';
import Lazy from '~/components/Lazy';
import { updateProfileBooking } from '~/store/modules/user/actions';
import { groupedOptions } from './data';

import HeaderNotSignIn from '~/components/HeaderNotSignIn';
import Testimonials from '~/components/Testimonials';

import FooterBE from '~/components/Footer';
import api from '~/services/api';
// import logo from '~/assets/logo-purple.svg';
import { Time, PulsingBtn } from './styles';

function Worker() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  // const [date, setDate] = useState(new Date());
  const [userId, setUserId] = useState(4);

  const [currentModalTime, setCurrentModalTime] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentProviderId, setCurrentProviderId] = useState('');

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState('Clinico Geral');

  const [providers, setProviders] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  // const container = useRef(null);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');

      // const results = Object.values(response.data);
      const results = response.data;

      // Map with an api consulting async
      const asyncRes = await Promise.all(
        results.map(async i => {
          const slot1 = await api.get(`providers/${i.user.id}/available`, {
            params: {
              date: new Date().getTime(),
            },
          });
          const slot2 = await api.get(`providers/${i.user.id}/available`, {
            params: {
              date: new Date(new Date().getTime() + 86400000).getTime(),
            },
          });
          const slot3 = await api.get(`providers/${i.user.id}/available`, {
            params: {
              date: new Date(new Date().getTime() + 172800000).getTime(),
            },
          });
          const slot4 = await api.get(`providers/${i.user.id}/available`, {
            params: {
              date: new Date(new Date().getTime() + 259200000).getTime(),
            },
          });
          return {
            specialty: i.specialty,
            crm: i.crm,
            date: new Date(),
            user: i.user,
            slot1,
            slot2,
            slot3,
            slot4,
          };
        })
      );

      // console.tron.log(asyncRes);

      setProviders(asyncRes);
    }

    loadProviders();
  }, []);

  // handle onChange event of the dropdown
  const handleChange = e => {
    setSelectedValue(e.value);
  };

  async function handleBeforeDays(par1) {
    const before = new Date(par1.date.getTime() - 345600000);
    // console.tron.log(par1.date);
    const newProviders = await Promise.all(
      providers.map(async provider =>
        provider.user.id !== par1.user.id
          ? provider
          : {
              specialty: provider.specialty,
              crm: provider.crm,
              date: new Date(par1.date.getTime() - 345600000),
              user: provider.user,
              slot1: await api.get(`providers/${par1.user.id}/available`, {
                params: {
                  date: new Date(before.getTime()).getTime(),
                },
              }),
              slot2: await api.get(`providers/${par1.user.id}/available`, {
                params: {
                  date: new Date(before.getTime() + 86400000).getTime(),
                },
              }),
              slot3: await api.get(`providers/${par1.user.id}/available`, {
                params: {
                  date: new Date(before.getTime() + 172800000).getTime(),
                },
              }),
              slot4: await api.get(`providers/${par1.user.id}/available`, {
                params: {
                  date: new Date(before.getTime() + 86400000 * 3).getTime(),
                },
              }),
            }
      )
    );

    setProviders(newProviders);

    // console.tron.log(newProviders);
    // console.tron.log(currentFilter);
  }

  async function handleNextDays(par1) {
    const after = new Date(par1.date.getTime() + 345600000);
    const newProviders = await Promise.all(
      providers.map(async provider =>
        provider.user.id !== par1.user.id
          ? provider
          : {
              specialty: provider.specialty,
              crm: provider.crm,
              date: new Date(par1.date.getTime() + 345600000),
              user: provider.user,
              slot1: await api.get(`providers/${par1.user.id}/available`, {
                params: {
                  date: new Date(after.getTime()).getTime(),
                },
              }),
              slot2: await api.get(`providers/${par1.user.id}/available`, {
                params: {
                  date: new Date(after.getTime() + 86400000).getTime(),
                },
              }),
              slot3: await api.get(`providers/${par1.user.id}/available`, {
                params: {
                  date: new Date(after.getTime() + 172800000).getTime(),
                },
              }),
              slot4: await api.get(`providers/${par1.user.id}/available`, {
                params: {
                  date: new Date(after.getTime() + 86400000 * 3).getTime(),
                },
              }),
            }
      )
    );

    setProviders(newProviders);

    // console.tron.log(newProviders);
    // console.tron.log(currentFilter);
  }

  function show() {
    if (userId === 99) {
      setUserId(4);
    } else {
      setUserId(99);
    }
  }

  function handleContentModal(par1, par2) {
    setCurrentModalTime(par1.value);
    setCurrentUserName(par2.user.name);
    setCurrentProviderId(par2.user.id);
    setShowModal(true);
  }

  function handleUnSignedContentModal() {
    setShowModal(true);
  }

  const signed = useSelector(state => state.auth.signed);
  const animatedComponents = makeAnimated();

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice',
  //   },
  // };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      // background: '#f9f9f9',
      height: 40,
      borderRadius: '40px',
      // match with the menu
      // borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
      // Overwrittes the different states of border
      // borderColor: state.isFocused ? 'yellow' : 'green',
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? '#00c851' : '#00c851',
      },
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
  };

  const dispatch = useDispatch();

  function redirectSubmit(par1, par2, par3) {
    const date = par1;
    const provider_id = par2;
    const filter = par3;
    const description = isChecked ? 'Retorno' : '';
    dispatch(updateProfileBooking(date, provider_id, description, filter));
    // toast.success('Clicou');
    // history.push('/profile');
  }

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };

  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  const svgString = encodeURIComponent(renderToStaticMarkup(<BackgroundSVG />));

  return (
    <>
      {signed ? '' : <HeaderNotSignIn />}

      <h2
        style={{
          backgroundImage: `url("data:image/svg+xml,${svgString}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        <Container style={{ paddingTop: 200 }}>
          <Row>
            <Col md="7" xs="12">
              <h1
                style={{
                  fontFamily:
                    'Gordita, -apple-system, system-ui, "Segoe UI", Roboto, sans-serif',
                  fontWeight: 'bold',
                  color: '#00c851',
                  fontSize: '56px',
                }}
              >
                Agende sua consulta
              </h1>
              <h1
                style={{
                  fontFamily:
                    'Gordita, -apple-system, system-ui, "Segoe UI", Roboto, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '56px',
                  marginTop: '-10px',
                }}
              >
                pode ser fácil, acredite!
              </h1>
              <h4 style={{ marginTop: '30px', marginBottom: '50px' }}>
                São mais de 20 especialidades médicas e exames diferentes, com
                preços acessíveis!.
              </h4>

              <AnchorLink offset={() => 100} href="#filters">
                <PulsingBtn>
                  <span style={{ color: '#fff' }}>Experimente agora</span>
                </PulsingBtn>
              </AnchorLink>
            </Col>
            <Col md="5" xs="0">
              {/* <Lottie options={defaultOptions} height="100%" width="100%" /> */}
              <img
                width="100%"
                height="100%"
                src={doctors}
                alt="Policlinica BemEstar"
              />
            </Col>
          </Row>
        </Container>
      </h2>

      <Container>
        <Row
          style={{ marginTop: '100px' }}
          className="justify-content-md-center"
        >
          <Col xs="2" lg="2">
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <section id="filters">
                <h4>Filtre por:</h4>
              </section>
            </div>
          </Col>
          <Col xs="10" lg="10">
            <Select
              styles={customStyles}
              placeholder="Especialidades ou exames... Ex: Clinico Geral"
              components={animatedComponents}
              formatGroupLabel={formatGroupLabel}
              isSearchable
              value={groupedOptions.find(obj => obj.value === selectedValue)} // set selected value
              options={groupedOptions} // set list of the data
              onChange={handleChange} // assign onChange function
            />
          </Col>
        </Row>
      </Container>

      <div
        style={{
          backgroundColor: '#f7faff',
          width: '100%',
          marginTop: '100px',
        }}
      >
        <Container>
          <Row className="justify-content-md-center">
            <Col
              xs="12"
              lg="8"
              md="8"
              style={{
                marginTop: '50px',
                marginBottom: '-50px',
              }}
            >
              Você encontrou{' '}
              <strong>
                {
                  providers.filter(provider =>
                    provider.specialty.includes(selectedValue)
                  ).length
                }
              </strong>{' '}
              resultado(s) para {selectedValue}
            </Col>
          </Row>
        </Container>

        {providers.length === 0 ? (
          <>
            <Container>
              <Row className="justify-content-md-center">
                <Col
                  xs="12"
                  lg="8"
                  md="8"
                  style={{
                    marginTop: '100px',
                  }}
                >
                  <Lazy />
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <>
            {providers
              .filter(provider => provider.specialty.includes(selectedValue))
              .map(provider => (
                <>
                  <Container>
                    <Row className="justify-content-md-center">
                      <Col
                        xs="12"
                        lg="8"
                        md="8"
                        className="shadow"
                        style={{
                          backgroundColor: 'white',
                          marginTop: '100px',
                          borderRadius: '12px',
                        }}
                      >
                        <Row className="justify-content-md-center">
                          <Col
                            xs="12"
                            lg="3"
                            style={{ backgroundColor: 'transparent' }}
                          >
                            <div
                              style={{
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '10px',
                              }}
                            >
                              <img
                                style={{
                                  width: '40%',
                                  borderRadius: '50%',
                                  margin: '10px',
                                }}
                                alt="avatar"
                                variant="top"
                                src={
                                  (provider.user.avatar &&
                                    provider.user.avatar.url) ||
                                  `https://api.adorable.io/avatars/50/abott@adorable.png`
                                }
                              />
                              <h6>{provider.user.name}</h6>
                              <strong>{provider.crm}</strong>
                            </div>
                          </Col>
                          <Col
                            xs="12"
                            lg="9"
                            style={{ backgroundColor: 'transparent' }}
                          >
                            <Row className="justify-content-md-center">
                              <Col
                                xs="2"
                                lg="2"
                                style={{
                                  backgroundColor: 'transparent',
                                  textAlign: 'right',
                                  marginTop: '20px',
                                }}
                              >
                                <button
                                  style={{
                                    border: '0',
                                    background: 'transparent',
                                  }}
                                  type="button"
                                >
                                  <MdChevronLeft
                                    size={26}
                                    color="000"
                                    onClick={() => handleBeforeDays(provider)}
                                  />
                                </button>
                              </Col>
                              <Col
                                xs="2"
                                lg="2"
                                style={{
                                  padding: '1%',
                                  backgroundColor: 'transparent',
                                  textAlign: 'center',
                                }}
                              >
                                <ul>
                                  <Time
                                    style={{
                                      background: 'transparent',
                                      flexDirection: 'column',
                                    }}
                                  >
                                    <strong
                                      style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      {provider.date.setHours(0, 0, 0, 0) ===
                                      new Date().setHours(0, 0, 0, 0) ? (
                                        'Hoje'
                                      ) : (
                                        <>
                                          {provider.date.getDay() === 0
                                            ? 'Dom'
                                            : ''}
                                          {provider.date.getDay() === 1
                                            ? 'Seg'
                                            : ''}
                                          {provider.date.getDay() === 2
                                            ? 'Ter'
                                            : ''}
                                          {provider.date.getDay() === 3
                                            ? 'Qua'
                                            : ''}
                                          {provider.date.getDay() === 4
                                            ? 'Qui'
                                            : ''}
                                          {provider.date.getDay() === 5
                                            ? 'Sex'
                                            : ''}
                                          {provider.date.getDay() === 6
                                            ? 'Sáb'
                                            : ''}
                                        </>
                                      )}
                                    </strong>
                                    <strong style={{ color: '#000' }}>
                                      {provider.date.getDate()}/
                                      {provider.date.getMonth() + 1}
                                    </strong>
                                  </Time>
                                  {provider.slot1.data
                                    .slice(0, userId)
                                    .map(time => (
                                      <>
                                        {!time.avaiable ? (
                                          <>
                                            <Time
                                              data={provider.slot1.data}
                                              avaiable={!time.avaiable}
                                            >
                                              <strong>{time.time}</strong>
                                            </Time>
                                            {time.time === '00:00' ? (
                                              <>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                              </>
                                            ) : (
                                              ''
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {signed ? (
                                              <Link>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                  onClick={() =>
                                                    handleContentModal(
                                                      time,
                                                      provider
                                                    )
                                                  }
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                              </Link>
                                            ) : (
                                              <>
                                                <Link>
                                                  <Time
                                                    data={provider.slot1.data}
                                                    avaiable={!time.avaiable}
                                                    onClick={() =>
                                                      handleUnSignedContentModal()
                                                    }
                                                  >
                                                    <strong>{time.time}</strong>
                                                  </Time>
                                                </Link>
                                              </>
                                            )}
                                          </>
                                        )}
                                      </>
                                    ))}
                                </ul>
                              </Col>
                              <Col
                                xs="2"
                                lg="2"
                                style={{
                                  padding: '1%',
                                  backgroundColor: 'transparent',
                                  textAlign: 'center',
                                }}
                              >
                                <ul>
                                  <Time
                                    style={{
                                      background: 'transparent',
                                      flexDirection: 'column',
                                    }}
                                  >
                                    {/* Converte em dia da semana  */}
                                    <strong
                                      style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      <>
                                        {new Date(
                                          provider.date.getTime() + 1 * 86400000
                                        ).getDay() === 0
                                          ? 'Dom'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 1 * 86400000
                                        ).getDay() === 1
                                          ? 'Seg'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 1 * 86400000
                                        ).getDay() === 2
                                          ? 'Ter'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 1 * 86400000
                                        ).getDay() === 3
                                          ? 'Qua'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 1 * 86400000
                                        ).getDay() === 4
                                          ? 'Qui'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 1 * 86400000
                                        ).getDay() === 5
                                          ? 'Sex'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 1 * 86400000
                                        ).getDay() === 6
                                          ? 'Sáb'
                                          : ''}
                                      </>
                                    </strong>
                                    <strong style={{ color: '#000' }}>
                                      {new Date(
                                        provider.date.getTime() + 1 * 86400000
                                      ).getDate()}
                                      /
                                      {new Date(
                                        provider.date.getTime() + 1 * 86400000
                                      ).getMonth() + 1}
                                    </strong>
                                  </Time>
                                  {provider.slot2.data
                                    .slice(0, userId)
                                    .map(time => (
                                      <>
                                        {!time.avaiable ? (
                                          <>
                                            {/* Exibe os horarios indisponiveis */}
                                            <Time
                                              data={provider.slot1.data}
                                              avaiable={!time.avaiable}
                                            >
                                              <strong>{time.time}</strong>
                                            </Time>
                                            {time.time === '00:00' ? (
                                              <>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                              </>
                                            ) : (
                                              ''
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {/* Exibe os horarios disponiveis se tiver logado */}
                                            {signed ? (
                                              <Link>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                  onClick={() =>
                                                    handleContentModal(
                                                      time,
                                                      provider
                                                    )
                                                  }
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                              </Link>
                                            ) : (
                                              <>
                                                {/* Exibe modal de nao logado */}
                                                <Link>
                                                  <Time
                                                    data={provider.slot1.data}
                                                    avaiable={!time.avaiable}
                                                    onClick={() =>
                                                      handleUnSignedContentModal()
                                                    }
                                                  >
                                                    <strong>{time.time}</strong>
                                                  </Time>
                                                </Link>
                                              </>
                                            )}
                                          </>
                                        )}
                                      </>
                                    ))}
                                </ul>
                              </Col>
                              <Col
                                xs="2"
                                lg="2"
                                style={{
                                  padding: '1%',
                                  backgroundColor: 'transparent',
                                  textAlign: 'center',
                                }}
                              >
                                <ul>
                                  <Time
                                    style={{
                                      background: 'transparent',
                                      flexDirection: 'column',
                                    }}
                                  >
                                    <strong
                                      style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      <>
                                        {new Date(
                                          provider.date.getTime() + 2 * 86400000
                                        ).getDay() === 0
                                          ? 'Dom'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 2 * 86400000
                                        ).getDay() === 1
                                          ? 'Seg'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 2 * 86400000
                                        ).getDay() === 2
                                          ? 'Ter'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 2 * 86400000
                                        ).getDay() === 3
                                          ? 'Qua'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 2 * 86400000
                                        ).getDay() === 4
                                          ? 'Qui'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 2 * 86400000
                                        ).getDay() === 5
                                          ? 'Sex'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 2 * 86400000
                                        ).getDay() === 6
                                          ? 'Sáb'
                                          : ''}
                                      </>
                                    </strong>
                                    <strong style={{ color: '#000' }}>
                                      {new Date(
                                        provider.date.getTime() + 2 * 86400000
                                      ).getDate()}
                                      /
                                      {new Date(
                                        provider.date.getTime() + 2 * 86400000
                                      ).getMonth() + 1}
                                    </strong>
                                  </Time>
                                  {provider.slot3.data
                                    .slice(0, userId)
                                    .map(time => (
                                      <>
                                        {!time.avaiable ? (
                                          <>
                                            <Time
                                              data={provider.slot1.data}
                                              avaiable={!time.avaiable}
                                            >
                                              <strong>{time.time}</strong>
                                            </Time>
                                            {time.time === '00:00' ? (
                                              <>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                              </>
                                            ) : (
                                              ''
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {signed ? (
                                              <Link>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                  onClick={() =>
                                                    handleContentModal(
                                                      time,
                                                      provider
                                                    )
                                                  }
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                              </Link>
                                            ) : (
                                              <>
                                                <Link>
                                                  <Time
                                                    data={provider.slot1.data}
                                                    avaiable={!time.avaiable}
                                                    onClick={() =>
                                                      handleUnSignedContentModal()
                                                    }
                                                  >
                                                    <strong>{time.time}</strong>
                                                  </Time>
                                                </Link>
                                              </>
                                            )}
                                          </>
                                        )}
                                      </>
                                    ))}
                                </ul>
                              </Col>
                              <Col
                                xs="2"
                                lg="2"
                                style={{
                                  padding: '1%',
                                  backgroundColor: 'transparent',
                                  textAlign: 'center',
                                }}
                              >
                                <ul>
                                  <Time
                                    style={{
                                      background: 'transparent',
                                      flexDirection: 'column',
                                    }}
                                  >
                                    <strong
                                      style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      <>
                                        {new Date(
                                          provider.date.getTime() + 3 * 86400000
                                        ).getDay() === 0
                                          ? 'Dom'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 3 * 86400000
                                        ).getDay() === 1
                                          ? 'Seg'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 3 * 86400000
                                        ).getDay() === 2
                                          ? 'Ter'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 3 * 86400000
                                        ).getDay() === 3
                                          ? 'Qua'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 3 * 86400000
                                        ).getDay() === 4
                                          ? 'Qui'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 3 * 86400000
                                        ).getDay() === 5
                                          ? 'Sex'
                                          : ''}
                                        {new Date(
                                          provider.date.getTime() + 3 * 86400000
                                        ).getDay() === 6
                                          ? 'Sáb'
                                          : ''}
                                      </>
                                    </strong>
                                    <strong style={{ color: '#000' }}>
                                      {new Date(
                                        provider.date.getTime() + 3 * 86400000
                                      ).getDate()}
                                      /
                                      {new Date(
                                        provider.date.getTime() + 3 * 86400000
                                      ).getMonth() + 1}
                                    </strong>
                                  </Time>
                                  {provider.slot4.data
                                    .slice(0, userId)
                                    .map(time => (
                                      <>
                                        {!time.avaiable ? (
                                          <>
                                            <Time
                                              data={provider.slot1.data}
                                              avaiable={!time.avaiable}
                                            >
                                              <strong>{time.time}</strong>
                                            </Time>
                                            {time.time === '00:00' ? (
                                              <>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                              </>
                                            ) : (
                                              ''
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {signed ? (
                                              <Link>
                                                <Time
                                                  data={provider.slot1.data}
                                                  avaiable={!time.avaiable}
                                                  onClick={() =>
                                                    handleContentModal(
                                                      time,
                                                      provider
                                                    )
                                                  }
                                                >
                                                  <strong>{time.time}</strong>
                                                </Time>
                                              </Link>
                                            ) : (
                                              <>
                                                <Link>
                                                  <Time
                                                    data={provider.slot1.data}
                                                    avaiable={!time.avaiable}
                                                    onClick={() =>
                                                      handleUnSignedContentModal()
                                                    }
                                                  >
                                                    <strong>{time.time}</strong>
                                                  </Time>
                                                </Link>
                                              </>
                                            )}
                                          </>
                                        )}
                                      </>
                                    ))}
                                </ul>
                              </Col>
                              <Col
                                xs="2"
                                lg="2"
                                style={{
                                  backgroundColor: 'transparent',
                                  textAlign: 'left',
                                  marginTop: '20px',
                                }}
                              >
                                <button
                                  style={{
                                    border: '0',
                                    background: 'transparent',
                                  }}
                                  type="button"
                                >
                                  <MdChevronRight
                                    size={26}
                                    color="#000"
                                    onClick={() => handleNextDays(provider)}
                                  />
                                </button>
                              </Col>
                            </Row>
                            <Col
                              xs="12"
                              lg="12"
                              style={{
                                backgroundColor: 'transparent',
                                textAlign: 'center',
                              }}
                            >
                              <button
                                style={{
                                  fontSize: '1.8vh',
                                  color: '#08a200',
                                  fontWeight: 'bold',
                                  border: '0',
                                  backgroundColor: 'transparent',
                                  margin: '15px',
                                }}
                                type="button"
                                onClick={() => show()}
                              >
                                VER MAIS HORÁRIOS
                              </button>
                            </Col>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </>
              ))}
          </>
        )}

        <div style={{ height: '100px' }} />
      </div>

      {/* <Container> */}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentModalTime ? 'Confirme o agendamento' : 'Alerta'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentModalTime ? (
            <>
              <strong>
                Deseja marcar {selectedValue} para dia{' '}
                {new Date(currentModalTime).getDate()}/
                {new Date(currentModalTime).getMonth() + 1} às{' '}
                {new Date(currentModalTime).getHours()}:
                {new Date(currentModalTime).getMinutes()} com {currentUserName}?
              </strong>

              <div
                style={{ marginTop: 20, display: 'flex', textAlign: 'center' }}
              >
                <input
                  onChange={event => setIsChecked(event.currentTarget.checked)}
                  checked={isChecked}
                  type="checkbox"
                  id="retorno"
                  name="retorno"
                  style={{ alignSelf: 'center' }}
                />
                <div
                  onClick={() => setIsChecked(!isChecked)}
                  onKeyDown={() => setIsChecked(!isChecked)}
                  role="button"
                  tabIndex="0"
                  style={{ marginLeft: 5 }}
                >
                  Marcar em caso de consulta de retorno
                </div>
              </div>
            </>
          ) : (
            <>
              <strong>
                É necessário criar uma conta para realizar agendamentos
              </strong>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {currentModalTime ? (
            <>
              <Button variant="danger" onClick={handleClose}>
                Não
              </Button>
              <Button
                onClick={() =>
                  redirectSubmit(
                    currentModalTime,
                    currentProviderId,
                    selectedValue
                  )
                }
                variant="success"
                type="submit"
              >
                Sim
              </Button>
            </>
          ) : (
            <>
              <Button variant="danger" onClick={handleClose}>
                Fechar
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      <Testimonials />

      <FooterBE />

      <div style={{ position: 'fixed', right: 15, bottom: 15, zIndex: 999 }}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/5583986180305"
        >
          <img
            width="50px"
            height="50px"
            src={whatsapp}
            alt="Whatsapp Policlinica BemEstar"
          />
        </a>
      </div>
    </>
  );
}

export default Worker;
