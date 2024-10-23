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
    <div className={styles.latestPostsContainer}>
      <div className={styles.latestPostsHeader}>
        📖 Read my recent travel blogs
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className={styles.latestPostsGrid}>
          {posts.length > 0 ? ( 
            posts.slice(0, 4).map(post => (
              <div key={post._id} className={styles.latestPost} onClick={() => handlePostClick(post.country, post._id)}>
                <img
                  src={post.previewImage}
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
      )}
    </div>
  );
};

export default LatestPosts;
