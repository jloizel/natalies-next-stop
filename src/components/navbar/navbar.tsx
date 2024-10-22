import { useEffect, useState } from 'react';
import styles from "./navbar.module.css";
import Link from 'next/link';
import Search from '../search/search';
import { IoLogoInstagram } from "react-icons/io5";
import { signOut, useSession } from 'next-auth/react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust this value based on when you want the effect to trigger
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.navbarContainer} ${isScrolled ? styles.shrink : ''}`}>
      {/* Header Section */}
      <div className={`${styles.headerContainer} ${isScrolled ? styles.shrink : ''}`}>
        <Search />
        <div className={styles.headerContent}>
          <Link className={`${styles.header} ${isScrolled ? styles.shrinkedHeader : ''}`} href="/">
            <span>Natalie&apos;s</span>
            <span>Next Stop</span>
          </Link>
        </div>
        <div className={styles.headerRightContainer}>
          <div>
            Contact Me
          </div>
          <a href="https://www.instagram.com/nataliemills1" target='_blank'>
            <IoLogoInstagram className={styles.instaLogo} />
          </a>
        </div>
        {status === 'authenticated' && session && (
          <div className={styles.admin}>
            <Link href="/admin/dashboard">Dashboard</Link>
            <button onClick={() => signOut()} className={styles.button}>
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Navbar Section */}
      <div className={`${styles.navbar} ${isScrolled ? styles.hide : ''}`}>
        <Link href="/africa" className={styles.link}>AFRICA</Link>
        <Link href="/asia" className={styles.link}>ASIA</Link>
        <Link href="/australia" className={styles.link}>AUSTRALIA</Link>
        <Link href="/centralamerica" className={styles.link}>CENTRAL AMERICA</Link>
        <Link href="/europe" className={styles.link}>EUROPE</Link>
        <Link href="/northamerica" className={styles.link}>NORTH AMERICA</Link>
        <Link href="/southamerica" className={styles.link}>SOUTH AMERICA</Link>
      </div>
    </div>
  );
};

export default NavBar;
