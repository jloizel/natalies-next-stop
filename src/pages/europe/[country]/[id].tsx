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
}

interface ISubsection {
    header: string; // Subsection header
    text: string; // Text content for the subsection
    images: string[]; // Array of image URLs for the subsection
    contentBlocks: IContentBlock[]; // Array of content blocks for each subsection
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
    const renderIntroText = (introText: string) => {
        return introText.split(/",\s*"/).map((text, index) => (
            <p key={index} className={styles['intro-text']}>{text.trim().replace(/^"|"$/g, '')}</p>
        ));
    };

    const renderContentBlock = (block: IContentBlock) => {
        switch (block.type) {
            case 'text':
                return renderTextContent(block.content);
            case 'image':
                return <img src={block.content} alt={`Image`} className={styles['content-image']} />;
            case 'subheader':
                return <h2 className={styles['content-subheader']}>{block.content}</h2>;
            case 'list':
                return (
                    <ul className={styles['content-list']}>
                        {block.subContent?.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    };

    const renderTextContent = (content: string) => {
        return content.split(',').map((text, index) => (
            <p key={index} className={styles['content-text']}>{text.trim().replace(/^"|"$/g, '')}</p>
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
                    <p className={styles['subsection-text']}>{subsection.text}</p>
                    {subsection.images.map((image, imgIndex) => (
                        <img key={imgIndex} src={image} alt={`Subsection Image ${imgIndex + 1}`} className={styles['subsection-image']} />
                    ))}
                    <div className={styles['content-blocks']}>
                        {subsection.contentBlocks.map((block, blockIndex) => (
                            <div key={blockIndex} className={styles['content-block']}>
                                {renderContentBlock(block)}
                            </div>
                        ))}
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
