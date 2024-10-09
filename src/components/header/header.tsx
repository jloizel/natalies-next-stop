import React from 'react'
import styles from "./header.module.css"
import Search from '../search/search'
import { IoLogoInstagram } from "react-icons/io5";
import Link from 'next/link';

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <Search/>
      <div className={styles.headerContent}>
        <Link className={styles.header} href="/">
          <span>
            Natalie&apos;s
          </span>
          <span>
            Next Stop
          </span>
        </Link>
        {/* <div className={styles.headerText}>
          I haven’t been everywhere, but it’s on my list
        </div> */}
      </div>
      <IoLogoInstagram className={styles.instaLogo}/>
    </div>
  )
}

export default Header