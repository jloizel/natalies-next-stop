"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPostById, updatePost, PostInput } from '../../../../app/API'; // Make sure you're importing these correctly
import styles from './edit.module.css';

const EditPost = () => {
  const router = useRouter();
  const params = useParams(); // Grab the params object
  const id = params?.id as string;
  const [post, setPost] = useState<PostInput>({
    title: '',
    desc: '',
    img: '',
    content: '',
    continent: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch post by ID when the component loads
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const fetchedPost = await getPostById(id);
        if (fetchedPost) {
          // Set the form data with the fetched post data
          setPost({
            title: fetchedPost.title,
            desc: fetchedPost.desc,
            img: fetchedPost.img,
            content: fetchedPost.content,
            continent: fetchedPost.continent,
            country: fetchedPost.country,
          });
        }
      } catch (err) {
        setError('Error fetching post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Handle form submission to update post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updatePost(id, post); // Send the form data to the update API
      router.push('/dashboard/manage'); // Redirect after successful update
    } catch (err) {
      setError('Error updating post.');
    } finally {
      setLoading(false);
    }
  };

  // Update form state on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  return post ? (
    <div className={styles.container}>
      <h1>Edit Post</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          value={post.desc}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={post.img}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="continent"
          placeholder="Continent"
          value={post.continent}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={post.country}
          onChange={handleChange}
          className={styles.input}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={post.content}
          onChange={handleChange}
          className={styles.textarea}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditPost;
