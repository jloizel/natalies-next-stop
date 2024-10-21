import React, { useEffect, useState } from 'react';
import styles from "./instagramPosts.module.css";
import { IoLogoInstagram } from "react-icons/io5";
import { InstagramEmbed } from 'react-social-media-embed';
import { IoClose } from "react-icons/io5";

// Define types for the Post structure
interface Post {
  caption: string;
  imageUrl: string;
  postUrl: string; // Instagram post URL from the 4th column
}

const InstagramPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false); // State for modal
  const [currentPostUrl, setCurrentPostUrl] = useState<string | null>(null); // Track clicked post

  const SHEET_ID = '1gHaVaJ4zX58ZpMP1YRShMMyl_q_IXvduNjjQL7ktzJg';
  const API_KEY = 'AIzaSyBIxEDBas7_Rp-BWwZ96b9vk9SX7TRuZd4';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const rows: (string | null)[][] = data.values; // Define the type of rows

        // Assuming the first row is headers
        const extractedPosts: Post[] = rows.slice(1).map((row: (string | null)[]) => ({
          caption: row[0] || '', // Caption in the first column
          imageUrl: row[1] || '', // Image URL in the second column (no splitting needed)
          postUrl: row[3] || '' // Instagram post URL from the fourth column
        }));

        setPosts(extractedPosts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Get the latest 5 posts and reverse the order so the newest one is on the left
  const latestPosts = posts.slice(0, 5).reverse();

  // Function to open modal with the clicked post's URL
  const openModal = (postUrl: string) => {
    setCurrentPostUrl(postUrl);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentPostUrl(null);
  };

  return (
    <div className={styles.instaContainer}>
      <div className={styles.header}>
        <a className={styles.headerContent} href="https://www.instagram.com/nataliemills1" target='_blank'>
          <IoLogoInstagram className={styles.icon} />
          <span>My Recent Posts</span>
        </a>
        <a className={styles.instaHandle} href="https://www.instagram.com/nataliemills1" target='_blank'>
          @nataliemills1
        </a>
      </div>
      <div className={styles.gridContainer}>
        {latestPosts.map((post, index) => (
          <div 
            key={index} 
            className={styles.imageContainer} 
            onClick={() => openModal(post.postUrl)} // Open modal when image is clicked
          >
            <img 
              src={post.imageUrl} 
              alt={`Instagram post image ${index + 1}`} 
              className={styles.image} 
            />
            <div className={styles.captionOverlay}>
              <span className={styles.caption}>{post.caption}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for InstagramEmbed */}
      {modalOpen && currentPostUrl && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <IoClose className={styles.closeButton} onClick={closeModal} />
            <InstagramEmbed url={currentPostUrl} width={328} captioned />
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramPosts;
