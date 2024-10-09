"use client";

import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styles from './scrollArrow.module.css';

interface ScrollArrowProps {
  mode?: string; // mode prop is optional
}

const ScrollArrow: React.FC<ScrollArrowProps> = ({ mode = 'light' }) => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      
      if (homeSection) {
        const homeSectionBottom = homeSection.getBoundingClientRect().bottom;
        
        // If the bottom of the home section is above the viewport, show the arrow
        if (homeSectionBottom < window.innerHeight) {
          setShowArrow(true);
        } else {
          setShowArrow(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getArrowContainerClassName = () => {
    return mode === 'dark' ? styles.arrowContainerDark : styles.arrowContainer;
  };

  return (
    <div className={`${getArrowContainerClassName()} ${showArrow ? styles.show : ''}`}>
      <FaArrowUp className={styles.arrow} onClick={() => scrollToSection('navbar')} />
    </div>
  );
};

export default ScrollArrow;
