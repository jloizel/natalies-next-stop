"use client"

import React, { useEffect, useRef, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostsByContinent, getPostsByContinentAndCountry, Post } from '../../../app/API';
import styles from "./country.module.css"
import { IoShareSocialOutline } from "react-icons/io5";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; 
import ShareMenu from '@/components/shareMenu/shareMenu';
import Link from 'next/link';


interface CountryPageProps {
  continent: string;
  country: string;
  posts: Post[];
}

// type Likes = {
//   [key: string]: number; 
// };

// type Views = {
//   [key: string]: number; 
// };

const POSTS_PER_PAGE = 10;

const CountryPage = ({ continent, country, posts }: CountryPageProps) => {
  const [showShareMenu, setShowShareMenu] = useState<string | null>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  // const [likes, setLikes] = useState<Likes>({});
  // const [views, setViews] = useState<Views>({});
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_country_page', {
        // continent: continent,
        country: country,
        page_path: window.location.pathname,
      });
    }
  }, [continent, country]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(null); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      throw error;
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


  const formatForURL = (country: string) => country.toLowerCase().replace(/\s+/g, '');

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={getCountryImage(country)} className={styles.image} />
        <div className={styles.header}>
          {country}
        </div>
      </div>
      <div className={styles.blogsContainer}>
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((blogPost) => {
            const fullText = getFullText(blogPost);
            const readingTime = calculateReadingTime(fullText);

            return (
              <div key={blogPost._id} className={styles.blogCard}>
                <div className={styles.blogCardLeft}>
                  <Link href={`/${formatForURL(continent)}/${formatForURL(country)}/${blogPost._id}`}>
                    <img src={blogPost.previewImage} className={styles.blogCardImage}/>
                  </Link>
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
                  <Link className={styles.blogText} href={`/${formatForURL(continent)}/${formatForURL(country)}/${blogPost._id}`}>
                    <div className={styles.blogTitle}>
                      {blogPost.title}
                    </div>
                    <div className={styles.blogIntroText}>
                      {truncateText(blogPost.introText, 150)}
                    </div>
                  </Link>
                  {/* <div className={styles.blogStats}>
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
                  </div> */}
                </div>
              </div>
            );
          })
        ) : (
          <p>No blogs available for {country}.</p>
        )}
      </div>
      <div className={styles.paginationContainer}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          Previous
        </button>
        <span className={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const continentMapping: { [key: string]: string } = {
  africa: 'Africa',
  asia: 'Asia',
  australasia: 'Australasia',
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
  const continents = ['Africa', 'Asia', 'Australasia', 'Europe', 'North America', 'Central America', 'South America'];
  const posts = await Promise.all(continents.map(continent => getPostsByContinent(continent)));

  const paths: { params: { continent: string; country: string } }[] = [];

  posts.forEach((continentPosts, index) => {
    continentPosts.forEach(post => {
      const continentPath = continents[index].toLowerCase().replace(/\s+/g, ''); 
      const countryPath = post.country.toLowerCase().replace(/\s+/g, '');       
      
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
