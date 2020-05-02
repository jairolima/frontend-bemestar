/* eslint-disable eqeqeq */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '~/assets/logo-purple.svg';
import { Container, Content, Profile } from './styles';
import Notifications from '~/components/Notifications';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} width="64px" height="64px" alt="GoBarber" />
          {profile.id == 17 && <Link to="/adm">SYS BEM ESTAR 1.0.7</Link>}
          {profile.provider == false && profile.id != 17 && (
            <Link to="/booking">AGENDAMENTO</Link>
          )}
          {profile.provider && <Link to="/dashboard">AGENDA</Link>}
        </nav>

        <aside>
          {profile.provider && <Notifications />}
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            {profile.provider && (
              <img
                src={
                  (profile.avatar && profile.avatar.url) ||
                  `https://api.adorable.io/avatars/50/abott@adorable.png`
                }
                alt="avatar"
              />
            )}
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
