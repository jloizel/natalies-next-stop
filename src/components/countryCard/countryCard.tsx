"use client";

import React from "react";
import styles from "./countryCard.module.css"; 

interface Params {
  error: string;
  loading: boolean;
  uniqueCountries: string[];
  handleCountryClick: (country: string) => void;
  getCountryImage: (country: string) => string;
  continentDisplay: string;
}

const CountryCard: React.FC<Params> = ({error, loading, uniqueCountries, handleCountryClick, getCountryImage, continentDisplay }) => {

  return (
    <div className={styles.countriesContainer}>
      <div className={styles.travelHeader}>TRAVEL BLOGS</div>
      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <>
          {uniqueCountries.length > 0 ? ( 
            <div className={styles.countryCardContainer}>
              {uniqueCountries.map((country) => (
                <div
                  key={country}
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
                </div>
              ))}
            </div>
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

export default CountryCard;
