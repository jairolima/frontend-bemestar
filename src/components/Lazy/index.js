import React from 'react';

import Lottie from 'react-lottie';
import animationData from '~/assets/skeleton.json';
// import { Container } from './styles';

export default function Lazy() {
  const defaultOptionsLazy = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <>
      <Lottie options={defaultOptionsLazy} height="100%" width="100%" />
    </>
  );
}
