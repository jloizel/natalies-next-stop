import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPostById, Post } from '../../../../../app/API'; // Adjust the path as necessary

const BlogPost = () => {
  const router = useRouter();
  const { postId } = router.query; // Get the postId from the URL

  const [post, setPost] = useState<Post | null>(null); // State for storing a single post

  useEffect(() => {
    if (postId) {
      // Fetch the post when postId is available
      getPostById(postId as string)
        .then((data) => {
          if (data) {
            setPost(data); // Set the state to the fetched post
          }
        })
        .catch((error) => {
          console.error('Error fetching the post:', error);
        });
    }
  }, [postId]); // Depend on postId

  if (!post) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.img} alt={post.title} />
      <p>{post.content}</p>
      {/* Display other post details */}
    </div>
  );
};

export default BlogPost;
