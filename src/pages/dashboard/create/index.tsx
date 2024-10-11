"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, PostInput } from '../../../app/API'; // Assuming API route is in `api.ts`
import styles from './create.module.css';

const CreatePost = () => {
  const [formData, setFormData] = useState<PostInput>({
    title: '',
    desc: '',
    img: '',
    content: '',
    continent: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createPost(formData);
      router.push('/dashboard/manage'); // Redirect to Manage after successful creation
    } catch (error) {
      setError('Error creating post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create New Blog Post</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={formData.img}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="continent"
          placeholder="Continent"
          value={formData.continent}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className={styles.input}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          className={styles.textarea}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
