import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostById, getAllPosts } from '@/app/API'; // Adjust this according to your folder structure
import { ParsedUrlQuery } from 'querystring';
import styles from './blog.module.css'; // Import the CSS styles

// Define the ContentBlock interface for content rendering
interface IContentBlock {
  type: 'text' | 'image' | 'subheader' | 'list'; // Types of content blocks
  content: string; // The actual content
  subContent?: string[]; // Optional array for subcontent, like bullet points
  images?: string[];
  nestedBlocks?: INestedContentBlock[]; // Allow nested blocks
}

// Extend the IContentBlock to include nested subContent
interface INestedContentBlock extends IContentBlock {}

interface ISubsection {
  header: string; // Subsection header
  text: string; // Text content for the subsection
  images: string[]; // Array of image URLs for the subsection
  contentBlocks: INestedContentBlock[]; // Array of content blocks for each subsection
}

// Define the Post interface
interface IPost {
  countryImage: string;
  title: string;
  desc: string;
  introText: string; // Intro text
  introImage: string; // Intro image URL (required)
  previewImage: string;
  subsections: ISubsection[]; // Array of subsections
  continent: string; // Continent field
  country: string; // Country field
}

// Define the props for the component
interface BlogPostProps {
  post: IPost | null; // Allow null if post not found
}

// Define Params interface for URL parameters
interface Params extends ParsedUrlQuery {
  country: string; // This represents the country in the URL
  id: string; // This represents the blog ID in the URL
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  if (!post) {
    return <div>Post not found.</div>; // Handle case where post is not found
  }

  // Function to render paragraphs split by '", "'
  const renderIntroText = (introText: string | undefined) => {
    if (!introText) {
      return null; // Return nothing if introText is undefined or empty
    }
    return introText.split(/",\s*"/).map((text, index) => (
      <p key={index} className={styles['intro-text']}>{text.trim().replace(/^"|"$/g, '')}</p>
    ));
  };

  // Function to render subsection images
  const renderSubsectionImages = (images: string[]) => {
    const imageCount = images.length; // Get the number of images

    // Determine the appropriate class for layout based on image count
    let layoutClass = '';
    if (imageCount === 2) {
      layoutClass = 'two-images';
    } else if (imageCount === 3) {
      layoutClass = 'three-images';
    }

    return (
      <div className={`${styles['subsection-images']} ${styles[layoutClass]}`}>
        {images.map((imageUrl, index) => {
          const trimmedUrl = imageUrl.trim(); // Trim whitespace
          return (
            <img 
              key={index} 
              src={trimmedUrl} 
              alt={`Subsection Image ${index + 1}`} 
              className={styles['subsection-image']} 
            />
          );
        })}
      </div>
    );
  };

  // Function to render text content as paragraphs
  const renderTextContent = (content: string | undefined) => {
    if (!content) {
      return null; // Return nothing if content is undefined or empty
    }
    return content.split(/",\s*"/).map((text, index) => (
      <p key={index} className={styles['content-text']}>{text.trim().replace(/^"|"$/g, '')}</p>
    ));
  };

  // Function to render a list block, including nested subContent
  const renderListBlock = (block: INestedContentBlock) => {
    return (
      <ul className={styles['content-list']}>
        {block.content && <li className={styles['list-item']}>{block.content}</li>}
        {block.subContent && block.subContent.length > 0 && block.subContent.map((item, idx) => (
          <li key={idx} className={styles['list-item'] + ' ' + styles['sub-item']}>
            {item}
            {/* Render nested blocks if they exist */}
            {block.nestedBlocks && block.nestedBlocks.length > 0 && (
              <ul>
                {block.nestedBlocks.map((nestedBlock, nestedIndex) => (
                  <li key={nestedIndex}>
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

  // Function to render content blocks
  const renderContentBlock = (block: INestedContentBlock) => {
    switch (block.type) {
      case 'text':
        return renderTextContent(block.content); // Render text content
      case 'image':
        return (
          <div>
            {block.images && renderSubsectionImages(block.images)}
          </div>
        );
      case 'subheader':
        return <h2 className={styles['content-subheader']}>{block.content}</h2>; // Render subheader
      case 'list':
        return renderListBlock(block); // Use the new function for rendering lists
      default:
        return null; // Fallback
    }
  };

  // Function to render nested content blocks
  const renderNestedContentBlocks = (blocks: INestedContentBlock[]) => {
    return blocks.map((block, blockIndex) => (
      <div key={blockIndex} className={styles['content-block']}>
        {renderContentBlock(block)}
      </div>
    ));
  };

  return (
    <div className={styles['blog-post']}>
      <h1 className={styles['title']}>{post.title}</h1>
      <img src={post.introImage} alt={post.title} className={styles['intro-image']} />
      {renderIntroText(post.introText)} {/* Render the intro text here */}
      <p className={styles['description']}>{post.desc}</p>
      {post.subsections.map((subsection, index) => (
        <div key={index} className={styles['subsection']}>
          <h2 className={styles['subsection-header']}>{subsection.header}</h2>
          {renderTextContent(subsection.text)} 
          <div className={styles['subsection-images']}>
            {renderSubsectionImages(subsection.images)} 
          </div>
          <div className={styles['content-blocks']}>
            {renderNestedContentBlocks(subsection.contentBlocks)} {/* Render content blocks, including nested ones */}
          </div>
        </div>
      ))}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts(); // Fetch all posts

  const paths = posts.map(post => ({
    params: { country: post.country, id: post._id.toString() }, // Make sure _id is string
  }));

  return { paths, fallback: 'blocking' }; // Use 'blocking' for fallback
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Params; // Assert that params is of type Params

  const post = await getPostById(id); // Fetch post by ID

  if (!post) {
    return {
      notFound: true, // Return 404 if post not found
    };
  }

  return {
    props: { post }, // Pass post to the component
    revalidate: 10, // Optional revalidation
  };
};

export default BlogPost;
