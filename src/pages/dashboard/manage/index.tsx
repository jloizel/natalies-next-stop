"use client";

import React, { useState, useEffect } from 'react';
import { getAllPosts, deletePost, Post } from '../../../app/API';
import { useRouter } from 'next/navigation';
import styles from './manage.module.css';

const ManagePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getAllPosts();
        console.log('Fetched posts:', data); // Log to confirm data structure
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err); // Log the error
        setError('Error fetching posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      console.error('Error deleting post:', err); // Log the error
      setError('Error deleting post.');
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/edit/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1>Manage Blog Posts</h1>
      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className={styles.posts}>
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post._id} className={styles.post}>
                <h2>{post.title}</h2>
                <p>{post.desc}</p>
                <div className={styles.actions}>
                  <button onClick={() => handleEdit(post._id)} className={styles.button}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post._id)} className={styles.button}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ManagePosts;
