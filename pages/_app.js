import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Head from 'next/head'
import "nprogress/nprogress.css";
import Router from 'next/router';
import NProgress from "nprogress"
import '../styles/globals.scss'

Router.onRouteChangeStart = () =>  NProgress.start() 
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default function MyApp({Component, pageProps}) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>SADARI | Covid 19</title>  
        </Head>
        <CssBaseline />
       
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};