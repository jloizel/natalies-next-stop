"use client";

import React from 'react';
import styles from './contact.module.css'
import ContactForm from '../../components/contactForm/contactForm';

export default function Contact() {
 
  return (
    <div className={styles.wrapper}>
      <div className={styles.contactContainer}>
        <div className={styles.content}>
          <div className={styles.header}>
            Get in touch
          </div>
          <div className={styles.text}>
            I&apos;m thrilled you&apos;re here! If you have thoughts to share, questions to ask, or just want to say hello, I&apos;d love to hear from you. Whether you&apos;re curious about a post, want to share your own experiences, or just feel like chatting about your favorite travel destinations, my inbox is always open!
          </div>
        </div>
        <div className={styles.contactForm}>
          <ContactForm/>
        </div>
      </div>
    </div>
  );
}