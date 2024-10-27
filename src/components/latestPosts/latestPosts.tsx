"use client";

import React, { useState, useEffect } from 'react';
import { getAllPosts, Post } from '../../app/API';
import { useRouter } from 'next/navigation';
import styles from './latestPosts.module.css';

interface LatestPostsProps {
  continent?: string;
}

const LatestPosts: React.FC<LatestPostsProps> = ({ continent }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getAllPosts();
        const filteredPosts = continent
          ? data.filter(post => post.continent.toLowerCase() === continent.toLowerCase())
          : data;
        const sortedPosts = filteredPosts.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedPosts);
      } catch (err) {
        setError('Error fetching posts: ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [continent]); 

  const formatForURL = (string: string) => string.toLowerCase().replace(/\s+/g, '');

  const handlePostClick = (continent: string, country: string, postId: string) => {
    router.push(`/${formatForURL(continent)}/${formatForURL(country)}/${postId}`);
  };

  return (
    <div className={styles.latestPostsContainer}>
      <div className={styles.latestPostsHeader}>
        📖 Read my {continent ? `${continent} ` : ''}travel blogs
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className={styles.latestPostsGrid}>
          {posts.length > 0 ? (
            posts.slice(0, 4).map(post => (
              <div key={post._id} className={styles.latestPost} onClick={() => handlePostClick(post.continent, post.country, post._id)}>
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
            <div className={styles.errorContainer}>
              No posts available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LatestPosts;
