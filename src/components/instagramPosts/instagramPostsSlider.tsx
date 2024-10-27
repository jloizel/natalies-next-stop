import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; 
import styles from './instagramPosts.module.css';
import { IoLogoInstagram, IoClose } from 'react-icons/io5';
import { InstagramEmbed } from 'react-social-media-embed';
import { getInstagramPosts } from '@/app/API';

interface Post {
  caption: string;
  imageUrl: string;
  postUrl: string; 
}

const InstagramPostsSlider: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string | null>(null); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getInstagramPosts();
        
        const extractedPosts: Post[] = fetchedPosts.map((post: any) => ({
          caption: post.caption || '',         
          imageUrl: post.media_url || '',      
          postUrl: post.permalink || ''        
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

    // Initial call to fetch posts and refresh token
    const initializePosts = async () => {
      // await refreshInstagramToken(); 
      fetchPosts();
    };

    initializePosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Get the latest 5 posts and reverse the order so the newest one is on the left
  const latestPosts = posts.slice(0, 5).reverse();

  // Slider settings for the carousel
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,  // Tablet size
        settings: {
          slidesToShow: 2,  // Show 2 cards on tablets
        }
      },
      {
        breakpoint: 600,  // Mobile size
        settings: {
          slidesToShow: 1,  // Show 1 card on smaller devices
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
        <a className={styles.instaHandle} href="https://www.instagram.com/nataliemills1" target='_blank'>
          @nataliemills1
        </a>
      </div>
      <Slider {...sliderSettings}>
        {latestPosts.map((post, index) => (
          <div
            key={index}
            className={styles.imageContainer}
            onClick={() => openModal(post.postUrl)} // Open modal on image click
          >
            <img
              src={post.imageUrl}
              alt={`Instagram post image ${index + 1}`}
              style={{ width: '100%', height: 'auto', transition: '0.3s ease' }}
            />
            <div className={styles.captionOverlay}>
              <span className={styles.caption}>{post.caption}</span>
            </div>
          </div>
        ))}
      </Slider>

      {isModalOpen && modalUrl && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <IoClose className={styles.closeButton} onClick={closeModal} />
            <InstagramEmbed url={modalUrl} width={328} captioned />
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramPostsSlider;
