"use client"

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import InstagramFeed from '@/components/instagramFeed/instagramFeed';
import NavBar from '@/components/navbar/navbar';
import PhotoCardsGrid from '@/components/photoCards/photoCardsGrid';
import PhotoCardsSlider from '@/components/photoCards/photoCardsSlider';
import { createTheme, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { InstagramEmbed } from 'react-social-media-embed';

const Home = () => {

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

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletOrBelow = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <NavBar/>
      {isTabletOrBelow ? 
        ( 
          <PhotoCardsSlider/>
        ) : (
          <PhotoCardsGrid/>
        )
      }
      <InstagramFeed/>
      <Footer/>
    </div>
  );
};

export default Home;
