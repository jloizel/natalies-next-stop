"use client";

import React, { useState, useEffect } from "react";
import { getPostsByContinent, Post } from "../../app/API";
import { useRouter, useParams } from "next/navigation"; 
import styles from "./continent.module.css"; 
import CountryCard from "@/components/countryCard/countryCard";
import { createTheme, useMediaQuery } from "@mui/material";
import CountryCardSlider from "@/components/countryCard/countryCardSlider";
import LatestPostsSlider from "@/components/latestPosts/latestPostsSlider";
import LatestPosts from "@/components/latestPosts/latestPosts";

interface Params {
  continent?: string;
}

const continentNameMapping: Record<string, { display: string, url: string }> = {
  europe: { display: "Europe", url: "europe" },
  asia: { display: "Asia", url: "asia" },
  africa: { display: "Africa", url: "africa" },
  centralamerica: { display: "Central America", url: "centralamerica" },
  northamerica: { display: "North America", url: "northamerica" },
  southamerica: { display: "South America", url: "southamerica" },
  australia: { display: "Australia", url: "australia" }
};

const ContinentPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams() as unknown as Params;

  const continentParam = params?.continent ? params.continent.toLowerCase() : ""; 
  const continentInfo = continentNameMapping[continentParam]; 

  useEffect(() => {
    if (!continentInfo) {
      router.push("/404");
    }
  }, [continentInfo, router]);

  const continentDisplay = continentInfo ? continentInfo.display : ""; 
  const continentURL = continentInfo ? continentInfo.url : ""; 

  useEffect(() => {
    if (!continentDisplay) {
      setError("No valid continent specified."); 
      return;
    }

    const fetchPosts = async () => {
      setLoading(true);
      setError(""); 
      try {
        const data = await getPostsByContinent(continentDisplay); 
        setPosts(data);
      } catch (err) {
        setError("Error fetching posts: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [continentDisplay]); 

  // Extract unique countries from posts
  const uniqueCountries = Array.from(new Set(posts.map(post => post.country)));

  // Get the country image for the card from the post data
  const getCountryImage = (country: string) => {
    const postForCountry = posts.find(post => post.country === country && post.countryImage);
    return postForCountry ? postForCountry.countryImage : "";
  };

  // Replace spaces in country names with hyphens
  const formatCountryForURL = (country: string) => country.toLowerCase().replace(/\s+/g, "");

  const handleCountryClick = (country: string) => {
    router.push(`/${continentURL}/${formatCountryForURL(country)}`); 
    // router.push(`/${continentURL}/${country}`); 
  };

  // const handlePostClick = (country: string, postId: string) => {
  //   router.push(`/${continentURL}/${formatCountryForURL(country)}/${postId}`); 
  // };

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={styles.container}>
      <div className={styles.headerImageContainer}>
        <img className={styles.headerImage} src={`/images/${continentURL}.jpg`} alt={continentDisplay} />
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <span>Destination:</span>
            <span>{continentDisplay}</span>
          </div>
        </div>
      </div>

      {isMobile && uniqueCountries.length > 1 ? (
        <CountryCardSlider error={error} loading={loading} uniqueCountries={uniqueCountries} handleCountryClick={handleCountryClick} getCountryImage={getCountryImage} continentDisplay={continentDisplay}/>
      ) : (
        <CountryCard error={error} loading={loading} uniqueCountries={uniqueCountries} handleCountryClick={handleCountryClick} getCountryImage={getCountryImage} continentDisplay={continentDisplay}/>
      )}

      
      {isMobile ? (
        <LatestPostsSlider continent={continentDisplay}/>
      ) : (
        <LatestPosts continent={continentDisplay}/>
      )}
    </div>
  );
};

export default ContinentPage;
