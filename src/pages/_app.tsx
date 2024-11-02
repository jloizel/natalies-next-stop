"use client";

import NavBar from '@/components/navbar/navbar';
import '../app/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, useMediaQuery } from '@mui/material';
import InstagramPostsSlider from '@/components/instagramPosts/instagramPostsSlider';
import InstagramPosts from '@/components/instagramPosts/instagramPosts';
import Footer from '@/components/footer/footer';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { GA } from '@/components/GA/GA';
import Head from 'next/head';

type CustomAppProps = AppProps & {
  Component: AppProps["Component"] & { noLayout?: boolean };
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const isTabletOrBelow = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthProvider>
      <Head>
        <title>Natalie's Next Stop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1" />
      </Head>
      {!Component.noLayout && <NavBar />}
      <Component {...pageProps} />
      {!Component.noLayout && (
        <>
          {isTabletOrBelow ? <InstagramPostsSlider /> : <InstagramPosts />}
          <Footer />
        </>
      )}
      <GA/>
    </AuthProvider>
  );
}

export default MyApp;
