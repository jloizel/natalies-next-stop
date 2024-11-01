"use client";

import React from "react";
import styles from "./countryCard.module.css"; 
import Link from "next/link";

interface Params {
  error: string;
  loading: boolean;
  uniqueCountries: string[];
  getCountryImage: (country: string) => string;
  continentDisplay: string;
  continentURL: string;
}

const CountryCard: React.FC<Params> = ({error, loading, uniqueCountries, getCountryImage, continentDisplay, continentURL }) => {

  const formatCountryForURL = (country: string) => {
    return country.toLowerCase().replace(/\s+/g, "");
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
            <div className={styles.countryCardContainer}>
              {uniqueCountries.map((country) => (
                <Link
                  key={country}
                  href={`/${continentURL}/${formatCountryForURL(country)}`}
                  passHref
                  className={styles.countryCard}
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
