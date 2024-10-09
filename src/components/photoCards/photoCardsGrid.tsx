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
          <img src={photo.src} alt={photo.title} className={styles.photoImage} />
          <div className={styles.overlay}>
            <h3 className={styles.photoTitle}>{photo.title}</h3>
            <button className={styles.photoButton}>View</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoCardsGrid;