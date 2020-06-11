/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Container, Provider, ProvidersList, Avatar } from './styles';

function Worker() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');

      setProviders(response.data);
    }

    loadProviders();
  }, []);

  return (
    <Container>
      <div>
        <ProvidersList>
          {providers.map(provider => (
            <>
              <Link
                to={`/selectdatetime/${provider.user.id}/${provider.user.name}`}
              >
                <Provider>
                  <div>
                    <Avatar
                      src={
                        (provider.user.avatar && provider.user.avatar.url) ||
                        `https://api.adorable.io/avatars/50/abott@adorable.png`
                      }
                      alt="Avatar"
                    />
                  </div>

                  <strong
                    style={{
                      marginTop: '4px',
                      fontWeight: 'bold',
                      color: '#999',
                    }}
                  >
                    {provider.specialty}
                  </strong>
                  <strong style={{ fontSize: '9px', color: '#ccc' }}>
                    CRM: {provider.crm}
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
                </Provider>
              </Link>
            </>
          ))}
        </ProvidersList>
      </div>
    </Container>
  );
}

export default Worker;
