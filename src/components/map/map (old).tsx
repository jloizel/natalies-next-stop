// WorldMap.tsx
import React, { useState } from "react";
import styles from "./map.module.css"
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useRouter } from "next/router";

// URL to the TopoJSON world map
const geoUrl = "/data/map.json";

// Country to continent mapping
const countryToContinent: Record<string, string> = {
    // # Africa
    "Algeria": "Africa",
    "Angola": "Africa",
    "Benin": "Africa",
    "Botswana": "Africa",
    "Burkina Faso": "Africa",
    "Burundi": "Africa",
    "Cabo Verde": "Africa",
    "Cameroon": "Africa",
    "Central African Republic": "Africa",
    "Chad": "Africa",
    "Comoros": "Africa",
    "Democratic Republic of the Congo": "Africa",
    "Djibouti": "Africa",
    "Egypt": "Africa",
    "Equatorial Guinea": "Africa",
    "Eritrea": "Africa",
    "Eswatini": "Africa",
    "Ethiopia": "Africa",
    "Gabon": "Africa",
    "Gambia": "Africa",
    "Ghana": "Africa",
    "Guinea": "Africa",
    "Guinea-Bissau": "Africa",
    "Ivory Coast": "Africa",
    "Kenya": "Africa",
    "Lesotho": "Africa",
    "Liberia": "Africa",
    "Libya": "Africa",
    "Madagascar": "Africa",
    "Malawi": "Africa",
    "Mali": "Africa",
    "Mauritania": "Africa",
    "Mauritius": "Africa",
    "Morocco": "Africa",
    "Mozambique": "Africa",
    "Namibia": "Africa",
    "Niger": "Africa",
    "Nigeria": "Africa",
    "Rwanda": "Africa",
    "São Tomé and Príncipe": "Africa",
    "Senegal": "Africa",
    "Seychelles": "Africa",
    "Sierra Leone": "Africa",
    "Somalia": "Africa",
    "South Africa": "Africa",
    "South Sudan": "Africa",
    "Sudan": "Africa",
    "Tanzania": "Africa",
    "Togo": "Africa",
    "Uganda": "Africa",
    "Zambia": "Africa",
    "Zimbabwe": "Africa",
    "Cote d'Ivoire": "Africa",
    "Democratic Republic of Congo": "Africa",
    "Congo": "Africa",
    "Western Sahara": "Africa",
    "Tunisia": "Africa",

    // # Asia
    "Afghanistan": "Asia",
    "Armenia": "Asia",
    "Azerbaijan": "Asia",
    "Bahrain": "Asia",
    "Bangladesh": "Asia",
    "Bhutan": "Asia",
    "Brunei": "Asia",
    "Cambodia": "Asia",
    "China": "Asia",
    "Georgia": "Asia",
    "India": "Asia",
    "Indonesia": "Asia",
    "Iran": "Asia",
    "Iraq": "Asia",
    "Israel": "Asia",
    "Japan": "Asia",
    "Jordan": "Asia",
    "Kazakhstan": "Asia",
    "Kuwait": "Asia",
    "Kyrgyzstan": "Asia",
    "Laos": "Asia",
    "Lebanon": "Asia",
    "Malaysia": "Asia",
    "Maldives": "Asia",
    "Mongolia": "Asia",
    "Myanmar": "Asia",
    "Nepal": "Asia",
    "North Korea": "Asia",
    "Oman": "Asia",
    "Pakistan": "Asia",
    "Palestine": "Asia",
    "Philippines": "Asia",
    "Qatar": "Asia",
    "Saudi Arabia": "Asia",
    "Singapore": "Asia",
    "South Korea": "Asia",
    "Sri Lanka": "Asia",
    "Syria": "Asia",
    "Taiwan": "Asia",
    "Tajikistan": "Asia",
    "Thailand": "Asia",
    "Timor-Leste": "Asia",
    "Turkmenistan": "Asia",
    "United Arab Emirates": "Asia",
    "Uzbekistan": "Asia",
    "Vietnam": "Asia",
    "Yemen": "Asia",
    "West Bank": "Asia",
    "Timor": "Asia",
    "Turkey": "Asia",
    "Russia": "Asia",

    // # Europe
    "Albania": "Europe",
    "Andorra": "Europe",
    "Austria": "Europe",
    "Belarus": "Europe",
    "Belgium": "Europe",
    "Bosnia and Herzegovina": "Europe",
    "Bulgaria": "Europe",
    "Croatia": "Europe",
    "Cyprus": "Europe",
    "Czech Republic": "Europe",
    "Denmark": "Europe",
    "Estonia": "Europe",
    "Finland": "Europe",
    "France": "Europe",
    "Germany": "Europe",
    "Greece": "Europe",
    "Hungary": "Europe",
    "Iceland": "Europe",
    "Ireland": "Europe",
    "Italy": "Europe",
    "Latvia": "Europe",
    "Liechtenstein": "Europe",
    "Lithuania": "Europe",
    "Luxembourg": "Europe",
    "Malta": "Europe",
    "Moldova": "Europe",
    "Monaco": "Europe",
    "Montenegro": "Europe",
    "Netherlands": "Europe",
    "North Macedonia": "Europe",
    "Norway": "Europe",
    "Poland": "Europe",
    "Portugal": "Europe",
    "Romania": "Europe",
    "San Marino": "Europe",
    "Serbia": "Europe",
    "Slovakia": "Europe",
    "Slovenia": "Europe",
    "Spain": "Europe",
    "Sweden": "Europe",
    "Switzerland": "Europe",
    "Ukraine": "Europe",
    "United Kingdom": "Europe",
    "Vatican City": "Europe",
    "Kosovo": "Europe",
    "Czechia": "Europe",

    // # North America
    "Antigua and Barbuda": "North America",
    "Bahamas": "North America",
    "Barbados": "North America",
    "Belize": "North America",
    "Canada": "North America",
    "Costa Rica": "North America",
    "Cuba": "North America",
    "Dominica": "North America",
    "Dominican Republic": "North America",
    "El Salvador": "North America",
    "Grenada": "North America",
    "Guatemala": "North America",
    "Haiti": "North America",
    "Honduras": "North America",
    "Jamaica": "North America",
    "Mexico": "North America",
    "Nicaragua": "North America",
    "Panama": "North America",
    "Saint Kitts and Nevis": "North America",
    "Saint Lucia": "North America",
    "Saint Vincent and the Grenadines": "North America",
    "United States": "North America",
    "Puerto Rico": "North America",
    "Greenland": "North America",

    // # Oceania
    "Australia": "Oceania",
    "Fiji": "Oceania",
    "Kiribati": "Oceania",
    "Marshall Islands": "Oceania",
    "Micronesia": "Oceania",
    "Nauru": "Oceania",
    "New Zealand": "Oceania",
    "Palau": "Oceania",
    "Papua New Guinea": "Oceania",
    "Samoa": "Oceania",
    "Solomon Islands": "Oceania",
    "Tonga": "Oceania",
    "Tuvalu": "Oceania",
    "Vanuatu": "Oceania",

    // # South America
    "Argentina": "South America",
    "Bolivia": "South America",
    "Brazil": "South America",
    "Chile": "South America",
    "Colombia": "South America",
    "Ecuador": "South America",
    "Guyana": "South America",
    "Paraguay": "South America",
    "Peru": "South America",
    "Suriname": "South America",
    "Uruguay": "South America",
    "Venezuela": "South America",
    "French Guiana": "South America",
    "Trinidad and Tobago": "South America"
}

// Mapping continents to their respective routes
const continentData: Record<string, string> = {
  Africa: "/continents/africa",
  Europe: "/continents/europe",
  Asia: "/continents/asia",
  "North America": "/continents/north-america",
  "South America": "/continents/south-america",
  Australia: "/continents/australia",
  Antarctica: "/continents/antarctica",
};

// Define the array of visited countries
const visitedCountries: string[] = [
  "Algeria",
  "France",
  "Japan",
  "Brazil",
  "Australia",
  // Add other visited countries
];

const Map: React.FC = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);
  const router = useRouter(); // Use Next.js router for navigation

  const handleMouseEnter = (countryName: string) => {
    const continent = countryToContinent[countryName];
    if (continent) {
      setHoveredContinent(continent);
    }
    // Set hovered country to display its name
    setHoveredCountry(countryName);
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
    setHoveredContinent(null);
  };

  const handleContinentClick = (continent: string) => {
    const continentPage = continentData[continent];
    if (continentPage) {
      router.push(continentPage); // Navigate to the specific continent page
    }
  };

  return (
    <div className={styles.mapContainer}>
      <ComposableMap className={styles.map}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name; // Get the country name
              const continent = countryToContinent[countryName]; // Get the continent based on country
              const isVisited = visitedCountries.includes(countryName); // Check if the country is visited
              // const isHovered = hoveredCountry === countryName; // Check if the current country is hovered

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => handleMouseEnter(countryName)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => continent && handleContinentClick(continent)}
                  style={{
                    // default: {
                    //   fill: isVisited ? "#FFCC00" : (hoveredContinent === continent ? "#73bfb8" : "#D6D6DA"), // Visited countries have a different color
                    //   outline: "none",
                    // },
                    default: {
                      fill: isVisited ? "#FFCC00" : (hoveredContinent === continent ? "#73bfb8" : "#D6D6DA"), // Visited countries have a different color
                      outline: "none",
                    },
                    // hover: {
                    //   fill: isHovered ? "#FF5722" : (isVisited ? "#FFCC00" : "#73bfb8"), // Change color on hover
                    //   outline: "none",
                    // },
                    pressed: {
                      fill: "#FF5722",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {/* Display hovered country name */}
      {hoveredCountry && (
        <div className={styles.tooltip}>
          {hoveredCountry}
        </div>
      )}
    </div>
  );
};

export default Map;
