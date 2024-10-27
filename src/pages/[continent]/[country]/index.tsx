"use client"

import React, { useEffect, useRef, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostsByContinent, getPostsByContinentAndCountry, Post } from '../../../app/API';
import styles from "./country.module.css"
import { IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; 
import ShareMenu from '@/components/shareMenu/shareMenu';


interface CountryPageProps {
  continent: string;
  country: string;
  posts: Post[];
}

type Likes = {
  [key: string]: number; 
};

type Views = {
  [key: string]: number; 
};

const CountryPage = ({ continent, country, posts }: CountryPageProps) => {
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleShareMenu = (postId: string) => {
    setShowShareMenu(prev => (prev === postId ? null : postId));
  };
  

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

  const handleShare = async (postId: string, postTitle: string) => {
    try {
      // Use native sharing on supported mobile devices
      if (navigator.share && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        await navigator.share({
          title: postTitle,
          text: `Check out this blog post: ${postTitle}`,
          url: window.location.href,
        });
      } else {
        // Toggle custom share menu
        setShowShareMenu((prev) => (prev === postId ? null : postId));
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

  const formatForURL = (country: string) => country.toLowerCase().replace(/\s+/g, '');

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
                <div className={styles.blogCardLeft}>
                  <a href={`/${formatForURL(continent)}/${formatForURL(country)}/${blogPost._id}`}>
                    <img src={blogPost.previewImage} className={styles.blogCardImage}/>
                  </a>
                </div>
                <div className={styles.blogCardRight}>
                  <div className={styles.blogDetails}>
                    <div className={styles.blogDetailsLeft}>
                      {/* <span>{formatCreatedAt(blogPost.createdAt)}</span> */}
                      <span>{blogPost.desc}</span>
                      <span>•</span>
                      <span>{readingTime} min read</span>
                    </div>
                    <div className={styles.shareButtonContainer}>
                      <button onClick={() => handleShare(blogPost._id, blogPost.title)} className={styles.shareButton}>
                        <IoShareSocialOutline />
                      </button>
                      {showShareMenu === blogPost._id && (
                        <ShareMenu
                          postTitle={blogPost.title}
                          showShareMenu={showShareMenu === blogPost._id}
                          toggleShareMenu={() => setShowShareMenu(null)}
                        />
                      )}
                    </div>
                  </div>
                  <a className={styles.blogText} href={`/${formatForURL(continent)}/${formatForURL(country)}/${blogPost._id}`}>
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
            );
          })
        ) : (
          <p>No blogs available for {country}.</p>
        )}
      </div>
    </div>
  );
};

const continentMapping: { [key: string]: string } = {
  africa: 'Africa',
  asia: 'Asia',
  australia: 'Australia',
  europe: 'Europe',
  northamerica: 'North America',
  centralamerica: 'Central America',
  southamerica: 'South America',
};

// Fetch posts for the given continent and country
export const getStaticProps: GetStaticProps = async (context) => {
  const { continent, country } = context.params as { continent: string; country: string };

  // Use the mapping to get the proper continent name
  const continentName = continentMapping[continent.toLowerCase()];

  if (!continentName) {
    return { notFound: true };
  }

  // Retrieve posts for the entire continent
  const postsInContinent = await getPostsByContinent(continentName);

  // Find correct country name by ignoring spaces and case
  const correctCountryName = postsInContinent.find(
    post => post.country.toLowerCase().replace(/\s+/g, '') === country
  )?.country;

  if (!correctCountryName) {
    return { notFound: true };
  }

  // Retrieve posts specific to the country
  const posts = await getPostsByContinentAndCountry(continentName, correctCountryName);

  return {
    props: {
      continent: continentName,
      country: correctCountryName,
      posts,
    },
    revalidate: 10,
  };
};


// Generate dynamic paths for countries with blogs in all continents
export const getStaticPaths: GetStaticPaths = async () => {
  const continents = ['Africa', 'Asia', 'Australia', 'Europe', 'North America', 'Central America', 'South America'];
  const posts = await Promise.all(continents.map(continent => getPostsByContinent(continent)));

  const paths: { params: { continent: string; country: string } }[] = [];

  posts.forEach((continentPosts, index) => {
    continentPosts.forEach(post => {
      const continentPath = continents[index].toLowerCase().replace(/\s+/g, ''); 
      const countryPath = post.country.toLowerCase().replace(/\s+/g, '');       
      
      console.log("Generated path:", `/${continentPath}/${countryPath}`);
      paths.push({
        params: { continent: continentPath, country: countryPath },
      });
    });
  });

  return {
    paths,
    fallback: 'blocking',
  };
};



export default CountryPage;
