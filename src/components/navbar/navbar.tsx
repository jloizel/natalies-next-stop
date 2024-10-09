import { useEffect, useState } from 'react';
import styles from "./navbar.module.css";
import Link from 'next/link';
import Search from '../search/search';
import { IoLogoInstagram } from "react-icons/io5";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div className={`${styles.headerContainer} ${isScrolled ? styles.shrink : ''}`}>
        <Search />
        <div className={styles.headerContent}>
          <a className={styles.header} href="/">
            <span>Natalie's</span>
            <span>Next Stop</span>
          </a>
        </div>
        <IoLogoInstagram className={styles.instaLogo} />
      </div>
      <div className={`${styles.navbar} ${isScrolled ? styles.hide : ''}`}>
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
