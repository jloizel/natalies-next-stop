"use client"

import React, { useEffect, useState } from 'react'
import styles from './projectCard.module.css'
import { FaLink } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import Bounce from '../../scrollAnimations/bounce';

const ProjectCard: React.FC = () => {
  const [data, setData] = useState([
    {
      id: "",
      image: "",
      title: "",
      details: "",
      languages: "",
      summary: "",
      href: ""
    },
  ]);

  const getData=()=>{
    fetch('/data/projects.json',{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson)
      });
    }

  useEffect(()=>{
    getData()
  },[])


  return (
    <div className={styles.projectCardContainer}>
        {data.map((projectCard, index) => (
          <Bounce className={styles.card} key={projectCard.id}>
          <a className={styles.card} href={projectCard.href}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src={projectCard.image} alt={projectCard.title}/>
              <span className={styles.showProject}>Show Project</span>
            </div>
            <div className={styles.content}>
              <div className={styles.top}>
                <div className={styles.title}>{projectCard.title}</div>
                {/* <div className={styles.details}>{projectCard.details}</div> */}
                <div className={styles.line}></div>
                <div className={styles.icons}>
                  <FaGithub className={styles.icon}/>
                  <IoIosLink className={styles.icon}/>
                </div>
              </div>
              <div className={styles.languages}>{projectCard.languages}</div>
              <div className={styles.summary}>
                {projectCard.summary}
                <span onClick={() => window.open("/projects/metroguessr")}> Learn more &gt;</span>
              </div>
            </div>
          </a>
          
          </Bounce>
        ))}
    </div>
  )
}

export default ProjectCard