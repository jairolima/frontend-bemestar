/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Container, Provider, ProvidersList, Name, Avatar } from './styles';

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
            <Link to={`/selectdatetime/${provider.id}/${provider.name}`}>
              <Provider>
                <Avatar
                  src={
                    (provider.avatar && provider.avatar.url) ||
                    `https://api.adorable.io/avatars/50/abott@adorable.png`
                  }
                  alt="Avatar"
                />
                <Name>{provider.name}</Name>
              </Provider>
            </Link>
          ))}
        </ProvidersList>
      </div>
    </Container>
  );
}

export default Worker;
