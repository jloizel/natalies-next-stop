"use client"

import NavBar from '@/components/navbar/navbar';
import '../app/globals.css'; 
import type { AppProps } from 'next/app';
import { createTheme, useMediaQuery } from '@mui/material';
import InstagramPostsSlider from '@/components/instagramFeed/instagramPostsSlider';
import InstagramPosts from '@/components/instagramFeed/instagramPosts';
import Footer from '@/components/footer/footer';

function MyApp({ Component, pageProps }: AppProps) {

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

  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletOrBelow = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <NavBar/>
      <Component {...pageProps} />
      {isTabletOrBelow ? 
        ( 
          <InstagramPostsSlider/>
        ) : (
          <InstagramPosts/>
        )
      }
      <Footer/>
    </>
  );
}

export default MyApp;
