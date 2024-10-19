"use client"

import React, { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostById, getAllPosts } from '@/app/API';
import { ParsedUrlQuery } from 'querystring';
import styles from './blog.module.css';


interface IContentBlock {
  type: 'text' | 'image' | 'subheader' | 'list';
  content: string;
  subContent?: string[];
  images?: string[];
  imageCaption: string;
  nestedBlocks?: INestedContentBlock[];
}

interface INestedContentBlock extends IContentBlock {
  nestedNestedBlocks?: INestedContentBlock[]; // Include nestedNestedBlocks here
}

interface ISubsection {
  header: string;
  text: string;
  images: string[];
  imageCaption: string;
  contentBlocks: INestedContentBlock[];
}

interface IPost {
  countryImage: string;
  title: string;
  desc: string;
  introText: string;
  introImage: string;
  introImageLink: string;
  introImageCaption: string;
  previewImage: string;
  subsections: ISubsection[];
  continent: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogPostProps {
  post: IPost | null;
}

interface Params extends ParsedUrlQuery {
  country: string;
  id: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {  

  if (!post) {
    return <div>Post not found.</div>;
  }

  useEffect(() => {
    if (typeof document !== 'undefined') {
    }
  }, []);

  const renderIntroText = (introText: string | undefined) => {
    if (!introText) return null;
    return introText.split(/",\s*"/).map((text, index) => (
      <div key={index} className={styles.introText}>{text.trim().replace(/^"|"$/g, '')}</div>
    ));
  };

  const renderSubsectionImages = (images: string[], imageCaption: string) => { // Default empty array
    const imageCount = images.length;
    const layoutClass = imageCount === 2 ? 'two-images' : imageCount === 3 ? 'three-images' : '';
  
    return (
      <div className={`${styles.subsectionImages} ${styles[layoutClass]}`}>
        {images.map((imageUrl, index) => (
          <div key={index} className={styles.imageContainer}>
            <img 
              src={imageUrl.trim()} 
              alt={`Subsection Image ${index + 1}`} 
              className={styles.subsectionImage} 
            />
          </div>
        ))}
        {imageCaption && (
              <div className={styles.imageCaption}>{imageCaption}</div>
            )}
      </div>
    );
  };
  
  

  const renderTextContent = (content: string | undefined) => {
    if (!content) return null;
  
    return content.split(/",\s*"/).map((text, index) => (
      <div
        key={index}
        className={styles.contentText}
        suppressHydrationWarning={true}
        dangerouslySetInnerHTML={{ __html: text.trim().replace(/^"|"$/g, '') }}
      />
    ));
  }
  
  const renderListBlock = (block: INestedContentBlock) => {
    return (
      <ul className={styles.contentList}>
        {block.content && 
          <li className={styles.listItem}>
            {block.content}
          </li>
        }
        {block.subContent && 
          <li className={styles.listItem}>
            {block.subContent}
          </li>
        }
        {/* {block.subContent && block.subContent.length > 0 && block.subContent.map((item, idx) => (
          <li key={idx} className={`${styles.listItem} ${styles['sub-item']}`}>
            {item}
            {block.nestedBlocks && block.nestedBlocks.length > 0 && (
              <ul className={styles.nestedList}> 
                {block.nestedBlocks.map((nestedBlock, nestedIndex) => (
                  <li key={nestedIndex} className={styles['nested-list-item']}>
                    {renderContentBlock(nestedBlock)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))} */}
      </ul>
    );
  };

  const renderContentBlock = (block: INestedContentBlock) => {
    return (
      <div className={styles.contentBlock}>
        {/* Handle different types of blocks */}
        {block.type === 'text' && renderTextContent(block.content)}
        {block.type === 'image' && block.images && renderSubsectionImages(block.images, block.imageCaption)}
        {block.type === 'subheader' && <h2 className={styles.contentSubheader}>{block.content}</h2>}
        {block.type === 'list' && renderListBlock(block)}
        
        {block.nestedBlocks && block.nestedBlocks.length > 0 && (
          <div className={styles['nested-blocks']}>
            {renderNestedContentBlocks(block.nestedBlocks)}
          </div>
        )}

        {block.nestedNestedBlocks && block.nestedNestedBlocks.length > 0 && (
          <div className={styles['nested-nested-blocks']}>
            {renderNestedContentBlocks(block.nestedNestedBlocks)}
          </div>
        )}
      </div>
    );
  };

  const renderNestedContentBlocks = (blocks: INestedContentBlock[]) => {
    return blocks.map((block, blockIndex) => (
      <div key={blockIndex} className={styles.contentBlock}>
        {renderContentBlock(block)}
      </div>
    ));
  };

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200; // You can adjust this to 250 for faster reading speed
    const wordCount = text.split(/\s+/).length; // Count words by splitting the text by spaces
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes; // Return the number of minutes rounded up
  };

  const getFullText = () => {
    let text = post.introText || '';
    post.subsections.forEach(subsection => {
      text += ' ' + subsection.text;
      subsection.contentBlocks.forEach(block => {
        if (block.type === 'text' && block.content) {
          text += ' ' + block.content;
        }
      });
    });
    return text;
  };

  const fullText = getFullText(); // Get all the text content from the post
  const readingTime = calculateReadingTime(fullText); 

  return (
    <div className={styles.container}>
      <div className={styles.topInfo}>
          <a href={`/${post.continent.toLowerCase()}`}>{post.continent}</a>
          <a href={`/${post.continent.toLowerCase()}/${post.country}`}>{post.country}</a>
        </div>
      <div className={styles.blogPost}>
        <div className={styles.blogDetails}>
          <span>{formatCreatedAt(post.createdAt)}</span>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>
        <div className={styles.title}>
          {post.title}
        </div>
        <div className={styles.updated}>
          Updated: {formatCreatedAt(post.updatedAt)}
        </div>
        {renderIntroText(post.introText)}
        <a href={post.introImageLink} target='_blank'>
          <img src={post.introImage} alt={post.title} className={styles.introImage} />
        </a>
        <div className={styles.imageCaption}>
          {post.introImageCaption}
        </div>
        {post.subsections.map((subsection, index) => (
          <div key={index} className={styles.subsection}>
            <div className={styles.subsectionHeader}>
              {subsection.header}
            </div>
            {renderTextContent(subsection.text)} 
            <div className={styles.subsectionImages}>
              {renderSubsectionImages(subsection.images, subsection.imageCaption)} 
            </div>
            <span>{subsection.imageCaption}</span>
            <div className={styles.contentBlocks}>
              {renderNestedContentBlocks(subsection.contentBlocks)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(post => ({
    params: { country: post.country, id: post._id.toString() },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Params;
  const post = await getPostById(id);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
    revalidate: 10,
  };
};

export default BlogPost;
