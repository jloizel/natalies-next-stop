"use client"

import React, { useEffect, useRef, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostById, getAllPosts } from '@/app/API';
import { ParsedUrlQuery } from 'querystring';
import styles from './blog.module.css';
import { IoShareSocialOutline } from "react-icons/io5";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';
import { IoIosLink } from "react-icons/io";



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
  const [showShareMenu, setShowShareMenu] = useState(false); 
  const [copied, setCopied] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  // if (typeof document !== 'undefined') {
  //   return null;
  // }

  useEffect(() => {  
    if (!shareMenuRef.current) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);  // Close the share menu if the click is outside
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [shareMenuRef]);

  if (!post) {
    return <div>Post not found.</div>;
  }

  const renderIntroText = (introText: string | undefined) => {
    if (!introText) return null;
    return introText.split(/",\s*"/).map((text, index) => (
      <div key={index} className={styles.introText}>{text.trim().replace(/^"|"$/g, '')}</div>
    ));
  };

  const renderSubsectionImages = (images: string[], imageCaption: string) => {
    const imageCount = images.length;
    const layoutClass = imageCount === 2 ? 'two-images' : imageCount === 3 ? 'three-images' : '';
  
    return (
      <div className={styles.subsectionImagesContainer}>
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
        </div>
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

  const renderListContent = (listText: string | undefined, listType: 'block' | 'nestedBlock' | 'nestedNestedBlock') => {
    if (!listText) return null;
  
    // Split the text into individual list items by the period followed by a newline or other delimiter.
    const listItems = listText.split(/<\/p><p>/g).map(item => item.trim().replace(/^"|"$/g, ''));
  
    // Determine the class based on the listType
    let listClass = '';
    if (listType === 'block') listClass = styles.contentList;
    if (listType === 'nestedBlock') listClass = styles.nestedContentList;
    if (listType === 'nestedNestedBlock') listClass = styles.nestedNestedContentList;
  
    return (
      <ul className={listClass}>
        {listItems.map((item, index) => (
          <li
            key={index}
            // className={styles.listItem}
            dangerouslySetInnerHTML={{ __html: item }}  // Safely render the HTML
          />
        ))}
      </ul>
    );
  }; 
  
  const renderListBlock = (block: INestedContentBlock) => {
    return (
      <div className={styles.contentList}>
        {block.subContent && block.subContent.length > 0 && block.subContent.map((item, idx) => (
          <span key={idx} className={styles.listItem}>
            {renderListContent(item, 'block')}
          </span>
        ))}
      </div>
    );
  };

  const renderNestedListBlock = (block: INestedContentBlock) => {
    return (
      <div className={styles.nestedContentList}>
        {block.subContent && block.subContent.length > 0 && block.subContent.map((item, idx) => (
          <span key={idx} className={styles.nestedListItem}>
            {renderListContent(item, 'nestedBlock')}
          </span>
        ))}
      </div>
    );
  };
  
  const renderNestedNestedListBlock = (block: INestedContentBlock) => {
    return (
      <div className={styles.nestedNestedContentList}>
        {block.subContent && block.subContent.length > 0 && block.subContent.map((item, idx) => (
          <span key={idx} className={styles.nestedNestedListItem}>
            {renderListContent(item, 'nestedNestedBlock')} 
          </span>
        ))}
      </div>
    );
  };

  const renderContentBlock = (block: INestedContentBlock) => {
    return (
      <div className={styles.contentBlock}>
        {block.type === 'text' && renderTextContent(block.content)}
        {block.type === 'image' && block.images && renderSubsectionImages(block.images, block.imageCaption)}
        {block.type === 'subheader' && <h2 className={styles.contentSubheader}>{block.content}</h2>}
        {block.type === 'list' && renderListBlock(block)}
  
        {/* Nested blocks */}
        {block.nestedBlocks && block.nestedBlocks.length > 0 && (
          <div className={styles.nestedBlocks}>
            {block.nestedBlocks.map((nestedBlock, idx) => (
              <div key={idx} className={styles.contentBlock}>
                {nestedBlock.type === 'list' && renderNestedListBlock(nestedBlock)}
                
                {/* Now we handle nestedNestedBlocks correctly */}
                {nestedBlock.nestedNestedBlocks && nestedBlock.nestedNestedBlocks.length > 0 && (
                  <div className={styles.nestedNestedBlocks}>
                    {nestedBlock.nestedNestedBlocks.map((nestedNestedBlock, nestedNestedIdx) => (
                      <div key={nestedNestedIdx} className={styles.contentBlock}>
                        {nestedNestedBlock.type === 'list' && renderNestedNestedListBlock(nestedNestedBlock)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
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

  const fullText = getFullText();
  const readingTime = calculateReadingTime(fullText); 

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  // const shareText = `Check out this blog post: ${post.title} - ${window.location.href}`;

  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);  // Hide the copied message after 2 seconds
      });
    }
  };

  const handleShare = async () => {
    try {
      // Check if the browser supports the Web Share API and if it's a mobile device
      if (
        navigator.share &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        await navigator.share({
          title: post.title,
          text: `Check out this blog post: ${post.title}`,
          url: window.location.href,
        });
      } else {
        // For non-mobile devices, toggle the share menu
        setShowShareMenu(!showShareMenu);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topInfo}>
        <a href={`/${post.continent.toLowerCase()}`}>
          {post.continent}
        </a>
        <a href={`/${post.continent.toLowerCase()}/${post.country}`}>
          {post.country}
        </a>
      </div>
      <div className={styles.blogPost}>
        <div className={styles.blogDetails}>
          <div className={styles.blogDetailsLeft}>
            <span>{formatCreatedAt(post.createdAt)}</span>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>
          <div className={styles.shareButtonContainer}>
            <button onClick={handleShare} className={styles.shareButton}>
              <IoShareSocialOutline/>
            </button>
            {showShareMenu && (
              <div ref={shareMenuRef} className={styles.shareMenu}>
                <div className={styles.logoContainer}>
                  <FacebookShareButton url={shareUrl} title={post.title}>
                    <FacebookIcon round className={styles.shareIcon}/>
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={post.title}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl} title={post.title}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <WhatsappShareButton url={shareUrl} title={post.title}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <div className={styles.linkIconContainer}>
                    <IoIosLink onClick={copyLink} className={styles.shareLink}/>
                    {copied && <span className={styles.copiedMessage}>Link copied!</span>}
                  </div>
                </div>
                
              </div>
            )}
          </div>
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
        <div className={styles.introImageCaption}>
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
