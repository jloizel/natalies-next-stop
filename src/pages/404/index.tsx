import React from 'react';
import { useRouter } from 'next/router';
import styles from './404.module.css';

const Custom404 = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <button className={styles.button} onClick={handleGoHome}>
        Go Back Home
      </button>
    </div>
  );
};

Custom404.noLayout = true;

export default Custom404;
