"use client";

import React, { useState, useEffect } from 'react';
import { getAllPosts, deletePost, Post } from '../../../../app/API';
import { useRouter } from 'next/navigation';
import styles from './manage.module.css';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoSearch } from "react-icons/io5";
import withAuth from '@/utils/withAuth';

const ManagePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; 
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getAllPosts();
        // Sort posts by the updatedAt date in descending order (most recent first)
        const sortedPosts = data.sort((a: Post, b: Post) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts); // Initialize filtered posts with the sorted list
      } catch {
        setError('Error fetching posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await deletePost(id);
      setPosts(posts.filter(post => post._id !== id));
      setFilteredPosts(filteredPosts.filter(post => post._id !== id));
    } catch (err) {
      // console.error('Error deleting post:', err); 
      setError('Error deleting post.');
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/dashboard/edit/${id}`);
  };

  const calculateDaysAgo = (updatedAt: string) => {
    const postedDate = new Date(updatedAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - postedDate.getTime();
    return Math.floor(timeDifference / (1000 * 3600 * 24));
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  // Search logic: Filter posts by title, continent, or country
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.continent.toLowerCase().includes(query) ||
      post.country.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  // Pagination component
  const Pagination = ({ totalPosts, postsPerPage, paginate }: { totalPosts: number, postsPerPage: number, paginate: (pageNumber: number) => void }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className={styles.pagination}>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className={styles.pageLink}>
            {number}
          </button>
        ))}
      </nav>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.navButtonContainer}>
        <button onClick={() => router.push('/admin/dashboard')} className={styles.navButton}>
          <FaArrowLeftLong /> Back to dashboard
        </button>
      </div>
      <div className={styles.header}>
        Manage your posts
      </div>

      <div className={styles.searchContainer}>
        <IoSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search by title, continent, or country"
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className={styles.posts}>
          {currentPosts.length > 0 ? (
            currentPosts.map(post => (
              <div key={post._id} className={styles.post}>
                <div className={styles.postTop}>
                  <div className={styles.postTitle}>{post.title}</div>
                  <div className={styles.postLabels}>
                    <div className={styles.label}>{post.continent}</div>
                    <div className={styles.label}>{post.country}</div>
                  </div>
                </div>
                <div className={styles.postBottom}>
                  <div className={styles.postedDate}>
                    {calculateDaysAgo(post.updatedAt)} days ago
                  </div>
                  <div className={styles.buttonContainer}>
                    <button onClick={() => handleEdit(post._id)} className={styles.editButton}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(post._id)} className={styles.deleteButton}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        totalPosts={filteredPosts.length}
        postsPerPage={postsPerPage}
        paginate={handlePageChange}
      />
    </div>
  );
};

export default withAuth(ManagePosts);
