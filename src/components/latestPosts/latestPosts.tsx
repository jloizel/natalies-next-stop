"use client";

import React, { useState, useEffect } from 'react';
import { getAllPosts, Post } from '../../app/API';
import { useRouter } from 'next/navigation'; 
import styles from './latestPosts.module.css'; 

const LatestPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(''); // Reset error before fetching
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
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
    return postForCountry ? postForCountry.countryImage : ''; 
  };

  // Handle card click to navigate to country page
  const handleCountryClick = (country: string) => {
    router.push(`/europe/${country.toLowerCase()}`); // Convert country to lowercase for URL
  };

  // Handle post click to navigate to post page (convert country to lowercase for URL)
  const handlePostClick = (country: string, postId: string) => {
    router.push(`/europe/${country.toLowerCase()}/${postId}`); // Convert country to lowercase for URL
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
    <div className={styles.latestPostsGrid}>
      {posts.length > 0 ? ( 
        posts.slice(0, 5).map(post => (
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
  );
};

export default LatestPosts;
