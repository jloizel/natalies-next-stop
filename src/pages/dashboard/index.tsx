"use client";

import React from 'react';
import styles from './dashboard.module.css';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getAllPosts, createPost, deletePost } from '../../app/API'; // Import the API functions

export const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  // Use the API's `getAllPosts` function to fetch posts
  const fetchPosts = async () => {
    return await getAllPosts();
  };

  const { data: posts, mutate, error, isLoading } = useSWR('/api/posts', fetchPosts); // Fetch posts data

  // Handle session loading state
  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }

  // Handle unauthenticated or unauthorized users (non-admins)
  if (session.status === 'unauthenticated' || session.data?.user?.role !== 'admin') {
    router.push('/dashboard/login'); // Redirect to login if not authenticated or not admin
    return null;
  }

  // Handle form submission for adding a new post
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh
    const form = e.target as HTMLFormElement;
  
    // Extract the form inputs explicitly
    const title = (form[0] as HTMLInputElement).value;
    const desc = (form[1] as HTMLInputElement).value;
    const img = (form[2] as HTMLInputElement).value;
    const content = (form[3] as HTMLTextAreaElement).value;
    const continent = (form[4] as HTMLInputElement).value; // New input for continent
    const country = (form[5] as HTMLInputElement).value; // New input for country
  
    const postData = { title, desc, img, content, continent, country };
  
    try {
      await createPost(postData); // Use the API's `createPost` function
      mutate(); // Re-fetch data after submission
      form.reset(); // Clear form fields
    } catch (err) {
      console.log(err);
    }
  };

  // Handle post deletion
  const handleDelete = async (id: string) => {
    try {
      await deletePost(id); // Use the API's `deletePost` function
      mutate(); // Re-fetch data after deletion
    } catch (err) {
      console.log(err);
    }
  };

  // Render the dashboard for authenticated admin
  if (session.status === 'authenticated' && session.data?.user?.role === 'admin') {
    return (
      <div className={styles.container}>
        <h1>Admin Dashboard</h1>
        <div className={styles.buttonGroup}>
          <button onClick={() => router.push('/dashboard/create')} className={styles.button}>
            Create New Post
          </button>
          <button onClick={() => router.push('/dashboard/manage')} className={styles.button}>
            Manage Posts
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" placeholder="Title" required />
          <input type="text" placeholder="Description" required />
          <input type="text" placeholder="Image URL" required />
          <textarea placeholder="Content" required></textarea>
          <button type="submit">Add Post</button>
        </form>

        {/* Render posts */}
        {isLoading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p>Error loading posts</p>
        ) : (
          <ul>
            {posts?.map((post:any) => (
              <li key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <Image src={post.img} alt={post.title} width={100} height={100} />
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return null;
};

export default Dashboard;
