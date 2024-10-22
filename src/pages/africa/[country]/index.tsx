"use client"

import React, { useEffect, useRef, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostsByContinent, getPostsByContinentAndCountry, Post } from '../../../app/API';
import styles from "./country.module.css"
import { IoShareSocialOutline } from "react-icons/io5";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';
import { IoIosLink } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; 


interface CountryPageProps {
  country: string;
  posts: Post[];
}

type Likes = {
  [key: string]: number; 
};

type Views = {
  [key: string]: number; 
};

const CountryPage = ({ country, posts }: CountryPageProps) => {
  const [showShareMenu, setShowShareMenu] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const [likes, setLikes] = useState<Likes>({});
  const [views, setViews] = useState<Views>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(null); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  const getCountryImage = (country: string) => {
    const postForCountry = posts.find(post => post.country === country && post.countryImage);
    return postForCountry ? postForCountry.countryImage : '/images/default-country.jpg'; // Default image for missing images
  };

  // const formatCreatedAt = (createdAt: string) => {
  //   const date = new Date(createdAt);
  //   const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  //   return new Intl.DateTimeFormat('en-US', options).format(date);
  // };

  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  const getFullText = (blogPost: Post) => {
    let text = blogPost.introText || '';
    blogPost.subsections.forEach(subsection => {
      text += ' ' + subsection.text;
      subsection.contentBlocks.forEach(block => {
        if (block.type === 'text' && block.content) {
          text += ' ' + block.content;
        }
      });
    });
    return text;
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);  // Hide the copied message after 5 seconds
      });
    }
  };

  const handleShare = async (post: Post) => {
    try {
      if (navigator.share && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        await navigator.share({
          title: post.title,
          text: `Check out this blog post: ${post.title}`,
          url: window.location.href,
        });
      } else {
        setShowShareMenu(prev => (prev === post._id ? null : post._id));
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text || text.length === 0) {
      return ''; 
    }
  
    text = text.replace(/^"/, '');
  
    if (text.length <= maxLength) {
      return text;
    }
  
    return text.slice(0, maxLength) + '...';
  };

  const hasLiked = (postId: string) => {
    if (typeof window === 'undefined') return false; // Check if running in browser
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    return likedPosts.includes(postId);
  };

  // Function to handle liking and unliking a post
  const handleLike = (postId: string) => {
    if (typeof window === 'undefined') return; // Check if running in browser

    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');

    if (likedPosts.includes(postId)) {
      // User is unliking the post
      const updatedLikes = likes[postId] > 0 ? likes[postId] - 1 : 0; // Decrement like count
      setLikes(prevLikes => ({
        ...prevLikes,
        [postId]: updatedLikes,
      }));

      // Remove the postId from localStorage
      const updatedLikedPosts = likedPosts.filter((id: string) => id !== postId);
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
    } else {
      // User is liking the post
      setLikes(prevLikes => ({
        ...prevLikes,
        [postId]: (prevLikes[postId] || 0) + 1, // Increment like count
      }));

      // Add the postId to localStorage
      likedPosts.push(postId);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }
  };

  // Function to handle view count
  const incrementViewCount = (postId: string) => {
    if (typeof window === 'undefined') return; // Check if running in browser

    const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts') || '[]');
    
    if (!viewedPosts.includes(postId)) {
      // If the post hasn't been viewed before, increment the view count
      setViews(prevViews => ({
        ...prevViews,
        [postId]: (prevViews[postId] || 0) + 1,
      }));

      // Add the postId to localStorage
      viewedPosts.push(postId);
      localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
    }
  };

  // Effect to initialize likes and views based on localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure we're in the browser
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts') || '[]');
      const initialLikes: Likes = {};
      const initialViews: Views = {};

      posts.forEach(post => {
        initialLikes[post._id] = likedPosts.includes(post._id) ? 1 : 0; // Set like count based on localStorage
        initialViews[post._id] = viewedPosts.includes(post._id) ? 1 : 0; // Set initial view count to 1 if viewed before
      });

      setLikes(initialLikes);
      setViews(initialViews);
    }
  }, [posts]);

  useEffect(() => {
    posts.forEach(post => {
      incrementViewCount(post._id);
    });
  }, [posts]);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={getCountryImage(country)} className={styles.image} />
      </div>
      <div className={styles.header}>
        {country}
      </div>
      <div className={styles.blogsContainer}>
        {posts.length > 0 ? (
          posts.map((blogPost) => {
            const fullText = getFullText(blogPost);
            const readingTime = calculateReadingTime(fullText);
            const currentLikes = likes[blogPost._id] || 0;
            const currentViews = views[blogPost._id] || 0;

            return (
              <div key={blogPost._id} className={styles.blogCard}>
                <div key={blogPost._id} className={styles.blogCard}>
                  <div className={styles.blogCardLeft}>
                    <a href={`/africa/${country.toLowerCase()}/${blogPost._id}`}>
                      <img src={blogPost.previewImage} className={styles.blogCardImage}/>
                    </a>
                  </div>
                  <div className={styles.blogCardRight}>
                    <div className={styles.blogDetails}>
                      <div className={styles.blogDetailsLeft}>
                      <span>{blogPost.desc}</span>
                        <span>•</span>
                        <span>{readingTime} min read</span>
                      </div>
                      <div className={styles.shareButtonContainer}>
                        <button onClick={() => handleShare(blogPost)} className={styles.shareButton}>
                          <IoShareSocialOutline />
                        </button>
                        {showShareMenu === blogPost._id && (
                          <div ref={shareMenuRef} className={styles.shareMenu}>
                            <div className={styles.logoContainer}>
                              <FacebookShareButton url={shareUrl} title={blogPost.title}>
                                <FacebookIcon round className={styles.shareIcon} />
                              </FacebookShareButton>
                              <TwitterShareButton url={shareUrl} title={blogPost.title}>
                                <TwitterIcon size={32} round />
                              </TwitterShareButton>
                              <LinkedinShareButton url={shareUrl} title={blogPost.title}>
                                <LinkedinIcon size={32} round />
                              </LinkedinShareButton>
                              <WhatsappShareButton url={shareUrl} title={blogPost.title}>
                                <WhatsappIcon size={32} round />
                              </WhatsappShareButton>
                              <div className={styles.linkIconContainer}>
                                <IoIosLink onClick={copyLink} className={styles.shareLink} />
                                {copied && <span className={styles.copiedMessage}>Link copied!</span>}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <a className={styles.blogText} href={`/africa/${country.toLowerCase()}/${blogPost._id}`}>
                      <div className={styles.blogTitle}>
                        {blogPost.title}
                      </div>
                      <div className={styles.blogIntroText}>
                        {truncateText(blogPost.introText, 150)}
                      </div>
                    </a>
                    <div className={styles.blogStats}>
                      <span className={styles.stat}>{currentViews} views</span>
                      <div className={styles.likesContainer}>
                        <button onClick={() => handleLike(blogPost._id)} className={styles.likeButton}>
                          {hasLiked(blogPost._id) ? (
                            <AiFillHeart className={styles.filledHeart} />
                          ) : (
                            <AiOutlineHeart className={styles.outlineHeart} />
                          )}
                        </button>
                        <span className={styles.stat}>{currentLikes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No blogs available for {country}.</p>
        )}
      </div>
    </div>
  );
};

// Fetch posts for the given country
export const getStaticProps: GetStaticProps = async (context) => {
  const { country } = context.params as { country: string };

  // Fetch all posts for Africa to match the lowercase country with the correct capitalized name
  const postsInAfrica = await getPostsByContinent('Africa');

  // Find the correct country name by matching the lowercase version
  const correctCountryName = postsInAfrica.find(post => post.country.toLowerCase() === country)?.country;

  if (!correctCountryName) {
    // If the country is not found, return a 404 page
    return {
      notFound: true,
    };
  }

  // Fetch posts for the specific country with the correct case
  const posts = await getPostsByContinentAndCountry('Africa', correctCountryName);

  return {
    props: {
      country: correctCountryName, // Use the correctly cased country name in the props
      posts,
    },
    revalidate: 10, // Optional: Set revalidation for incremental static regeneration
  };
};

// Generate dynamic paths for countries with blogs in Africa
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all posts in Africa to get a list of countries with posts
  const posts = await getPostsByContinent('Africa');

  // Create a set to ensure countries are unique
  const countriesSet = new Set<string>();

  // Loop through each post and add the country to the set
  posts.forEach(post => countriesSet.add(post.country));

  // Convert the set back to an array and create paths
  const paths = Array.from(countriesSet).map(country => ({
    params: { country }
  }));

  return {
    paths,
    fallback: 'blocking', // Use 'blocking' or 'true' for dynamic pages
  };
};

export default CountryPage;
