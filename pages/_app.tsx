import '../styles/globals.css'
import React from 'react';
import { AuthProvider, useProvideAuth } from '../lib/auth';
import { ChakraProvider } from '@chakra-ui/react';

type Props = {
  Component: any,
  pageProps: any
}

function MyApp(props: Props) {
  const { Component, pageProps } = props;
  return (
    <ChakraProvider>
      {/* <AuthProvider> */}
        <Component {...pageProps} />
      {/* </AuthProvider> */}
    </ChakraProvider>
  )
}

export default MyApp
