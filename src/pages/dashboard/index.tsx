"use client";

import React from 'react';
import styles from './dashboard.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const Dashboard = () => {
  const session = useSession();
  const router = useRouter();


  // Handle session loading state
  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }

  // Handle unauthenticated or unauthorized users (non-admins)
  if (session.status === 'unauthenticated' || session.data?.user?.role !== 'admin') {
    router.push('/dashboard/signin'); // Redirect to login if not authenticated or not admin
    return null;
  }


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
      </div>
    );
  }

  return null;
};

export default Dashboard;
