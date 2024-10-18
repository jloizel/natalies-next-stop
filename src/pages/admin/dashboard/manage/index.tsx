"use client";

import React, { useState, useEffect } from 'react';
import { getAllPosts, deletePost, Post } from '../../../../app/API';
import { useRouter } from 'next/navigation';
import styles from './manage.module.css';
import { FaArrowLeftLong } from 'react-icons/fa6';
import withAuth from '@/utils/withAuth';

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
    router.push(`/admin/dashboard/edit/${id}`);
  };

  const calculateDaysAgo = (postedAt: string) => {
    const postedDate = new Date(postedAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - postedDate.getTime();
    return Math.floor(timeDifference / (1000 * 3600 * 24));
  };

  return (
    <div className={styles.container}>
      <div className={styles.navButtonContainer}>
        <button onClick={() => router.push('/admin/dashboard')} className={styles.navButton}>
          <FaArrowLeftLong  /> Back to dashboard
        </button>
      </div>
      <div className={styles.header}>
        Manage your posts
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className={styles.posts}>
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post._id} className={styles.post}>
                <div className={styles.postTop}>
                  <div className={styles.postTitle}>{post.title}</div>
                  <div className={styles.postLabels}>
                    <div className={styles.label}>{post.continent}</div>
                    <div className={styles.label}>{post.country}</div>
                  </div>
                </div>
                <div className={styles.postBottom}>
                  <div className={styles.postedDate}>
                    {calculateDaysAgo(post.createdAt)} days ago
                  </div>
                  <div className={styles.buttonContainer}>
                    <button onClick={() => handleEdit(post._id)} className={styles.editButton}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(post._id)} className={styles.deleteButton}>
                      Delete
                    </button>
                  </div>
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

export default withAuth(ManagePosts);
