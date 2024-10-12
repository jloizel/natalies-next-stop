import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostById, getAllPosts } from '@/app/API'; // Adjust this according to your folder structure
import { ParsedUrlQuery } from 'querystring';
import styles from './blog.module.css'; // Import the CSS styles

// Define the ContentBlock interface for content rendering
interface ContentBlock {
    type: 'text' | 'image' | 'subheader' | 'list'; // Types of content blocks
    content: string; // The actual content
    subContent?: string[]; // Optional array for subcontent, like bullet points
}

// Define the Post interface
interface Post {
    title: string;
    desc: string;
    introImage: string; // New field for intro image
    contentBlocks: ContentBlock[]; // Updated to include content blocks
    continent: string;
    country: string;
}

// Define the props for the component
interface BlogPostProps {
    post: Post | null; // Allow null if post not found
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

    return (
        <div className={styles['blog-post']}>
            <h1>{post.title}</h1>
            <img src={post.introImage} alt={post.title} className={styles['intro-image']} />
            <p className={styles['description']}>{post.desc}</p>
            <div className={styles['content-blocks']}>
                {Array.isArray(post.contentBlocks) && post.contentBlocks.length > 0 ? (
                    post.contentBlocks.map((block, index) => (
                        <div key={index} className={`${styles['content-block']} ${styles[`content-${block.type}`]}`}>
                            {block.type === 'text' && <p className={styles['content-text']}>{block.content}</p>}
                            {block.type === 'image' && <img src={block.content} alt={`Image ${index + 1}`} className={styles['content-image']} />}
                            {block.type === 'subheader' && <h2 className={styles['content-subheader']}>{block.content}</h2>}
                            {block.type === 'list' && (
                                <ul className={styles['content-list']}>
                                    {block.subContent?.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No content available.</p>
                )}
            </div>
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
