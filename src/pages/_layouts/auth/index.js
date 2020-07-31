import React from 'react';
import PropTypes from 'prop-types';
// import { Content } from './styles';
import Header from '~/components/Header';

export default function AuthLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
