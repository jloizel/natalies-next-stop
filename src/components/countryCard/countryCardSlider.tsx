"use client";

import React from "react";
import Slider from "react-slick";
import styles from "./countryCardSlider.module.css"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import ReactGA from 'react-ga4';

interface Params {
  error: string;
  loading: boolean;
  uniqueCountries: string[];
  getCountryImage: (country: string) => string;
  continentDisplay: string;
  continentURL: string;
}

const CountryCardSlider: React.FC<Params> = ({ error, loading, uniqueCountries, getCountryImage, continentDisplay, continentURL }) => {


  const formatCountryForURL = (country: string) => {
    return country.toLowerCase().replace(/\s+/g, "");
  };

  const handleCountryClick = (country:string) => {
    ReactGA.event({
        category: 'Country Page',
        action: 'Click',
        label: country,
    });
    console.log(country)
  };

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

  const settings = {
    dots: true,  // Adds dots for navigation
    draggable: false,
    infinite: true,  // Enables infinite looping
    speed: 500,  // Speed of transitions
    slidesToShow: 1,
    slidesToScroll: 1,  // Scroll one slide at a time
    nextArrow: <NextArrow />,  
    prevArrow: <PrevArrow />
  };

  return (
    <div className={styles.countriesContainer}>
      <div className={styles.travelHeader}>TRAVEL BLOGS</div>
      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <>
          {uniqueCountries.length > 0 ? (
            <Slider {...settings} className={styles.countryCardContainer}>
              {uniqueCountries.map((country) => (
                <Link
                  key={country}
                  href={`/${continentURL}/${formatCountryForURL(country)}`}
                  passHref
                  className={styles.countryCard}
                  onClick={() => handleCountryClick(country)}
                >
                  <img
                    src={getCountryImage(country)}
                    alt={country}
                    className={styles.countryImage}
                  />
                  <div className={styles.countryCardBot}>
                    <div className={styles.countryCardDetails}>{country} TRAVEL BLOGS</div>
                  </div>
                  <div className={styles.countryName}>{country}</div>
                  <div className={styles.countryCardBorder} />
                </Link>
              ))}
            </Slider>
          ) : (
            <div className={styles.errorContainer}>
              Please check back later for {continentDisplay} travel blogs
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CountryCardSlider;
