"use client"

import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import AnimatedCursor from 'react-animated-cursor'
import Toggle from '../../../../components/toggle/toggle'
import { FiArrowLeft } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import Footer from '../../../../components/footer/footer'
import ProjectNav from '../../../../components/projectNav/projectNav'
import { RiGitRepositoryLine } from "react-icons/ri";
import { RiGitRepositoryFill } from "react-icons/ri";
import ScrollArrow from '../../../../components/scrollArrow/scrollArrow'
import { FaGithub } from 'react-icons/fa'
import { createTheme, useMediaQuery } from '@mui/material'


const MetroguessrPage: React.FC = () => {
  const [mode, setMode] = useState("dark");
  
  const nextProject = "Engenious"

  const handleModeChange = () => {
    setMode(prevMode => (prevMode === "dark" ? "light" : "dark"));
  };

  const getLinkClassName = () => mode === 'dark' ? styles.link : styles.linkDark;

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
    <div className={mode === 'dark' ? styles.darkPage : styles.lightPage}>
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
      <div className={styles.navbar} id="navbar">
        <a className={getLinkClassName()} href="/">
          {"// home"}
        </a>
        <span className={mode === 'dark' ? styles.arrowDark : styles.arrowLight}>
          <MdKeyboardArrowRight/>
        </span>
        <a className={getLinkClassName()} href="/projects/metroguessr">
          metroguessr
        </a>
      </div>
      <div className={styles.arrowContainer}>
        <a href="/">
          <FiArrowLeft className={mode === 'dark' ? styles.darkArrow : styles.lightArrow} />
        </a>
        <span className={styles.backText}>Back</span>
      </div>
      <div className={styles.toggleContainer}>
        <Toggle handleModeChange={handleModeChange} mode={mode}/>
      </div>
      <div className={styles.content} id="home">
        <div className={mode === 'dark' ? styles.darkHeader : styles.lightHeader}>
          metroguessr
          <a className={styles.repo} href="https://github.com/jloizel/metroguessr-client" target="_blank">
            <FaGithub className={styles.repoIcon}/>            
            Source Code
          </a>
        </div>
        <div className={styles.subHeader}>
          <div className={mode === 'dark' ? styles.darkDescription : styles.lightDescription}>
            metroguessr is an interactive online game where players choose from various cities and try to guess as many metro stations as possible within a set time limit. The game has attracted over 10,000 users and has been featured in publications such as <a href="https://www.timeout.fr/paris/actualites/vous-etes-chaud-sur-la-carte-du-metro-prouvez-le-en-1-minute-071424" target='_blank'>Time Out Paris</a>, <a href="https://en.lebonbon.fr/paris/news/do-you-really-know/" target="_blank">Le Bonbon</a> and <a href="https://www.newsshopper.co.uk/news/24457392.london-underground-game-name-tube-stations-1-minute/" target='_blank'>News Shopper</a>, among others.
            
          </div>
          <div className={styles.info}>
            <div className={styles.detailsContainer}>
              <span className={mode === 'dark' ? styles.darkDetailsHeader : styles.lightDetailsHeader}>
                Technologies
              </span>
              <span className={mode === 'dark' ? styles.darkDetails : styles.lightDetails}>
                React, Typescript, MongoDB
              </span>
            </div>
            <a className={mode === 'dark' ? styles.darkOpen : styles.lightOpen} href="https://www.metroguessr.com/" target='_blank'>
              Live Project <FaArrowRightLong className={mode === 'dark' ? styles.darkLongArrow : styles.lightLongArrow}/>
            </a>
          </div>
        </div>
        <div className={styles.images}>
          <div className={styles.imageContainer}>
            <img
              src="/images/metroguessr/3.png"
              alt="Metroguessr Screenshot"
              className={styles.image}
            />
          </div>
          <div className={styles.imageContainer}>
            <img
              src="/images/metroguessr/1.png"
              alt="Metroguessr Screenshot"
              className={styles.image}
            />
          </div>
          <div className={styles.imageContainer}>
            <img
              src="/images/metroguessr/4.png"
              alt="Metroguessr Screenshot"
              className={styles.image}
            />
          </div>
        </div>
      </div>
      
      <div className={styles.projectNavContainer}>
        <ProjectNav nextProject={nextProject}/>
      </div>
      <ScrollArrow mode={mode}/>
      <Footer mode={mode}/>
    </div>
  )
}

export default MetroguessrPage