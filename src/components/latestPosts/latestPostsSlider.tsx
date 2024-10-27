"use client";

import React, { useState, useEffect } from "react";
import { getAllPosts, Post } from "../../app/API";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./latestPostsSlider.module.css";

const LatestPostsSlider = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(""); // Reset error before fetching
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
        setError("Error fetching posts: " + (err as Error).message); // Provide context
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatForURL = (string: string) => string.toLowerCase().replace(/\s+/g, '');

  // Handle post click to navigate to post page
  const handlePostClick = (continent:string, country: string, postId: string) => {
    router.push(`/${formatForURL(continent)}/${formatForURL(country)}/${postId}`);
  };

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   const options: Intl.DateTimeFormatOptions = {
  //     month: "short", 
  //     day: "2-digit", 
  //   };
  //   return date.toLocaleDateString(undefined, options).replace(",", "");
  // };

  return (
    <div className={styles.latestPostsContainer}>
      <div className={styles.latestPostsHeader}>
        📖 Read my recent travel blogs
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <Swiper
          spaceBetween={20}
          slidesPerView={1} 
          breakpoints={{
            600: {
              slidesPerView: 2, 
            },
            900: {
              slidesPerView: 3, 
            },
            1200: {
              slidesPerView: 4, 
            },
          }}
          pagination={{ clickable: true }}
          className={styles.sliderContainer}
        >
          {posts.length > 0
            ? posts.slice(0, 5).map((post) => (
                <SwiperSlide key={post._id}>
                  <div
                    className={styles.latestPost}
                    onClick={() => handlePostClick(post.continent, post.country, post._id)}
                  >
                    <img
                      src={post.previewImage}
                      alt={post.title}
                      className={styles.postImage}
                    />
                    <div className={styles.overlayContainer}>
                      <div className={styles.postContent}>
                        {/* <p className={styles.createdAt}>{formatDate(post.createdAt.toString())}</p> */}
                        <span className={styles.createdAt}>{post.desc}</span>
                        <div className={styles.postTitle}>{post.title}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : ""}
        </Swiper>
      )}
    </div>
  );
};

export default LatestPostsSlider;
