import React from 'react';

import { MDBContainer } from 'mdbreact';
// import { Container } from './styles';

export default function Footer() {
  return (
    <>
      {/* <MDBFooter color="blue" className="font-small pt-4 mt-4" /> */}
      <div
        style={{ backgroundColor: '#b5bdc8' }}
        className="footer-copyright text-center py-3"
      >
        <MDBContainer style={{ color: 'white' }} fluid>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a
            style={{ color: 'white' }}
            href="https://www.policlinicabemestar.com"
          >
            {' '}
            Policlinica BemEstar{' '}
          </a>
        </MDBContainer>
      </div>
    </>
  );
}
