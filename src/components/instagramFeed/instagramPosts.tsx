import React, { useEffect, useState } from 'react';
import styles from "./instagramFeed.module.css";

// Define types for the Post structure
interface Post {
    caption: string;
    imageUrls: string[];
}

const InstagramPosts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const SHEET_ID = '1gHaVaJ4zX58ZpMP1YRShMMyl_q_IXvduNjjQL7ktzJg';
    const API_KEY = 'AIzaSyBIxEDBas7_Rp-BWwZ96b9vk9SX7TRuZd4';

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const rows: (string | null)[][] = data.values; // Define the type of rows

                // Assuming the first row is headers
                const extractedPosts: Post[] = rows.slice(1).map((row: (string | null)[]) => ({
                    caption: row[0] || '', // Caption in the first column
                    imageUrls: row[2] ? row[2].split(',').map(url => url.trim()) : [] // Split the URLs in the third column
                }));

                setPosts(extractedPosts);
            } catch (error) {
                // Cast error to Error type
                if (error instanceof Error) {
                    setError(error.message); // Now TypeScript recognizes error.message
                } else {
                    setError('An unknown error occurred'); // Fallback for unknown errors
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Create a single array for all images and their captions
    const allImages: { url: string; caption: string }[] = [];

    posts.forEach(post => {
        post.imageUrls.forEach(url => {
            allImages.push({ url, caption: post.caption });
        });
    });

    // Get the latest 5 images only
    const latestImages = allImages.slice(0, 5);

    return (
        <div>
            <h1>My Instagram Posts</h1>
            <div className={styles.gridContainer}>
                {latestImages.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                        <img 
                            src={image.url} 
                            alt={`Instagram post image ${index + 1}`} 
                            className={styles.image} 
                        />
                        <div className={styles.captionOverlay}>
                            {image.caption}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstagramPosts;
