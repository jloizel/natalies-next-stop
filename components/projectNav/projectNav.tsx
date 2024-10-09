import React from 'react';
import styles from './projectNav.module.css';
import { LuArrowRight } from "react-icons/lu";
import { HiArrowRight } from "react-icons/hi";


interface ProjectNavProps {
  nextProject: string;
}

const ProjectNav: React.FC<ProjectNavProps> = ({ nextProject }) => {

  const projectImages: { [key: string]: string } = {
    'metroguessr': '/images/metroguessr.jpg',
    'Engenious': '/images/engenious.png',
    'HoopsToGlory': '/images/hoopstoglory.png',
  };

  const imageUrl = projectImages[nextProject] || '';
  const href = `/projects/${nextProject}`

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer} style={{ backgroundImage: `url(${imageUrl})` }}>
        {/* <img src={imageUrl}/> */}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div>Next Project</div>
          <a href={href} style={{textDecoration: "none"}}>
            <HiArrowRight className={styles.arrow}/>
          </a>
        </div>
        <a href={href}>{nextProject}</a>
      </div>
    </div>
  );
};

export default ProjectNav;