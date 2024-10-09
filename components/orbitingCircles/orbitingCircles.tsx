"use client"

import React from 'react';
import styles from "./orbitingCircles.module.css";
import { FaLinkedin, FaNodeJs, FaReact } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


function OrbitingCircles() {

  return (
    <div className={styles.circlesWrapper}>
      <div className={styles.circlesContainer}>
        <div className={styles.circle1}>
          <img height="24" width="24" src="/icons/css.svg" alt="cssIcon" className={`${styles.logo1} ${styles.logo1_1}`} />
        </div>
        <div className={styles.circle1}>
          <img height="24" width="24" src="/icons/html.svg" alt="htmlIcon" className={`${styles.logo1} ${styles.logo1_2}`} />
        </div>
        <div className={styles.circle1}>
          <img height="24" width="24" src="/icons/javascript.svg" alt="javascriptIcon" className={`${styles.logo1} ${styles.logo1_3}`} />
        </div>
        <div className={styles.circle1}>
          <img height="24" width="24" src="/icons/mongodb.svg" alt="mongoDBIcon" className={`${styles.logo1} ${styles.logo1_4}`} />
        </div>
        <div className={styles.circle1}>
          <img height="24" width="24" src="/icons/mongoose.svg" alt="mongooseIcon" className={`${styles.logo1} ${styles.logo1_5}`} />
        </div>
        <div className={styles.circle1}>
          <img height="24" width="24" src="/icons/python.svg" alt="pythonIcon" className={`${styles.logo1} ${styles.logo1_6}`} />
        </div>

        <div className={styles.circle2}>
          <img height="24" width="24" src="/icons/npm.svg" alt="npmIcon" className={`${styles.logo2} ${styles.logo2_1}`} />
        </div>
        <div className={styles.circle2}>
          <img height="24" width="24" src="/icons/nodejs.svg" alt="nodeJSIcon" className={`${styles.logo2} ${styles.logo2_2}`}/>
        </div>
        <div className={styles.circle2}>
          <img height="24" width="24" src="/icons/react.svg" alt="reactIcon" className={`${styles.logo2} ${styles.logo2_3}`} />
        </div>
        <div className={styles.circle2}>
          <img height="24" width="24" src="/icons/typescript.svg" alt="typescriptIcon" className={`${styles.logo2} ${styles.logo2_4}`} />
        </div>
      </div>
    </div>
  );
}

export default OrbitingCircles;
