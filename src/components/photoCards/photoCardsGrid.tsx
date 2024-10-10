import { useEffect, useState } from 'react';
import styles from './photoCards.module.css';

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
    // Fetch the JSON data
    const fetchData = async () => {
      const response = await fetch('/data/photoGrid.json'); // Adjust the path as needed
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.photoGrid}>
      {data.map((photo, index) => (
        <div className={styles.photoItem} key={index}>
          <div className={styles.imageWrapper}> 
            <img src={photo.src} alt={photo.title} className={styles.photoImage} />
          </div>
          <a className={styles.photoButton} href={photo.href}>{photo.title}</a>
        </div>
      ))}
    </div>
  );
};

export default PhotoCardsGrid;