// pages/europe/index.tsx
import Link from 'next/link';
import NavBar from '../../components/navbar/navbar'

const blogPosts = [
  { title: 'Exploring Paris', slug: 'exploring-paris' },
  { title: 'Backpacking through Spain', slug: 'backpacking-through-spain' }
];

const Europe = () => {
  return (
    <div>
      <NavBar />
      <h1>Europe</h1>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/europe/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Europe;