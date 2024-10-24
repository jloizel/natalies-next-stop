"use client";

import React, { useState, useEffect } from 'react';
import { getPostsByContinent, Post } from '../../app/API';
import { useRouter } from 'next/navigation'; 
import styles from '../../groupedCSS/continent.module.css'; 

const AustraliaPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(''); 
      try {
        const data = await getPostsByContinent('Australia'); 
        setPosts(data);
      } catch (err) {
        setError('Error fetching posts: ' + (err as Error).message);
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
    return postForCountry ? postForCountry.countryImage : '';
  };

  // Replace spaces in country names with hyphens
  const formatCountryForURL = (country: string) => country.toLowerCase().replace(/\s+/g, '-');

  const handleCountryClick = (country: string) => {
    router.push(`/australia/${formatCountryForURL(country).toLowerCase()}`); 
  };

  // Handle post click to navigate to post page
  const handlePostClick = (country: string, postId: string) => {
    router.push(`/australia/${formatCountryForURL(country)}/${postId}`); 
  };

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   const options: Intl.DateTimeFormatOptions = {
  //     month: 'short', 
  //     day: '2-digit',  
  //   };
  //   return date.toLocaleDateString(undefined, options).replace(',', '');
  // };

  return (
    <div className={styles.container}>
      <div className={styles.headerImageContainer}>
        <img className={styles.headerImage} src="/images/australia.jpg" />
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <span>Destination:</span>
            <span>Australia</span>
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
              <div className={styles.errorContainer}>Please check back later for Australia travel blogs</div> 
            )}
          </>
        )}
      </div>
      <div className={styles.latestPostsContainer}>
        {posts.length > 0 && <div className={styles.latestPostsHeader}>Latest Australia Blogs</div>}
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
                    {/* <p className={styles.createdAt}>{formatDate(post.createdAt.toString())}</p> */}
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

export default AustraliaPage;
