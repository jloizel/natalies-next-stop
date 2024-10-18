"use client";

import React from 'react';
import styles from './dashboard.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import withAuth from '@/utils/withAuth';

export const Dashboard = () => {
  const session = useSession();
  const router = useRouter();


  // Handle session loading state
  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }

  // Handle unauthenticated or unauthorized users (non-admins)
  if (session.status === 'unauthenticated' || session.data?.user?.role !== 'admin') {
    router.push('/admin/login'); // Redirect to login if not authenticated or not admin
    return null;
  }


  // Render the dashboard for authenticated admin
  if (session.status === 'authenticated' && session.data?.user?.role === 'admin') {
    return (
      <div className={styles.container}>
        <div className={styles.header}>Admin Dashboard</div>
        <div className={styles.contentContainer}>
          <div className={styles.content} onClick={() => router.push('/admin/dashboard/create')}>
            <span>
              Create a new post
            </span>
            <div  className={styles.click}>
              Click me
            </div>
          </div>
          <div className={styles.content} onClick={() => router.push('/admin/dashboard/manage')}>
            <span>
              Manage your existing posts
            </span>
            <button  className={styles.click}>
              Click me
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default withAuth(Dashboard);
