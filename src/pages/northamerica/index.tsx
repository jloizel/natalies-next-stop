"use client";

import React, { useState, useEffect } from 'react';
import { getPostsByContinent, Post } from '../../app/API'; // Adjust the import path based on your file structure
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import styles from './northamerica.module.css'; // Create a CSS module for styling

const NorthAmericaPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(''); // Reset error before fetching
      try {
        const data = await getPostsByContinent('NorthAmerica'); // Fetch posts for NorthAmerica
        console.log('Fetched posts for NorthAmerica:', data); // Log to confirm data structure
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Error fetching posts: ' + (err as Error).message); // Provide context
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Extract unique countries from posts
  const uniqueCountries = Array.from(new Set(posts.map(post => post.country)));

  // Get the country image for the card from the post data
  const getCountryImage = (country: string) => {
    const postForCountry = posts.find(post => post.country === country && post.countryImage);
    return postForCountry ? postForCountry.countryImage : '/images/default-country.jpg'; // Default image for missing images
  };

  // Handle card click to navigate to country page
  const handleCountryClick = (country: string) => {
    router.push(`/northamerica/${country.toLowerCase()}`); // Convert country to lowercase for URL
  };

  // Handle post click to navigate to post page (convert country to lowercase for URL)
  const handlePostClick = (country: string, postId: string) => {
    router.push(`/northamerica/${country.toLowerCase()}/${postId}`); // Convert country to lowercase for URL
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: 'short', // Use 'short' for abbreviated month names
      day: '2-digit',  // Use '2-digit' to always show two digits for the day
    };
    return date.toLocaleDateString(undefined, options).replace(',', '');
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerImageContainer}>
        <img className={styles.headerImage} src="/images/northamerica.jpg" />
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <span>Destination:</span>
            <span>NORTH AMERICA</span>
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
            {uniqueCountries.length > 0 ? ( // Check if there are unique countries
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
              <p>No travel blogs available for North America.</p> // Message when there are no posts
            )}
          </>
        )}
      </div>
      <div className={styles.latestPostsContainer}>
        {posts.length > 0 && <div className={styles.latestPostsHeader}>Latest North America Blogs</div>}
        <div className={styles.latestPostsGrid}>
          {posts.length > 0 ? ( 
            posts.slice(0, 3).map(post => (
              <div key={post._id} className={styles.latestPost} onClick={() => handlePostClick(post.country, post._id)}>
                <img
                  src={post.previewImage} // Ensure the preview image for posts is displayed
                  alt={post.title}
                  className={styles.postImage}
                />
                <div className={styles.overlayContainer}>
                  <div className={styles.postContent}>
                    <p className={styles.createdAt}>{formatDate(post.createdAt.toString())}</p>
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

export default NorthAmericaPage;
