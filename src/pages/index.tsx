"use client"

import PhotoCardsGrid from '@/components/photoCards/photoCardsGrid';
import PhotoCardsSlider from '@/components/photoCards/photoCardsSlider';
import { createTheme, useMediaQuery } from '@mui/material';
import Map from '@/components/map/map';
import styles from "./index.module.css"
import LatestPosts from '@/components/latestPosts/latestPosts';
import LatestPostsSlider from '@/components/latestPosts/latestPostsSlider';

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
      <div className={styles.imageContainer}>
        <img className={styles.image} src='/images/homepage.jpg'/>
        <div className={styles.header}>
          <div className={styles.headersubTitle}>
            Travel Blog
          </div>
          <div className={styles.headerTitle}>
            <span>Natalie&apos;s</span>
            <span>Next Stop</span>
          </div>
          <div className={styles.headerSlogan}>
            I haven&apos;t been everywhere, but it&apos;s on my list
          </div>
        </div>
      </div>
      
      <Map/>
      {isTabletOrBelow ? 
        ( 
          <PhotoCardsSlider/>
        ) : (
          <PhotoCardsGrid/>
        )
      }
      {isTabletOrBelow ? 
        ( 
          <LatestPostsSlider/>
        ) : (
          <LatestPosts/>
        )
      }
      {/* {isTabletOrBelow ? 
        ( 
          <InstagramPostsSlider/>
        ) : (
          <InstagramPosts/>
        )
      }
      <Footer/> */}
    </div>
  );
};

export default Home;
