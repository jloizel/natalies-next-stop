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
  nestedBlocks?: INestedContentBlock[];
}

interface INestedContentBlock extends IContentBlock {
  nestedNestedBlocks?: INestedContentBlock[]; // Include nestedNestedBlocks here
}

interface ISubsection {
  header: string;
  text: string;
  images: string[];
  contentBlocks: INestedContentBlock[];
}

interface IPost {
  countryImage: string;
  title: string;
  desc: string;
  introText: string;
  introImage: string;
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
    // Access `document` safely here
    if (typeof document !== 'undefined') {
      console.log(document.title); // Safe to use document
    }
  }, []);

  const renderIntroText = (introText: string | undefined) => {
    if (!introText) return null;
    return introText.split(/",\s*"/).map((text, index) => (
      <div key={index} className={styles.introText}>{text.trim().replace(/^"|"$/g, '')}</div>
    ));
  };

  const renderSubsectionImages = (images: string[]) => {
    const imageCount = images.length;
    const layoutClass = imageCount === 2 ? 'two-images' : imageCount === 3 ? 'three-images' : '';

    return (
      <div className={`${styles['subsection-images']} ${styles[layoutClass]}`}>
        {images.map((imageUrl, index) => (
          <img 
            key={index} 
            src={imageUrl.trim()} 
            alt={`Subsection Image ${index + 1}`} 
            className={styles['subsection-image']} 
          />
        ))}
      </div>
    );
  };

  const renderTextContent = (content: string | undefined) => {
    if (!content) return null;
  
    // Convert your text content with basic HTML tags (like <b>, <i>, etc.) to formatted HTML
    return content.split(/",\s*"/).map((text, index) => (
      <div
        key={index}
        className={styles['content-text']}
        suppressHydrationWarning={true} // Suppresses the hydration warning
        dangerouslySetInnerHTML={{ __html: text.trim().replace(/^"|"$/g, '') }}
      />
    ));
  }
  
  const renderListBlock = (block: INestedContentBlock) => {
    return (
      <ul className={`${styles['content-list']} ${styles['custom-list']}`}>
        {block.content && <li className={styles['list-item']}>{block.content}</li>}
        {block.subContent && block.subContent.length > 0 && block.subContent.map((item, idx) => (
          <li key={idx} className={`${styles['list-item']} ${styles['sub-item']}`}>
            {item}
            {block.nestedBlocks && block.nestedBlocks.length > 0 && (
              <ul className={styles['nested-list']}>
                {block.nestedBlocks.map((nestedBlock, nestedIndex) => (
                  <li key={nestedIndex} className={styles['nested-list-item']}>
                    {renderContentBlock(nestedBlock)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderContentBlock = (block: INestedContentBlock) => {
    return (
      <div className={styles['content-block']}>
        {/* Handle different types of blocks */}
        {block.type === 'text' && renderTextContent(block.content)}
        {block.type === 'image' && block.images && renderSubsectionImages(block.images)}
        {block.type === 'subheader' && <h2 className={styles['content-subheader']}>{block.content}</h2>}
        {block.type === 'list' && renderListBlock(block)}
        
        {/* If there are nested blocks, render them recursively */}
        {block.nestedBlocks && block.nestedBlocks.length > 0 && (
          <div className={styles['nested-blocks']}>
            {renderNestedContentBlocks(block.nestedBlocks)}
          </div>
        )}

        {/* New rendering for nestedNestedBlocks */}
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
      <div key={blockIndex} className={styles['content-block']}>
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
        <img src={post.introImage} alt={post.title} className={styles.introImage} />
        <p className={styles['description']}>{post.desc}</p>
        {post.subsections.map((subsection, index) => (
          <div key={index} className={styles['subsection']}>
            <h2 className={styles['subsection-header']}>{subsection.header}</h2>
            {renderTextContent(subsection.text)} 
            <div className={styles['subsection-images']}>
              {renderSubsectionImages(subsection.images)} 
            </div>
            <div className={styles['content-blocks']}>
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
