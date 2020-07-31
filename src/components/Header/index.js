/* eslint-disable eqeqeq */
import React from 'react';
import { Link } from 'react-router-dom';
import { MdSettings } from 'react-icons/md';
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
          <img src={logo} width="64px" height="64px" alt="BemEstar" />
          {profile.id == 17 && <Link to="/adm">SYS BEM ESTAR 1.2.5</Link>}
          {profile.provider == false && profile.id != 17 && (
            <Link to="/">AGENDAMENTO</Link>
          )}
          {profile.provider && <Link to="/dashboard">AGENDA</Link>}
        </nav>

        <aside>
          {profile.provider && <Notifications />}
          {profile.provider && (
            <Link to="/doctor" style={{ paddingLeft: 20 }}>
              <MdSettings color="#056600" size={20} />
            </Link>
          )}
          <Profile>
            <div>
              <strong>{profile.name ? profile.name : 'Olá, visitante'}</strong>
              {profile.name ? (
                <Link to="/profile">Meu perfil</Link>
              ) : (
                <Link to="/register">Criar conta</Link>
              )}
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
