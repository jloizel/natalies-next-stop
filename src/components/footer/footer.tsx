import React from 'react'
import styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.top}>
        <img className={styles.image} src="/images/footer.png"/>
        <div className={styles.content}>
          <div className={styles.header}>
            About Me
          </div>
          <div className={styles.text}>
            I&apos;m Natalie and as someone who loves travel and exploring new places, I&apos;m excited to share my recommendations and experiences through this blog to inspire your next adventure!
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
      </div>
      <div className={styles.copyright}>© Natalie&apos;s Next Stop 2024</div>
    </div>
  )
}

export default Footer