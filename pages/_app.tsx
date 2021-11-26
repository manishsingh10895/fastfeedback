import '../styles/globals.css'
import React from 'react';
import { AuthProvider, useProvideAuth } from '@/lib/auth';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { fastTheme } from '@/styles/theme';
import { css, Global } from '@emotion/react';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';

type Props = {
  Component: any,
  pageProps: any
}

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Global
        styles={
          css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;

          }
        `
        }
      />
      {children}
    </>
  )
}

function MyApp(props: Props) {
  const { Component, pageProps } = props;
  return (
    <ChakraProvider resetCSS theme={fastTheme}>
      <AuthProvider>
        <GlobalStyle>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </GlobalStyle>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp


