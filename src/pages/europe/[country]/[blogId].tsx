// pages/europe/[country]/[blogId].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostById, getPostsByContinentAndCountry, Post } from '../../../app/API'; // Adjust the import path based on your file structure

interface BlogPostProps {
  post: Post | null; // Handle case where post may not exist
}

const BlogPost = ({ post }: BlogPostProps) => {
  if (!post) {
    return <p>Blog post not found.</p>; // Handle case where post is not found
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.img} alt={post.title} />
      <p>{post.desc}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} /> {/* Assuming post.content is HTML */}
    </div>
  );
};

// Fetch the post by ID
export const getStaticProps: GetStaticProps = async (context) => {
  const { blogId } = context.params as { blogId: string };

  // Fetch the specific blog post
  const post = await getPostById(blogId);

  return {
    props: {
      post,
    },
    revalidate: 10, // Optional: Set revalidation for incremental static regeneration
  };
};

// Generate dynamic paths for all blog posts
export const getStaticPaths: GetStaticPaths = async () => {
  const countries = ['france', 'germany', 'italy']; // List all countries
  const paths: { params: { country: string; blogId: string } }[] = [];

  for (const country of countries) {
    // Fetch posts for each country
    const posts = await getPostsByContinentAndCountry('Europe', country);

    // Generate paths for each blog post
    paths.push(
      ...posts.map((post) => ({
        params: { country, blogId: post._id }, // Use lower case for country for consistency
      }))
    );
  }

  return { paths, fallback: 'blocking' };
};

export default BlogPost;
