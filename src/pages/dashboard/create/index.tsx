"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, PostInput } from '../../../app/API'; // Adjust the API import as needed
import styles from './create.module.css';

const CreatePost = () => {
  const [formData, setFormData] = useState<PostInput>({
    countryImage: "",
    title: '',
    desc: '',
    introText: '',
    introImage: '', // For intro image URL
    previewImage: "",
    subsections: [], // Initialize subsections as an empty array
    continent: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle form data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle subsection updates
  const handleSubsectionChange = (index: number, key: string, value: string | string[]) => {
    const updatedSubsections = [...formData.subsections];
    if (!updatedSubsections[index]) {
      updatedSubsections[index] = { header: '', text: '', images: [], contentBlocks: [] };
    }
    updatedSubsections[index][key] = value;
    setFormData({ ...formData, subsections: updatedSubsections });
  };

  // Add new subsection
  const addSubsection = () => {
    setFormData({
      ...formData,
      subsections: [...formData.subsections, { header: '', text: '', images: [], contentBlocks: [] }],
    });
  };

  // Remove a subsection
  const removeSubsection = (index: number) => {
    const updatedSubsections = formData.subsections.filter((_, i) => i !== index);
    setFormData({ ...formData, subsections: updatedSubsections });
  };

  // Handle content block updates
  const handleContentBlockChange = (subIndex: number, blockIndex: number, key: string, value: string | string[]) => {
    const updatedSubsections = [...formData.subsections];
    const block = updatedSubsections[subIndex].contentBlocks[blockIndex];

    if (!block) return;

    if (key === 'images') {
      block[key] = typeof value === 'string' ? value.split(' ') : value; // Split by space for images
    } else if (key === 'subContent') {
      block[key] = typeof value === 'string' ? value.split(',') : value; // Split by comma for subContent (lists)
    } else {
      block[key] = value; // Handle other types
    }

    setFormData({ ...formData, subsections: updatedSubsections });
  };

  // Add content block to a subsection
  const addContentBlockToSubsection = (index: number) => {
    const updatedSubsections = [...formData.subsections];
    updatedSubsections[index].contentBlocks.push({ type: 'text', content: '', subContent: [], images: [] });
    setFormData({ ...formData, subsections: updatedSubsections });
  };

  // Remove content block
  const removeContentBlock = (subIndex: number, blockIndex: number) => {
    const updatedSubsections = [...formData.subsections];
    updatedSubsections[subIndex].contentBlocks.splice(blockIndex, 1);
    setFormData({ ...formData, subsections: updatedSubsections });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Posting data:', formData); // Log formData before sending

      await createPost(formData);
      router.push('/dashboard/manage'); // Redirect to Manage after successful creation
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error creating post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create New Blog Post</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="countryImage"
          placeholder="Country Image URL"
          value={formData.countryImage}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="continent"
          placeholder="Continent"
          value={formData.continent}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="previewImage"
          placeholder="Preview Image URL"
          value={formData.previewImage}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="introImage"
          placeholder="Intro Image URL"
          value={formData.introImage}
          onChange={handleChange}
          className={styles.input}
        />
        <textarea
          name="introText"
          placeholder="Intro Text"
          value={formData.introText}
          onChange={handleChange}
          className={styles.textarea}
        />
        <div>
          <h2>Subsections</h2>
          {formData.subsections.map((subsection, index) => (
            <div key={index} className={styles.subsection}>
              <button type="button" onClick={() => removeSubsection(index)} className={styles.removeButton}>✖</button>
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
                placeholder="Image URLs (space separated)"
                value={subsection.images.join(' ')} // Join images for display
                onChange={(e) => handleSubsectionChange(index, 'images', e.target.value.split(' '))} // Split by space
                className={styles.input}
              />
              <h3>Content Blocks</h3>
              {subsection.contentBlocks.map((block, blockIndex) => (
                <div key={blockIndex} className={styles.contentBlock}>
                  <button type="button" onClick={() => removeContentBlock(index, blockIndex)} className={styles.removeButton}>✖</button>
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
                      value={block.subContent ? block.subContent.join(',') : ''} // Join for display
                      onChange={(e) => handleContentBlockChange(index, blockIndex, 'subContent', e.target.value.split(','))} // Split by comma
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
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
