"use client"

import React from 'react';
import styles from "./projects.module.css"
import ProjectCard from './projectCard/projectCard';
import { IoIosArrowForward } from "react-icons/io";
import { createTheme, useMediaQuery } from '@mui/material';
import ScrollAnimation from '../scrollAnimations/bounce';
import Slide from '../scrollAnimations/slide';

const Projects: React.FC = () => {

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
    <div className={styles.projects} id="projects">
      <div className={styles.content}>
        <div className={styles.headerContainer}>
          {!isMobile && (<div className={styles.line}/>)}
          <div className={styles.header}>
            <Slide>
              {/* <IoIosArrowForward className={styles.icon}/> */}
              Projects
              <span className={styles.cursor}/>
            </Slide>
          </div>
        </div>
        {/* <Slide>
          <div className={styles.text}>
            Throughout the past year, I have embarked on numerous projects that reflect my passion for coding. These selected works demonstrate my proficiency in various programming languages, frameworks, and tools. Each project presented unique challenges and opportunities for growth, allowing me to refine my skills and expand my knowledge. Take a look at these highlights to get a sense of my capabilities and accomplishments.
          </div>
        </Slide> */}
      </div>
        <ProjectCard/>
    </div>
  );
}

export default Projects;
