import { useEffect, useState } from 'react';
import styles from "./navbar.module.css";
import Link from 'next/link';
import Search from '../search/search';
import { IoLogoInstagram } from "react-icons/io5";
import { signOut, useSession } from 'next-auth/react';
import { IoMailOutline } from "react-icons/io5";


const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

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
          <Link className={styles.contact} href="/contact">
            <IoMailOutline className={styles.email}/>
          </Link>
          <a href="https://www.instagram.com/nataliemills1" target='_blank'>
            <IoLogoInstagram className={styles.instaLogo} />
          </a>
        </div>
        {status === 'authenticated' && session && (
          <div className={styles.admin}>
            <Link href="/admin/dashboard" className={styles.dashboard}>Dashboard</Link>
            <button onClick={() => signOut()} className={styles.button}>
              Sign Out
            </button>
          </div>
        )}
      </div>

      <div className={`${styles.navbar} ${isScrolled ? styles.hide : ''}`}>
        <div className={styles.linkContainer}>
          <Link href="/africa" className={styles.link}>AFRICA</Link>
          <Link href="/asia" className={styles.link}>ASIA</Link>
          <Link href="/australiasia" className={styles.link}>AUSTRALIASIA</Link>
          <Link href="/centralamerica" className={styles.link}>CENTRAL AMERICA</Link>
        </div>
        <div className={styles.linkContainer}>
          <Link href="/europe" className={styles.link}>EUROPE</Link>
          <Link href="/northamerica" className={styles.link}>NORTH AMERICA</Link>
          <Link href="/southamerica" className={styles.link}>SOUTH AMERICA</Link>
        </div>
        
        
      </div>
    </div>
  );
};

export default NavBar;
