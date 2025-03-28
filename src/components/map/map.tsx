import React, { useState } from "react";
import styles from "./map.module.css"
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { useRouter } from "next/router";
import visitedCountriesData from "../../../public/data/visitedCountries.json"; 
// import { useRouter } from "next/navigation";

const geoUrl = "/data/map.json";

const visitedCountries: string[] = visitedCountriesData.visitedCountries;

const TOTAL_COUNTRIES = 195;

const Map: React.FC = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  // const router = useRouter();

  const handleMouseEnter = (countryName: string) => {
    // Set hovered country to display its name only if it's visited
    if (visitedCountries.includes(countryName)) {
      setHoveredCountry(countryName);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  // const handleCountryClick = (countryName: string) => {
  //   const continent = countryName; 

  //   if (continent) {
  //     router.push(`/${continent.toLowerCase()}`);
  //   }
  // };


  const visitedCount = visitedCountries.length;
  const percentageExplored = ((visitedCount / TOTAL_COUNTRIES) * 100).toFixed(0);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.statsContainer}>
        <div className={styles.statText}>
          Countries Visited: <span className={styles.stat}>{visitedCount}</span>
        </div>
        <div className={styles.statText}>
          Percentage of the World Explored: <span className={styles.stat}>{percentageExplored}%</span>
        </div> 
      </div>
      {hoveredCountry && (
        <div className={styles.countryTooltip}>{hoveredCountry}</div>
      )}
      <ComposableMap className={styles.map}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name; 
              const isVisited = visitedCountries.includes(countryName);
              const isHovered = hoveredCountry === countryName;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => handleMouseEnter(countryName)}
                  onMouseLeave={handleMouseLeave}
                  // onClick={() => handleCountryClick(countryName)}
                  style={{
                    default: {
                      fill: isVisited ? (isHovered ? "#FF5722" : "#FFCC00") : "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: isVisited ? "#73bfb8" : "#D6D6DA",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#D6D6DA",
                      outline: "none",
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {/* <div className={styles.statsContainer}>
        <div className={styles.statText}>
          Countries Visited: <span className={styles.stat}>{visitedCount}</span>
        </div>
        <div className={styles.statText}>
          Percentage of the World Explored: <span className={styles.stat}>{percentageExplored}%</span>
        </div> 
      </div> */}
    </div>
  );
};

export default Map;
