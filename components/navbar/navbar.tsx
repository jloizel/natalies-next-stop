"use client"

import React, { useState, useEffect } from 'react';
import styles from "./navbar.module.css"
import { createTheme, useMediaQuery } from '@mui/material';
import Menu from './menu/menu';
import { motion } from "framer-motion";


const NavBar: React.FC = () => {
  const [isSlidingDown, setIsSlidingDown] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const cleanSectionId = sectionId.replace('// ', ''); // Remove the "// " part
    const section = document.getElementById(cleanSectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      if (!homeSection) return;

      const homeBottom = homeSection.getBoundingClientRect().bottom;
      const scrollPosition = window.scrollY;

      if (scrollPosition > homeBottom) {
        setIsSlidingDown(true); // Navbar slides down when scrolling past home section
      } else {
        setIsSlidingDown(false); // Navbar hides when back on home section
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Run the handler once on component mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  return (
    <div id="navbar">
      {isMobile ? (
        <Menu />
      ) : (
        <div>
          <div className={`${styles.fixedNavbar} ${isSlidingDown ? styles.hidden : ""}`}>
            <div className={styles.linksContainer}>
              {['// home', '// focus', '// projects', '// résumé', '// contact'].map((section, index) => (
                <motion.div
                  key={section}
                  className={styles.link}
                  onClick={() => scrollToSection(section)}
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {section}
              </motion.div>
              ))}
            </div>
            <a href="/resume.pdf" download className={styles.downloadButton}>
              My Résumé        
            </a>
          </div>
          <div className={`${styles.navbar} ${isSlidingDown ? styles.slideDown : styles.hidden}`}>
            <div className={styles.linksContainer}>
              {['// home', '// focus', '// projects', '// résumé', '// contact'].map((section) => (
                <div
                  key={section}
                  className={`${styles.link}`}
                  onClick={() => scrollToSection(section)}
                >
                  {section}
                </div>
              ))}
            </div>
            <a href="/resume.pdf" download className={styles.downloadButton}>
              My Résumé        
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
