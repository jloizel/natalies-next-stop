"use client";

import React, { useState, useEffect } from "react";
import { getPostsByContinent, Post } from "../../app/API";
import { useRouter, useParams } from "next/navigation"; 
import styles from "../../groupedCSS/continent.module.css"; 

interface Params {
  continent?: string; // continent is optional
}

// Define a mapping for continent names to their formatted versions
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

  // Check if params is defined and then access continent
  const continentParam = params?.continent ? params.continent.toLowerCase() : ""; // Get the continent parameter in lower case
  const continentInfo = continentNameMapping[continentParam]; // Look up the continent in the mapping

  const continentDisplay = continentInfo ? continentInfo.display : ""; // Get the display name for the continent
  const continentURL = continentInfo ? continentInfo.url : ""; // Get the URL-friendly name

  useEffect(() => {
    // Guard clause inside useEffect to handle when continent is not available
    if (!continentDisplay) {
      setError("No valid continent specified."); // Set error if continent is empty
      return; // If continent is not defined, do nothing
    }

    const fetchPosts = async () => {
      setLoading(true);
      setError(""); 
      try {
        const data = await getPostsByContinent(continentDisplay); // Use display name for fetching data
        setPosts(data);
      } catch (err) {
        setError("Error fetching posts: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [continentDisplay]); // Only depend on the display name

  // Extract unique countries from posts
  const uniqueCountries = Array.from(new Set(posts.map(post => post.country)));

  // Get the country image for the card from the post data
  const getCountryImage = (country: string) => {
    const postForCountry = posts.find(post => post.country === country && post.countryImage);
    return postForCountry ? postForCountry.countryImage : "";
  };

  // Replace spaces in country names with hyphens
  const formatCountryForURL = (country: string) => country.toLowerCase().replace(/\s+/g, "-");

  const handleCountryClick = (country: string) => {
    router.push(`/${continentURL}/${formatCountryForURL(country)}`); 
  };

  // Handle post click to navigate to post page
  const handlePostClick = (country: string, postId: string) => {
    router.push(`/${continentURL}/${formatCountryForURL(country)}/${postId}`); 
  };

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

      <div className={styles.latestPostsContainer}>
        {posts.length > 0 && <div className={styles.latestPostsHeader}>Latest {continentDisplay} Blogs</div>}
        <div className={styles.latestPostsGrid}>
          {posts.length > 0 ? ( 
            posts.slice(0, 3).map(post => (
              <div key={post._id} className={styles.latestPost} onClick={() => handlePostClick(post.country, post._id)}>
                <img
                  src={post.previewImage} 
                  alt={post.title}
                  className={styles.postImage}
                />
                <div className={styles.overlayContainer}>
                  <div className={styles.postContent}>
                    <span className={styles.createdAt}>{post.desc}</span>
                    <div className={styles.postTitle}>{post.title}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ContinentPage;
