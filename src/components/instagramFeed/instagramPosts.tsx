import React, { useEffect, useState } from 'react';
import styles from "./instagramPosts.module.css";
import { IoLogoInstagram } from "react-icons/io5";
import { InstagramEmbed } from 'react-social-media-embed';
import { IoClose } from "react-icons/io5";
import { getInstagramPosts, refreshInstagramToken } from '@/app/API'; // Import API functions

// Define types for the Post structure
interface Post {
  caption: string;
  imageUrl: string;
  postUrl: string;
}

const InstagramPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentPostUrl, setCurrentPostUrl] = useState<string | null>(null);

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

    const initializePosts = async () => {
      // await refreshInstagramToken(); 
      fetchPosts();
    };

    initializePosts();
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
            onClick={() => openModal(post.postUrl)} 
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
