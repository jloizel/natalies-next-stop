"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPostById, updatePost, PostInput } from '../../../../app/API'; // Ensure the import paths are correct
import styles from './edit.module.css';

const EditPost = () => {
  const router = useRouter();
  const params = useParams(); // Grab the params object
  const id = params?.id as string;
  const [post, setPost] = useState<PostInput>({
    countryImage: "",
    title: '',
    desc: '',
    introText: '',
    previewImage: "",
    introImage: '', // For intro image URL
    subsections: [], // Initialize subsections as an empty array
    continent: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch post by ID when the component loads
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const fetchedPost = await getPostById(id);
        if (fetchedPost) {
          setPost({
            countryImage: fetchedPost.countryImage,
            title: fetchedPost.title,
            desc: fetchedPost.desc,
            previewImage: fetchedPost.previewImage,
            introText: fetchedPost.introText,
            introImage: fetchedPost.introImage,
            subsections: fetchedPost.subsections || [],
            continent: fetchedPost.continent,
            country: fetchedPost.country,
          });
        } else {
          setError('Post not found.');
        }
      } catch (err) {
        console.error(err); // Log the actual error for debugging
        setError('Error fetching post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Handle form submission to update post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("Submitting post:", post); // Add this line to inspect the post object

    try {
        await updatePost(id, post); // Send the form data to the update API
        router.push('/dashboard/manage'); // Redirect after successful update
    } catch (err) {
        console.error(err); // Log the actual error for debugging
        setError('Error updating post.');
    } finally {
        setLoading(false);
    }
};


  // Update form state on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  // Handle changes for subsection fields
  const handleSubsectionChange = (index: number, key: string, value: string | string[]) => {
    const updatedSubsections = [...post.subsections];
    if (!updatedSubsections[index]) {
      updatedSubsections[index] = { header: '', text: '', images: [], contentBlocks: [] };
    }
    updatedSubsections[index][key] = value;
    setPost({ ...post, subsections: updatedSubsections });
  };

  // Add a new subsection
  const addSubsection = () => {
    setPost({
      ...post,
      subsections: [...post.subsections, { header: '', text: '', images: [], contentBlocks: [] }],
    });
  };

  // Handle adding content blocks to a subsection
  const addContentBlockToSubsection = (index: number) => {
    const updatedSubsections = [...post.subsections];
    updatedSubsections[index].contentBlocks.push({ type: 'text', content: '', subContent: [] });
    setPost({ ...post, subsections: updatedSubsections });
  };

  // Handle changes for content blocks
  const handleContentBlockChange = (subIndex: number, blockIndex: number, key: string, value: string | string[]) => {
    const updatedSubsections = [...post.subsections];
    const block = updatedSubsections[subIndex].contentBlocks[blockIndex];
    if (!block) return;

    block[key] = value;
    setPost({ ...post, subsections: updatedSubsections });
  };

  return post ? (
    <div className={styles.container}>
      <h1>Edit Post</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="countryImage"
          placeholder="Country Image URL"
          value={post.countryImage}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="continent"
          placeholder="Continent"
          value={post.continent}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={post.country}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="previewImage"
          placeholder="Preview Image URL"
          value={post.previewImage}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          value={post.desc}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="introImage"
          placeholder="Intro Image URL"
          value={post.introImage}
          onChange={handleChange}
          className={styles.input}
        />
        <textarea
          name="introText"
          placeholder="Intro Text"
          value={post.introText}
          onChange={handleChange}
          className={styles.textarea}
        />
        <div>
          <h2>Subsections</h2>
          {post.subsections.map((subsection, index) => (
            <div key={index} className={styles.subsection}>
              <input
                type="text"
                placeholder="Subsection Header"
                value={subsection.header}
                onChange={(e) => handleSubsectionChange(index, 'header', e.target.value)}
                className={styles.input}
              />
              <textarea
                placeholder="Subsection Text"
                value={subsection.text}
                onChange={(e) => handleSubsectionChange(index, 'text', e.target.value)}
                className={styles.textarea}
              />
              <input
                type="text"
                placeholder="Image URLs (comma separated)"
                value={subsection.images.join(',')} // Join images for input
                onChange={(e) => handleSubsectionChange(index, 'images', e.target.value.split(','))}
                className={styles.input}
              />
              <h3>Content Blocks</h3>
              {subsection.contentBlocks.map((block, blockIndex) => (
                <div key={blockIndex} className={styles.contentBlock}>
                  <select
                    value={block.type}
                    onChange={(e) => handleContentBlockChange(index, blockIndex, 'type', e.target.value)}
                  >
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="subheader">Subheader</option>
                    <option value="list">List</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Content"
                    value={block.content}
                    onChange={(e) => handleContentBlockChange(index, blockIndex, 'content', e.target.value)}
                    className={styles.input}
                  />
                  {block.type === 'list' && (
                    <input
                      type="text"
                      placeholder="Sub Items (comma separated)"
                      value={block.subContent ? block.subContent.join(',') : ''} // Join subContent for input
                      onChange={(e) => handleContentBlockChange(index, blockIndex, 'subContent', e.target.value.split(','))}
                      className={styles.input}
                    />
                  )}
                </div>
              ))}
              <button type="button" onClick={() => addContentBlockToSubsection(index)} className={styles.button}>
                Add Content Block
              </button>
            </div>
          ))}
          <button type="button" onClick={addSubsection} className={styles.button}>
            Add Subsection
          </button>
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditPost;
