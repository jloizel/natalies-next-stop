"use client"

import Footer from '@/components/footer/footer';
import InstagramPostsSlider from '@/components/instagramFeed/instagramPostsSlider';
import InstagramPosts from '@/components/instagramFeed/instagramPosts';
import NavBar from '@/components/navbar/navbar';
import PhotoCardsGrid from '@/components/photoCards/photoCardsGrid';
import PhotoCardsSlider from '@/components/photoCards/photoCardsSlider';
import { createTheme, useMediaQuery } from '@mui/material';
import Map from '@/components/map/map';

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

  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletOrBelow = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <NavBar/>
      {/* <Map/> */}
      {isTabletOrBelow ? 
        ( 
          <PhotoCardsSlider/>
        ) : (
          <PhotoCardsGrid/>
        )
      }
      {isTabletOrBelow ? 
        ( 
          <InstagramPostsSlider/>
        ) : (
          <InstagramPosts/>
        )
      }
      <Footer/>
    </div>
  );
};

export default Home;
