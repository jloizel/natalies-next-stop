"use client"

import React from 'react';
import logo from './logo.svg';
import AnimatedCursor from "react-animated-cursor"
import styles from "./page.module.css" 
import NavBar from "../../components/navbar/navbar"
import Home from '../../components/home/home';
import Projects from '../../components/projects/projects';
import Resume from '../../components/resume/resume';
import Focus from '../../components/focus/focus';
import Contact from '../../components/contact/contact';
import Footer from '../../components/footer/footer';
import ScrollArrow from '../../components/scrollArrow/scrollArrow';
import { createTheme, useMediaQuery } from '@mui/material';

function App() {
  const mode = "dark"

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

  const isComputer = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={styles.app}>
      {isComputer && (
        <AnimatedCursor 
          innerSize={8}
          outerSize={8}
          color='225, 142, 236'
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          showSystemCursor={false}
          clickables={[
            'a',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            'label[for]',
            'select',
            'textarea',
            'button',
            '.link'
          ]}
        />
      )}
      <NavBar/>
      <Home/> 
      <Focus/> 
      <Projects/>
      <Resume/>
      <Contact/>
      <Footer mode={mode}/>
      <ScrollArrow/>
    </div>
  );
}

export default App;
