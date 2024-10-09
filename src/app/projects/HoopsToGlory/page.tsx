"use client"

import React, { useState } from 'react'
import styles from "./page.module.css"
import AnimatedCursor from 'react-animated-cursor'
import Toggle from '../../../../components/toggle/toggle'
import { FiArrowLeft } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import Footer from '../../../../components/footer/footer'
import ProjectNav from '../../../../components/projectNav/projectNav'
import { RiGitRepositoryLine } from 'react-icons/ri'
import { FaGithub } from 'react-icons/fa'
import { createTheme, useMediaQuery } from '@mui/material'


const EngeniousPage = () => {
  const [mode, setMode] = useState("dark");
  
  const nextProject = "metroguessr"

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
        <a className={getLinkClassName()} href="/projects/Engenious">
          HoopsToGlory
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
      <div className={styles.content}>
        <div className={mode === 'dark' ? styles.darkHeader : styles.lightHeader}>
          HoopsToGlory
          <a className={styles.repo} href="https://github.com/jloizel/hoops-to-glory" target="_blank">
            <FaGithub className={styles.repoIcon}/>            
            Source Code
          </a>
        </div>
        <div className={styles.subHeader}>
          <div className={mode === 'dark' ? styles.darkDescription : styles.lightDescription}>
            HoopsToGlory is a basketball-themed incremental clicker game where your aim is to climb the ranks and secure the number one pick in the NBA draft as quickly as possible, attracting nearly 1,000 users to date. Your decisions shape the outcome—focus on training, upgrading skills, and managing your player&apos;s career. Each choice influences your progress through interconnected gameplay mechanics. Can you rise to the top and make your mark in basketball history?          
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
            <a className={mode === 'dark' ? styles.darkOpen : styles.lightOpen} href="https://www.hoopstoglory.com/" target='_blank'>
              Live Project <FaArrowRightLong className={mode === 'dark' ? styles.darkLongArrow : styles.lightLongArrow}/>
            </a>
          </div>
        </div>
        <div className={styles.images}>
          <div className={styles.imageContainer}>
            <img
              src="/images/HoopsToGlory/1.png"
              alt="Engenious Screenshot"
              className={styles.image}
            />
          </div>
          <div className={styles.imageContainer}>
            <img
              src="/images/HoopsToGlory/2.png"
              alt="Engenious Screenshot"
              className={styles.image}
            />
          </div>
          <div className={styles.imageContainer}>
            <img
              src="/images/HoopsToGlory/3.png"
              alt="Engenious Screenshot"
              className={styles.image}
            />
          </div>
        </div>
      </div>
      <div className={styles.projectNavContainer}>
        <ProjectNav nextProject={nextProject}/>
      </div>
      <Footer mode={mode}/>
    </div>
  )
}

export default EngeniousPage