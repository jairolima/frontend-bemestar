import React from 'react';
import PropTypes from 'prop-types';
// import { Wrapper } from './styles';
// import HeaderNotSignIn from '~/components/HeaderNotSignIn';

export default function DefaultLayout({ children }) {
  return <>{children}</>;
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
