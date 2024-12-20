"use client"

import React, { useEffect, useRef, useState } from 'react';
import styles from "./search.module.css";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5"; 
import { getAllPosts, Post } from '@/app/API';
import Link from 'next/link';

const Search = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isExpanded, setIsExpanded] = useState(false); 
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch {
        setError('Error fetching posts.');
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.continent.toLowerCase().includes(query) ||
      post.country.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  };

  const handleIconClick = () => {
    setIsExpanded(!isExpanded); 
  };

  const handleClearInput = () => {
    setSearchQuery(''); 
    setFilteredPosts([]); 
  };

  const handleClickOutside = (e: MouseEvent) => {
    // Check if the clicked element is outside the search container and the input is empty
    if (
      containerRef.current && 
      !containerRef.current.contains(e.target as Node) &&
      searchQuery.trim() === ''
    ) {
      setIsExpanded(false); 
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); 
    };
  }, [isExpanded, searchQuery]);

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <div
        className={`${styles.searchInputContainer} ${isExpanded ? styles.expanded : ''}`}
      >
        <IoSearch className={styles.searchIcon} onClick={handleIconClick} />
        <input
          type="text"
          placeholder="Search by title, continent, or country"
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
          style={{ display: isExpanded ? 'block' : 'none' }} 
        />

        {/* Clear button (X) visible only when there's input */}
        {searchQuery && (
          <IoClose className={styles.clearIcon} onClick={handleClearInput} />
        )}
      </div>
      
      {/* {loading && <p>Loading posts...</p>} */}
      {error && <p className={styles.error}>{error}</p>}

      {searchQuery.length > 0 && (
        <div className={styles.resultsContainer}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link key={post._id} className={styles.postCard} href={`/${post.continent.toLowerCase()}/${post.country.toLowerCase()}/${post._id}`}>
                <div className={styles.imageContainer}>
                  <img 
                    src={post.previewImage} 
                    className={styles.postImage} 
                  />
                </div>
                <div className={styles.postText}>
                  <div className={styles.postTitle}>{post.title}</div>
                  <div className={styles.postIntroText}>{post.introText}</div>
                </div>
              </Link>
            ))
          ) : (
            <p>No posts found matching your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
