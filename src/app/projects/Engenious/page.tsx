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
import Slide from '../../../../components/scrollAnimations/slide'
import Bounce from '../../../../components/scrollAnimations/bounce'
import { createTheme, useMediaQuery } from '@mui/material'


const EngeniousPage = () => {
  const [mode, setMode] = useState("dark");
  
  const nextProject = "HoopsToGlory"

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
          Engenious
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
          <Slide>
            Engenious
            <a className={styles.repo} href="https://github.com/jloizel/Engenious" target="_blank">
              <FaGithub className={styles.repoIcon}/> Source Code      
            </a>
          </Slide>
        </div>
        <div className={styles.subHeader}>
          <div className={mode === 'dark' ? styles.darkDescription : styles.lightDescription}>
            <Slide>
              Developed a custom-designed website for Engenious, a leading recruitment firm specializing in the construction industry. The website was created to enhance their online presence, streamline recruitment processes, and effectively connect clients with job seekers within the construction sector. The site incorporates a user-friendly interface that prioritizes ease of navigation, ensuring that both clients and candidates can access information efficiently. It also includes robust functionality tailored to the specific needs of Engenious and its audience, providing a seamless experience throughout the recruitment journey.
            </Slide>
          </div>
          <div className={styles.info}>
            <Slide>
              <div className={styles.detailsContainer}>
                <span className={mode === 'dark' ? styles.darkDetailsHeader : styles.lightDetailsHeader}>
                  Technologies
                </span>
                <span className={mode === 'dark' ? styles.darkDetails : styles.lightDetails}>
                  React, Typescript, MongoDB
                </span>
              </div>
              <a className={mode === 'dark' ? styles.darkOpen : styles.lightOpen} href="https://engenious.vercel.app/" target='_blank'>
                Live Project <FaArrowRightLong className={mode === 'dark' ? styles.darkLongArrow : styles.lightLongArrow}/>
              </a>
            </Slide>
          </div>
        </div>
        <div className={styles.images}>
          <div className={styles.imageContainer}>
            <Bounce>
              <img
                src="/images/Engenious/1.png"
                alt="Engenious Screenshot"
                className={styles.image}
              />
            </Bounce>
          </div>
          <div className={styles.imageContainer}>
            <Bounce>
              <img
                src="/images/Engenious/3.png"
                alt="Engenious Screenshot"
                className={styles.image}
              />
            </Bounce>
          </div>
          <div className={styles.imageContainer}>
            <Bounce>
              <img
                src="/images/Engenious/4.png"
                alt="Engenious Screenshot"
                className={styles.image}
              />
            </Bounce>
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