import React from 'react'
import styles from "./header.module.css"
import Search from '../search/search'
import { IoLogoInstagram } from "react-icons/io5";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <Search/>
      <div className={styles.headerContent}>
        <a className={styles.header} href="/">
          <span>
            Natalie's
          </span>
          <span>
            Next Stop
          </span>
        </a>
        {/* <div className={styles.headerText}>
          I haven’t been everywhere, but it’s on my list
        </div> */}
      </div>
      <IoLogoInstagram className={styles.instaLogo}/>
    </div>
  )
}

export default Header