"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, PostInput } from '../../../app/API'; // Ensure the import paths are correct
import styles from './create.module.css';
import { useParams } from 'next/navigation';
import { MdDeleteForever } from "react-icons/md";

const CreatePost = () => {
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

  // Handle form submission to create post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createPost(post); // Send the form data to the create API
      router.push('/dashboard/manage'); // Redirect after successful creation
    } catch (err) {
      console.error(err); // Log the actual error for debugging
      setError('Error creating post.');
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
    updatedSubsections[index].contentBlocks.push({ 
      type: 'text', 
      content: '', 
      subContent: [], // Ensure subContent is initialized
      images: [] 
    });
    setPost({ ...post, subsections: updatedSubsections });
  };

  // Handle deleting a subsection
  const handleDeleteSubsection = (index: number) => {
    const confirmed = confirm('Are you sure you want to delete this subsection?');
    if (confirmed) {
      const updatedSubsections = [...post.subsections];
      updatedSubsections.splice(index, 1); // Remove the subsection
      setPost({ ...post, subsections: updatedSubsections });
    }
  };

  // Handle changes for content blocks
  const handleContentBlockChange = (subIndex: number, blockIndex: number, key: string, value: string | string[]) => {
    const updatedSubsections = [...post.subsections];
    const block = updatedSubsections[subIndex].contentBlocks[blockIndex];
    if (!block) return;

    if (key === 'images') {
      // Handle space-separated images
      block[key] = typeof value === 'string' ? value.split('\n') : value;
    } else if (key === 'subContent') {
      // Split subContent by new lines and trim each value
      block[key] = typeof value === 'string' ? value.split('\n').map(item => item.trim()) : value;
    } else {
      // Assign the value directly for other keys
      block[key] = value;
    }

    setPost({ ...post, subsections: updatedSubsections });
  };

  // Handle deleting a content block
  const handleDeleteContentBlock = (subIndex: number, blockIndex: number) => {
    const confirmed = confirm('Are you sure you want to delete this content block?');
    if (confirmed) {
      const updatedSubsections = [...post.subsections];
      updatedSubsections[subIndex].contentBlocks.splice(blockIndex, 1); // Remove the content block
      setPost({ ...post, subsections: updatedSubsections });
    }
  };

  // Add a nested content block to an existing content block
  const addNestedContentBlock = (subIndex: number, blockIndex: number) => {
    const updatedSubsections = [...post.subsections];
    const block = updatedSubsections[subIndex].contentBlocks[blockIndex];

    // Ensure the block exists
    if (block) {
      if (!block.nestedBlocks) {
        block.nestedBlocks = []; // Initialize nestedBlocks if it doesn't exist
      }
      // Add a new nested block of type list or text
      block.nestedBlocks.push({
        type: 'list', // You can change this default type if needed
        content: '', // Initialize content for nested block
        subContent: [], // Ensure subContent is initialized as an empty array
      });
    }

    setPost({ ...post, subsections: updatedSubsections });
  };

  // Handle changes for nested content block
  const handleNestedContentChange = (subIndex: number, blockIndex: number, nestedIndex: number, key: string, value: string) => {
    const updatedSubsections = [...post.subsections];
    const block = updatedSubsections[subIndex].contentBlocks[blockIndex];

    if (block && block.nestedBlocks) {
      if (key === 'subContent') {
        // Ensure subContent is an array
        block.nestedBlocks[nestedIndex][key] = typeof value === 'string' ? value.split('\n') : [];
      } else {
        block.nestedBlocks[nestedIndex][key] = value; // Update the nested content for other keys
      }
    }

    setPost({ ...post, subsections: updatedSubsections });
  };

  // Handle deleting a nested content block
  const handleDeleteNestedContent = (subIndex: number, blockIndex: number, nestedIndex: number) => {
    const confirmed = confirm('Are you sure you want to delete this nested content block?');
    if (confirmed) {
      const updatedSubsections = [...post.subsections];
      const block = updatedSubsections[subIndex].contentBlocks[blockIndex];

      if (block && block.nestedBlocks) {
        block.nestedBlocks.splice(nestedIndex, 1); // Remove the nested content block
      }

      setPost({ ...post, subsections: updatedSubsections });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            Create Post
          </div>
          <div className={styles.headertext}>
            Create your blog post and make sure you follow the instructions if any
          </div>
        </div>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                name="countryImage"
                placeholder="Country Image URL"
                value={post.countryImage}
                onChange={handleChange}
                className={styles.input}
              />
              <span className={styles.instruction}>
                Once you've added a URL for the country image once you won't need to again
              </span>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                name="continent"
                placeholder="Continent"
                value={post.continent}
                onChange={handleChange}
                className={styles.input}
              />
              <span className={styles.instruction}>
                Make sure the spelling is correct and matches other posts from the same continent
              </span>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={post.country}
                onChange={handleChange}
                className={styles.input}
              />
              <span className={styles.instruction}>
                Make sure the spelling is correct and matches other posts from the same country
              </span>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                name="previewImage"
                placeholder="Preview Image URL"
                value={post.previewImage}
                onChange={handleChange}
                className={styles.input}
              />
              <span className={styles.instruction}>
                This is the image that appears in the blog card in latest posts
              </span>
            </div>
            <div className={styles.inputContainer}>
              <textarea
                name="desc"
                placeholder="Description"
                value={post.desc}
                onChange={handleChange}
                className={styles.textarea}
              />
              <span className={styles.instruction}>
                This appears in the latest blogs section on the home page
              </span>
            </div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={post.title}
              onChange={handleChange}
              className={styles.input}
            />
            <textarea
              name="introText"
              placeholder="Intro text"
              value={post.introText}
              onChange={handleChange}
              className={styles.textarea}
            />
            <input
              type="text"
              name="introImage"
              placeholder="Intro image URL"
              value={post.introImage}
              onChange={handleChange}
              className={styles.input}
            />

            {/* Render subsections */}
            {post.subsections.map((subsection, subIndex) => (
              <div key={subIndex} className={styles.subsection}>
                <button type="button" onClick={() => handleDeleteSubsection(subIndex)} className={styles.deleteButton}>
                  <MdDeleteForever className={styles.deleteIcon}/>
                  <span>Delete Subsection</span>
                </button>
                <input
                  type="text"
                  placeholder="Subsection header"
                  value={subsection.header}
                  onChange={(e) => handleSubsectionChange(subIndex, 'header', e.target.value)}
                  className={styles.input}
                />
                <textarea
                  placeholder="Subsection text"
                  value={subsection.text}
                  onChange={(e) => handleSubsectionChange(subIndex, 'text', e.target.value)}
                  className={styles.textarea}
                />
                <button type="button" onClick={() => addContentBlockToSubsection(subIndex)} className={styles.button}>
                  Add Content Block
                </button>
                      
                {/* Render content blocks */}
                {subsection.contentBlocks.map((block, blockIndex) => (
                  <div key={blockIndex} className={styles.contentBlock}>
                    <button type="button" onClick={() => handleDeleteContentBlock(subIndex, blockIndex)} className={styles.deleteButton}>
                      <MdDeleteForever className={styles.deleteIcon}/>
                      <span>Delete Content Block</span>
                    </button>
                    <div className={styles.selector}>
                      <span>Select type of Content Block</span>
                    <select
                      value={block.type}
                      onChange={(e) => handleContentBlockChange(subIndex, blockIndex, 'type', e.target.value)}
                      className={styles.select}
                    >
                      <option value="text">Text</option>
                      <option value="image">Image</option>
                      <option value="subheader">Subheader</option>
                      <option value="list">List</option>
                    </select>
                    </div>
                    {block.type === 'list' ? (
                      <div>
                        <textarea
                          placeholder="List items (new bullet point on a new line)"
                          value={block.subContent ? block.subContent.join('\n') : ''}
                          onChange={(e) => handleContentBlockChange(subIndex, blockIndex, 'subContent', e.target.value)}
                          className={styles.textarea}
                        />
                        <ul>
                          {block.subContent?.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                        <button type="button" onClick={() => addNestedContentBlock(subIndex, blockIndex)} className={styles.button}>
                          Add Nested Content
                        </button>
                      </div>
                    ) : block.type === 'image' ? (
                      <textarea
                        // type="text"
                        placeholder="Image URLs (new image on a new line)"
                        value={Array.isArray(block.images) ? block.images.join('\n') : ''}
                        onChange={(e) => handleContentBlockChange(subIndex, blockIndex, 'images', e.target.value)}
                        className={styles.textarea}
                      />
                    ) : block.type === 'subheader' ? (
                      <input
                        type="text"
                        placeholder="Subheader"
                        value={block.content}
                        onChange={(e) => handleContentBlockChange(subIndex, blockIndex, 'content', e.target.value)}
                        className={styles.input}
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="Content"
                        value={block.content}
                        onChange={(e) => handleContentBlockChange(subIndex, blockIndex, 'content', e.target.value)}
                        className={styles.input}
                      />
                    )}

                      {/* Render nested blocks */}
                      {block.nestedBlocks && block.nestedBlocks.map((nestedBlock:any, nestedIndex:any) => (
                        <div key={nestedIndex} className={styles.nestedBlock}>
                          <button type="button" onClick={() => handleDeleteNestedContent(subIndex, blockIndex, nestedIndex)} className={styles.deleteButton}>
                            <MdDeleteForever className={styles.deleteIcon}/>
                            <span>Delete Nested Block</span>
                          </button>
                          <div className={styles.selector}>
                            <span>Select type of nested Content Block</span>
                            <select
                              value={nestedBlock.type}
                              onChange={(e) => handleNestedContentChange(subIndex, blockIndex, nestedIndex, 'type', e.target.value)}
                              className={styles.select}
                            >
                              <option value="text">Text</option>
                              <option value="image">Image</option>
                              <option value="subheader">Subheader</option>
                              <option value="list">List</option>
                            </select>
                          </div>
                          {nestedBlock.type === 'list' ? (
                            <div>
                              <textarea
                                placeholder="Nested Sub Items (line separated)"
                                value={Array.isArray(nestedBlock.subContent) ? nestedBlock.subContent.join('\n') : ''}
                                onChange={(e) => handleNestedContentChange(subIndex, blockIndex, nestedIndex, 'subContent', e.target.value)}
                                className={styles.textarea}
                              />
                              <ul>
                                {nestedBlock.subContent?.map((item:any, itemIndex:any) => (
                                    <li key={itemIndex}>{item}</li>
                                ))}
                              </ul>
                              <button type="button" onClick={() => addNestedContentBlock(subIndex, blockIndex)} className={styles.button}>
                                Add Nested Content
                              </button>
                            </div>
                          ) : nestedBlock.type === 'image' ? (
                            <input
                              type="text"
                              placeholder="Nested Image URL"
                              value={nestedBlock.content}
                              onChange={(e) => handleNestedContentChange(subIndex, blockIndex, nestedIndex, 'content', e.target.value)}
                              className={styles.input}
                            />
                          ) : nestedBlock.type === 'subheader' ? (
                            <input
                              type="text"
                              placeholder="Nested Subheader"
                              value={nestedBlock.content}
                              onChange={(e) => handleNestedContentChange(subIndex, blockIndex, nestedIndex, 'content', e.target.value)}
                              className={styles.input}
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder="Nested Content"
                              value={nestedBlock.content}
                              onChange={(e) => handleNestedContentChange(subIndex, blockIndex, nestedIndex, 'content', e.target.value)}
                              className={styles.input}
                            />
                          )}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          <div className={styles.buttonContainer}>
            <button type="button" onClick={addSubsection} className={styles.addButton}>
              Add Subsection
            </button>
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
