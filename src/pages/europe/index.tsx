"use client";

import React, { useState, useEffect } from 'react';
import { getPostsByContinent, Post } from '../../app/API'; // Adjust the import path based on your file structure
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import styles from './europe.module.css'; // Create a CSS module for styling

const EuropePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(''); // Reset error before fetching
      try {
        const data = await getPostsByContinent('Europe'); // Fetch posts for Europe
        console.log('Fetched posts for Europe:', data); // Log to confirm data structure
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

  // Handle button click to navigate to country page
  const handleCountryClick = (country: string) => {
    router.push(`/europe/${country}`); // Update the path to your country-specific page
  };

  return (
    <div className={styles.container}>
      <h1>Blog Posts About Europe</h1>
      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div>
          <div className={styles.countryButtons}>
            {uniqueCountries.map((country) => (
              <button
                key={country}
                onClick={() => handleCountryClick(country)}
                className={styles.button}
              >
                {country}
              </button>
            ))}
          </div>
          <div className={styles.posts}>
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post._id} className={styles.post}>
                  <h2>{post.title}</h2>
                  <p>{post.desc}</p>
                  <img src={post.img} alt={post.title} className={styles.image} />
                </div>
              ))
            ) : (
              <p>No posts found for Europe.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EuropePage;
