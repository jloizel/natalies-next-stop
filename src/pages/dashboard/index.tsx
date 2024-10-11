"use client" 

import React from 'react';
import styles from './dashboard.module.css';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  // Define a fetcher function with explicit types
  const fetcher = (...args: [string, RequestInit?]) => fetch(...args).then((res) => res.json());

  // Fetch admin posts or data
  const { data, mutate, error, isLoading } = useSWR(`/api/posts`, fetcher); // Fetch posts data (no need for username)

  // Handle session loading state
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  // Handle unauthenticated or unauthorized users (non-admins)
  if (session.status === "unauthenticated" || session.data?.user?.role !== "admin") {
    router.push("/dashboard/login"); // Redirect to login if not authenticated or not admin
    return null;
  }

  // Handle form submission for adding a new post
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh
    const form = e.target as HTMLFormElement;

    // Type casting the inputs explicitly
    const title = (form[0] as HTMLInputElement).value;
    const desc = (form[1] as HTMLInputElement).value;
    const img = (form[2] as HTMLInputElement).value;
    const content = (form[3] as HTMLTextAreaElement).value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
        }),
      });
      mutate(); // Re-fetch data after submission
      form.reset(); // Clear form fields
    } catch (err) {
      console.log(err);
    }
  };

  // Handle post deletion
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate(); // Re-fetch data after deletion
    } catch (err) {
      console.log(err);
    }
  };

  // Render the dashboard for authenticated admin
  if (session.status === "authenticated" && session.data?.user?.role === "admin") {
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
    </div>
    );
  }

  return null;
};

export default Dashboard;
