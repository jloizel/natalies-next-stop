"use client";

import React from 'react';
import styles from './contact.module.css'
import { MdPhoneEnabled } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import ContactForm from './contactForm/contactForm';

export default function Contact() {
 
  return (
    <div className={styles.contactContainer} id="contact">
        <div className={styles.header}>
          Get in Touch
        </div>
      <div className={styles.content}>
        <div className={styles.contactForm}>
          <span>Send me an email<span style={{color: "#E18EEC"}}>.</span></span>
          <ContactForm/>
        </div>
        <div className={styles.contactDetailsContainer}>
          <span>Contact details<span style={{color: "#E18EEC"}}>.</span></span>
          <div className={styles.contactDetails}>
            <a className={styles.detail} href="tel: +447478218859" target="_blank">
              <MdPhoneEnabled className={styles.icon}/>
              +447478218859
            </a>
            <a className={styles.detail} href="mailto: loizeljack@gmail.com">
              <MdOutlineMail className={styles.icon}/>
              loizeljack@gmail.com
            </a>
            <a className={styles.detail} href="https://www.linkedin.com/in/jackloizel/" target="_blank">
              <FaLinkedin className={styles.icon}/>
              in/jackloizel
            </a>
          </div>
        </div>
      </div>
    </div>
    
  );
}