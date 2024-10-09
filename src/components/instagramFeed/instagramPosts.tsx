import React, { useEffect, useState } from 'react';
import styles from "./instagramPosts.module.css";
import { IoLogoInstagram } from "react-icons/io5";
import { InstagramEmbed } from 'react-social-media-embed';
import { IoClose } from "react-icons/io5";

// Define types for the Post structure
interface Post {
  caption: string;
  imageUrls: string[];
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
            imageUrls: row[2] ? row[2].split(',').map(url => url.trim()) : [], // Split the URLs in the third column
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Create a single array for all images and their captions
  const allImages: { url: string; caption: string; postUrl: string }[] = [];

  posts.forEach(post => {
    post.imageUrls.forEach(url => {
        allImages.push({ url, caption: post.caption, postUrl: post.postUrl });
    });
  });

  // Get the latest 5 images only
  const latestImages = allImages.slice(0, 5);

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
      </div>
      <div className={styles.gridContainer}>
        {latestImages.map((image, index) => (
          <div 
            key={index} 
            className={styles.imageContainer} 
            onClick={() => openModal(image.postUrl)} // Open modal when image is clicked
          >
            <img 
              src={image.url} 
              alt={`Instagram post image ${index + 1}`} 
              className={styles.image} 
            />
            <div className={styles.captionOverlay}>
              <span className={styles.caption}>{image.caption}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for InstagramEmbed */}
      {modalOpen && currentPostUrl && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <IoClose className={styles.closeButton} onClick={closeModal}/>
            <InstagramEmbed url={currentPostUrl} width={328} captioned />
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramPosts;
