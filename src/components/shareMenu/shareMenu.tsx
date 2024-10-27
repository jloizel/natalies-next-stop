// components/ShareMenu.tsx

import React, { useState, useRef, useEffect } from 'react';
import { IoIosLink } from "react-icons/io";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';
import styles from "./shareMenu.module.css";

interface ShareMenuProps {
  postTitle: string;
  showShareMenu: boolean;
  toggleShareMenu: () => void;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ postTitle, showShareMenu, toggleShareMenu }) => {
  const [copied, setCopied] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);  // Hide copied message after 5 seconds
      });
    }
  };

  // Close menu if click is outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        toggleShareMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggleShareMenu]);

  return (
    <div ref={shareMenuRef} className={`${styles.shareMenu} ${showShareMenu ? styles.visible : ''}`}>
      <div className={styles.logoContainer}>
        <FacebookShareButton url={shareUrl} title={postTitle}>
          <FacebookIcon round className={styles.shareIcon} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={postTitle}>
          <TwitterIcon round className={styles.shareIcon}/>
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={postTitle}>
          <LinkedinIcon round className={styles.shareIcon}/>
        </LinkedinShareButton>
        <WhatsappShareButton url={shareUrl} title={postTitle}>
          <WhatsappIcon round className={styles.shareIcon}/>
        </WhatsappShareButton>
        <div className={styles.linkIconContainer}>
          <IoIosLink onClick={copyLink} className={styles.shareLink} />
          {copied && <span className={styles.copiedMessage}>Link copied!</span>}
        </div>
      </div>
    </div>
  );
};

export default ShareMenu;
