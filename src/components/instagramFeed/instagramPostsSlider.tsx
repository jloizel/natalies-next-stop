import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Import React Slick
import styles from './instagramPosts.module.css';
import { IoLogoInstagram, IoClose } from 'react-icons/io5';
import { InstagramEmbed } from 'react-social-media-embed';

// Define types for the Post structure
interface Post {
  caption: string;
  imageUrls: string[];
}

const InstagramPostsSlider: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string | null>(null); // Store the post URL for the modal

  const SHEET_ID = '1gHaVaJ4zX58ZpMP1YRShMMyl_q_IXvduNjjQL7ktzJg';
  const API_KEY = 'AIzaSyBIxEDBas7_Rp-BWwZ96b9vk9SX7TRuZd4';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const rows: (string | null)[][] = data.values; // Define the type of rows

        // Assuming the first row is headers
        const extractedPosts: Post[] = rows.slice(1).map((row: (string | null)[]) => ({
          caption: row[0] || '', // Caption in the first column
          imageUrls: row[2] ? row[2].split(',').map((url) => url.trim()) : [], // Split the URLs in the third column
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
  const allImages: { url: string; caption: string }[] = [];

  posts.forEach((post) => {
    post.imageUrls.forEach((url) => {
      allImages.push({ url, caption: post.caption });
    });
  });

  // Slider settings for the carousel
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,  // Tablet size
        settings: {
          slidesToShow: 3,  // Show 2 cards on tablets
        }
      },
      {
        breakpoint: 600,  // Mobile size
        settings: {
          slidesToShow: 2,  // Show 1 card on smaller devices
        }
      }
    ]
  };

  // Function to handle opening modal
  const openModal = (url: string) => {
    setModalUrl(url);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalUrl(null);
  };

  return (
    <div className={styles.instaSliderContainer}>
      <div className={styles.header}>
        <a className={styles.headerContent} href="https://www.instagram.com/nataliemills1" target='_blank'>
          <IoLogoInstagram className={styles.icon} />
          <span>My Recent Posts</span>
        </a>
      </div>
      <Slider {...sliderSettings}>
        {allImages.map((image, index) => (
          <div
            key={index}
            className={styles.imageContainer}
            onClick={() => openModal(image.url)} // Open modal on image click
          >
            <img
              src={image.url}
              alt={`Instagram post image ${index + 1}`}
              style={{ width: '100%', height: 'auto', transition: '0.3s ease' }}
            />
            <div className={styles.captionOverlay}>
              <span className={styles.caption}>{image.caption}</span>
            </div>
          </div>
        ))}
      </Slider>

      {isModalOpen && modalUrl && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <InstagramEmbed url={modalUrl} width={328} captioned />
          </div>
          <button className={styles.closeButton} onClick={closeModal}>
            <IoClose />
          </button>
        </div>
      )}
    </div>
  );
};

export default InstagramPostsSlider;
