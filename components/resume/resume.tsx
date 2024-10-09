"use client"

import React from 'react';
import styles from "./resume.module.css"
import ProjectCard from '../projects/projectCard/projectCard';
import { IoIosArrowForward } from "react-icons/io";
import FileTree from './fileTree/fileTree';
import Slide from '../scrollAnimations/slide';
import Bounce from '../scrollAnimations/bounce';
import { createTheme, useMediaQuery } from '@mui/material';
import FileTreeMobile from './fileTree/fileTreeMobile';

function Resume() {

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
    <div className={styles.resume} id="résumé">
      <div className={styles.content}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <Slide>
              {/* <IoIosArrowForward className={styles.icon}/> */}
              Résumé
              <span className={styles.cursor}/>
            </Slide>
          </div>
          {!isMobile && (<div className={styles.line}/>)}
        </div>
        <Bounce>
          <div className={styles.downloadButtonContainer}>
            <a href="/resume.pdf" download className={styles.downloadButton}>
              &lt;Download Résumé&gt;          
            </a>
          </div>
          {isMobile ? (
            <FileTreeMobile/>
          ) : (
            <FileTree/>
          )}
        </Bounce>
      </div>
    </div>
  );
}

export default Resume;
