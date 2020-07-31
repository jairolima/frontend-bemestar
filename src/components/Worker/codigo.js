/* eslint-disable */
<div>
  <ProvidersList>
    {providers
      .filter(provider => provider.specialty.includes(selectedValue))
      .map(provider => (
        <>
          <Provider>
            <Header>
              <div
                style={{
                  display: 'flex',
                  height: '100%',
                  width: '25%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'pink',
                }}
              >
                <Avatar
                  src={
                    (provider.user.avatar && provider.user.avatar.url) ||
                    `https://api.adorable.io/avatars/50/abott@adorable.png`
                  }
                  alt="Avatar"
                />

                <strong
                  style={{
                    marginTop: '4px',
                    fontWeight: 'bold',
                    fontSize: '1.6vh',
                    color: '#999',
                  }}
                >
                  {provider.specialty}
                </strong>
                <strong style={{ fontSize: '9px', color: '#ccc' }}>
                  CRM: 000000
                </strong>
                <strong
                  style={{
                    marginTop: '4px',
                    fontSize: '11px',
                    color: '#999',
                  }}
                >
                  {provider.user.name}
                </strong>
              </div>
              <div style={{ background: 'green' }}>
                <button type="button">
                  <MdChevronLeft
                    size={26}
                    color="000"
                    onClick={() => handleBeforeDays(provider)}
                  />
                </button>
              </div>
              {/* <strong>{dateFormatted}</strong> */}
              <div
                style={{
                  background: 'purple',
                  marginLeft: '0px',
                }}
              >
                <ul>
                  <Time
                    key={provider.id}
                    style={{
                      background: 'transparent',
                      flexDirection: 'column',
                    }}
                  >
                    <strong style={{ color: '#000', fontWeight: 'bold' }}>
                      {provider.date.setHours(0, 0, 0, 0) ===
                      new Date().setHours(0, 0, 0, 0) ? (
                        'Hoje'
                      ) : (
                        <>
                          {provider.date.getDay() === 0 ? 'Dom' : ''}
                          {provider.date.getDay() === 1 ? 'Seg' : ''}
                          {provider.date.getDay() === 2 ? 'Ter' : ''}
                          {provider.date.getDay() === 3 ? 'Qua' : ''}
                          {provider.date.getDay() === 4 ? 'Qui' : ''}
                          {provider.date.getDay() === 5 ? 'Sex' : ''}
                          {provider.date.getDay() === 6 ? 'Sáb' : ''}
                        </>
                      )}
                    </strong>
                    <strong style={{ color: '#000' }}>
                      {provider.date.getDate()}/{provider.date.getMonth()}
                    </strong>
                  </Time>
                  {provider.slot1.data.slice(0, userId).map(time => (
                    <>
                      {!time.avaiable ? (
                        <>
                          <Time
                            data={provider.slot1.data}
                            avaiable={!time.avaiable}
                            key={time.time}
                          >
                            <strong>{time.time}</strong>
                          </Time>
                          {time.time === '00:00' ? (
                            <>
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
                              >
                                <strong>{time.time}</strong>
                              </Time>
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
                              >
                                <strong>{time.time}</strong>
                              </Time>
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
                              >
                                <strong>{time.time}</strong>
                              </Time>
                            </>
                          ) : (
                            ''
                          )}
                        </>
                      ) : (
                        <Link
                          to={
                            time.avaiable
                              ? `/confirm/${time.value}/${provider.user.id}/${provider.user.name}`
                              : ``
                          }
                        >
                          <Time
                            data={provider.slot1.data}
                            avaiable={!time.avaiable}
                            key={time.time}
                          >
                            <strong>{time.time}</strong>
                          </Time>
                        </Link>
                      )}
                    </>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: 'transparent',
                  marginLeft: '5px',
                }}
              >
                <ul>
                  <Time
                    style={{
                      background: 'transparent',
                      flexDirection: 'column',
                    }}
                  >
                    <strong style={{ color: '#000', fontWeight: 'bold' }}>
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
                      ).getMonth()}
                    </strong>
                  </Time>
                  {provider.slot2.data.slice(0, userId).map(time => (
                    <>
                      {!time.avaiable ? (
                        <>
                          <Time
                            data={provider.slot1.data}
                            avaiable={!time.avaiable}
                            key={time.time}
                          >
                            <strong>{time.time}</strong>
                          </Time>
                          {time.time === '00:00' ? (
                            <>
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
                              >
                                <strong>{time.time}</strong>
                              </Time>
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
                              >
                                <strong>{time.time}</strong>
                              </Time>
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
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
                            <button
                              type="button"
                              onClick={() => handleContentModal(time, provider)}
                            >
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
                              >
                                <strong>{time.time}</strong>
                              </Time>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleUnSignedContentModal()}
                            >
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
                              >
                                <strong>{time.time}</strong>
                              </Time>
                            </button>
                          )}
                        </>
                      )}
                    </>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: 'transparent',
                  marginLeft: '5px',
                }}
              >
                <ul>
                  <Time
                    style={{
                      background: 'transparent',
                      flexDirection: 'column',
                    }}
                  >
                    <strong style={{ color: '#000', fontWeight: 'bold' }}>
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
                      ).getMonth()}
                    </strong>
                  </Time>
                  {provider.slot3.data.slice(0, userId).map(time => (
                    <>
                      {!time.avaiable ? (
                        <>
                          <Time
                            data={provider.slot1.data}
                            avaiable={!time.avaiable}
                            key={time.time}
                          >
                            <strong>{time.time}</strong>
                          </Time>
                          {time.time === '00:00' ? (
                            <>
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
                              >
                                <strong>{time.time}</strong>
                              </Time>
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
                              >
                                <strong>{time.time}</strong>
                              </Time>
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
                              >
                                <strong>{time.time}</strong>
                              </Time>
                            </>
                          ) : (
                            ''
                          )}
                        </>
                      ) : (
                        <Link
                          to={
                            time.avaiable
                              ? `/confirm/${time.value}/${provider.user.id}/${provider.user.name}`
                              : ``
                          }
                        >
                          <Time
                            data={provider.slot1.data}
                            avaiable={!time.avaiable}
                            key={time.time}
                          >
                            <strong>{time.time}</strong>
                          </Time>
                        </Link>
                      )}
                    </>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: 'transparent',
                  marginLeft: '5px',
                }}
              >
                <ul>
                  <Time
                    style={{
                      background: 'transparent',
                      flexDirection: 'column',
                    }}
                  >
                    <strong style={{ color: '#000', fontWeight: 'bold' }}>
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
                      ).getMonth()}
                    </strong>
                  </Time>
                  {provider.slot4.data.slice(0, userId).map(time => (
                    <>
                      {!time.avaiable ? (
                        <>
                          <Time
                            data={provider.slot1.data}
                            avaiable={!time.avaiable}
                            key={time.time}
                          >
                            <strong>{time.time}</strong>
                          </Time>
                          {time.time === '00:00' ? (
                            <>
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
                              >
                                <strong>{time.time}</strong>
                              </Time>
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
                              >
                                <strong>{time.time}</strong>
                              </Time>
                              <Time
                                data={provider.slot1.data}
                                avaiable={!time.avaiable}
                                key={time.time}
                              >
                                <strong>{time.time}</strong>
                              </Time>
                            </>
                          ) : (
                            ''
                          )}
                        </>
                      ) : (
                        <Link
                          to={
                            time.avaiable
                              ? `/confirm/${time.value}/${provider.user.id}/${provider.user.name}`
                              : ``
                          }
                        >
                          <Time
                            data={provider.slot1.data}
                            avaiable={!time.avaiable}
                            key={time.time}
                          >
                            <strong>{time.time}</strong>
                          </Time>
                        </Link>
                      )}
                    </>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'transparent', marginLeft: '5px' }}>
                <button type="button">
                  <MdChevronRight
                    size={26}
                    color="#000"
                    onClick={() => handleNextDays(provider)}
                  />
                </button>
              </div>
            </Header>

            <div
              style={{
                flexDirection: 'column',
                alignSelf: 'flex-end',
                marginRight: '5px',
              }}
            >
              <button
                style={{
                  fontSize: '1.8vh',
                  color: '#08a200',
                  fontWeight: 'bold',
                }}
                type="button"
                onClick={() => show()}
              >
                VER MAIS HORÁRIOS
              </button>
            </div>
          </Provider>
        </>
      ))}
  </ProvidersList>
</div>;
