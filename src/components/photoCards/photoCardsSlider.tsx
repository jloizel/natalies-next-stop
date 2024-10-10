import React, { useEffect, useState } from 'react';
import Slider from "react-slick";  // Importing the slider component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './photoCards.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

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
  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles.customNextArrow}`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <IoIosArrowForward/>
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles.customPrevArrow}`}
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
    nextArrow: <NextArrow />,  // Use custom NextArrow
    prevArrow: <PrevArrow />,  // Use custom PrevArrow
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
    <div className={styles.photosContainer}>
      <Slider {...settings}>
        {data.map((photo, index) => (
          <div className={styles.photoItem} key={index}>
            <img src={photo.src} alt={photo.title} className={styles.photoImage} />
            <a className={styles.photoButton} href={photo.href}>{photo.title}</a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PhotoCardsSlider;
