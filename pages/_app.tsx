import '../styles/globals.css'
import React from 'react';

type Props = {
  Component: any,
  pageProps: any
}

function MyApp(props: Props) {
  const { Component, pageProps } = props;
  return (<Component { ...pageProps } />)
}

export default MyApp
