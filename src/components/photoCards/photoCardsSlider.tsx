import React, { useEffect, useState } from 'react';
import Slider from "react-slick";  // Importing the slider component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './photoCards.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FcGlobe } from "react-icons/fc";
import Link from 'next/link';

const PhotoCardsSlider: React.FC = ({}) => {
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

  interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
  }

  // Custom Arrow components
  const NextArrow: React.FC<ArrowProps> = (props) => {
    const { style, onClick } = props;
    return (
      <div
        className={styles.customNextArrow}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <IoIosArrowForward/>
      </div>
    );
  };

  const PrevArrow: React.FC<ArrowProps> = (props) => {
    const { style, onClick } = props;
    return (
      <div
        className={styles.customPrevArrow}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <IoIosArrowBack/>
      </div>
    );
  };

  // Slider settings
  const settings = {
    dots: true,  // Adds dots for navigation
    draggable: false,
    infinite: true,  // Enables infinite looping
    speed: 500,  // Speed of transitions
    slidesToScroll: 1,  // Scroll one slide at a time
    nextArrow: <NextArrow />,  
    prevArrow: <PrevArrow />,  
    responsive: [
      {
        breakpoint: 1024,  // Tablet size
        settings: {
          slidesToShow: 2,  // Show 2 cards on tablets
        }
      },
      {
        breakpoint: 600,  // Mobile size
        settings: {
          slidesToShow: 1,  // Show 1 card on smaller devices
        }
      }
    ]
  };


  return (
    <div className={styles.photoCardsContainer}>
      <div className={styles.photoCardsHeader}>
        <FcGlobe/>
        Read about where I&apos;ve been
        </div>
      <div className={styles.photosContainer}>
        <Slider {...settings}>
          {data.map((photo, index) => (
            <div className={styles.photoItem} key={index}>
              <div className={styles.imageWrapper}> 
                <img src={photo.src} alt={photo.title} className={styles.photoImage} />
              </div>
              <Link className={styles.photoButton} href={photo.href}>{photo.title}</Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PhotoCardsSlider;
