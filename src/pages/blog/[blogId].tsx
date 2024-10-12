// pages/blog/[blogId].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { Post, getPostById, getAllPosts } from '../../app/API'; // API imports

interface BlogPageProps {
  post: Post | null;
}

const BlogPage = ({ post }: BlogPageProps) => {
  if (!post) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.img} alt={post.title} />
      <p>{post.content}</p>
      <p>By {post.username}</p>
      <p>Published on: {new Date(post.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

// Fetch blog data at build time
export const getStaticProps: GetStaticProps = async (context) => {
  const { blogId } = context.params as { blogId: string };
  const post = await getPostById(blogId);

  return {
    props: {
      post,
    },
    revalidate: 10, // Optional: Revalidate data at a certain interval
  };
};

// Generate paths for all blog posts
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();

  const paths = posts.map((post) => ({
    params: { blogId: post._id },
  }));

  return { paths, fallback: 'blocking' };
};

export default BlogPage;
