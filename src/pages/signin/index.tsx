"use client"; // Client-side

import React, { useEffect } from 'react';
import styles from './page.module.css';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const session = useSession();
  const router = useRouter();

  // Check if the user is already authenticated and redirect to dashboard if so
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push('/dashboard'); // Redirect to the dashboard
    }
  }, [session.status, router]); // Run this effect if session status changes

  // Show a loading state while session status is being checked
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  // Handle form submission for credentials login
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    const result = await signIn('credentials', { email, password, redirect: false }); // Use redirect: false to handle manually

    if (result?.error) {
      console.error(result.error); // Log the error for debugging
      alert('Invalid email or password'); // Alert the user about the error
    } else {
      // Successful login
      router.push('/dashboard'); // Redirect to the dashboard after login
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          required
        />
        <button className={styles.button}>Login</button>
      </form>
      <button onClick={() => signIn('google')} className={styles.button + ' ' + styles.google}>
        Login with Google
      </button>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
    </div>
  );
};

export default Login;
