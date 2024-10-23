"use client";

import React, { useState, useEffect } from "react";
import { getAllPosts, Post } from "../../app/API";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
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

  // Handle post click to navigate to post page
  const handlePostClick = (country: string, postId: string) => {
    router.push(`/europe/${country.toLowerCase()}/${postId}`); // Convert country to lowercase for URL
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "short", // Use 'short' for abbreviated month names
      day: "2-digit", // Use '2-digit' to always show two digits for the day
    };
    return date.toLocaleDateString(undefined, options).replace(",", "");
  };

  return (
    <div className={styles.latestPostsContainer}>
      <div className={styles.latestPostsHeader}>
        📖 Read my recent travel blogs
      </div>

      {/* Mobile Slider for posts */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1} // Show 1 slide per view on mobile
        breakpoints={{
          600: {
            slidesPerView: 2, // Show 2 posts on screens wider than 600px
          },
          900: {
            slidesPerView: 3, // Show 3 posts on screens wider than 900px
          },
          1200: {
            slidesPerView: 4, // Show 4 posts on larger screens
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
                  onClick={() => handlePostClick(post.country, post._id)}
                >
                  <img
                    src={post.previewImage}
                    alt={post.title}
                    className={styles.postImage}
                  />
                  <div className={styles.overlayContainer}>
                    <div className={styles.postContent}>
                      <p className={styles.createdAt}>
                        {formatDate(post.createdAt.toString())}
                      </p>
                      <div className={styles.postTitle}>{post.title}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          : ""}
      </Swiper>
    </div>
  );
};

export default LatestPostsSlider;