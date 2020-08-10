import React from 'react';

import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
// import { Container } from './styles';

export default function FooterBE() {
  return (
    <>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ddfdea"
            fillOpacity="1"
            d="M0,192L360,224L720,160L1080,192L1440,96L1440,320L1080,320L720,320L360,320L0,320Z"
          />
        </svg>
        <Footer
          theme="light"
          backgroundColor="#ddfdea"
          style={{ marginTop: '-40px', color: '#000' }}
          columns={[
            {
              icon: (
                <img
                  src="https://image.flaticon.com/icons/svg/684/684908.svg"
                  alt="Localização"
                />
              ),
              title: 'Localização',
              items: [
                {
                  title:
                    'Av. Pastor José Alves de Oliveira 430, Centro Cabedelo-PB, 58100-222.',
                  url: 'https://g.page/policlinicabemestar?share',
                  openExternal: true,
                },
              ],
            },
            {
              title: 'Mídias Sociais',
              items: [
                {
                  title: 'Instagram',
                  url: 'https://www.instagram.com/policlinicabemestar/',
                  openExternal: true,
                },
                {
                  title: 'Facebook',
                  url: 'https://www.facebook.com/bemestarpoliclinic/',
                  openExternal: true,
                },
              ],
            },
            {
              icon: (
                <img
                  src="https://image.flaticon.com/icons/svg/1041/1041916.svg"
                  alt="contato"
                />
              ),
              title: 'Contato',
              items: [
                {
                  icon: (
                    <img
                      src="https://image.flaticon.com/icons/svg/785/785767.svg"
                      alt="whatsapp Policlínica Bem Estar"
                    />
                  ),
                  title: '(83) 986180305',
                  url: 'https://wa.me/5583986180305',
                  description: 'Whatsapp',
                  openExternal: true,
                },
                {
                  icon: (
                    <img
                      src="https://image.flaticon.com/icons/svg/785/785768.svg"
                      alt="telefone fixo Policlínica Bem Estar"
                    />
                  ),
                  title: '(83) 3228-2312',
                  url: '',
                  description: 'Fixo',
                  openExternal: false,
                },
                {
                  icon: (
                    <img
                      src="https://image.flaticon.com/icons/svg/2991/2991144.svg"
                      alt="Email Policlínica Bem Estar"
                    />
                  ),
                  title: 'pb.bemestar@gmail.com',
                  url: 'mailto:pb.bemestar@gmail.com',
                  description: 'Email',
                  openExternal: true,
                },
              ],
            },
          ]}
          bottom="Feito com ❤️ Policlínica Bem Estar - MEDICINA E SEGURANÇA DO TRABALHO"
        />
      </div>
    </>
  );
}
