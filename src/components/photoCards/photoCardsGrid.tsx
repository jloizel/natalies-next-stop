import { useEffect, useState } from 'react';
import styles from './photoCards.module.css';
import { FcGlobe } from "react-icons/fc";
import Link from 'next/link';


const PhotoCardsGrid = () => {
  const [data, setData] = useState([
    {
      id: "",
      src: "",
      title: "",
      href: ""
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/photoGrid.json');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);


  return (
    <div className={styles.photoCardsContainer}>
      <div className={styles.photoCardsHeader}>
        <FcGlobe/>
        Read about where I&apos;ve been
      </div>
      <div className={styles.photoGrid}>
        <div className={styles.photoRowTop}>
          {data.slice(0, 4).map((photo, index) => (
            <div className={styles.photoItem} key={index}>
              <div className={styles.imageWrapper}> 
                <img src={photo.src} alt={photo.title} className={styles.photoImage} />
              </div>
              <Link className={styles.photoButton} href={photo.href}>{photo.title}</Link>
            </div>
          ))}
        </div>
        <div className={styles.photoRowBottom}>
          {data.slice(4, 7).map((photo, index) => (
            <div className={styles.photoItem} key={index + 4}>
              <div className={styles.imageWrapper}> 
                <img src={photo.src} alt={photo.title} className={styles.photoImage} />
              </div>
              <Link className={styles.photoButton} href={photo.href}>{photo.title}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoCardsGrid;