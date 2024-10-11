import { useRouter } from 'next/router';
import { getPostsByContinentAndCountry, Post } from '../../../app/API'; // Adjust path as necessary
import { useEffect, useState } from 'react';

const CountryPage = () => {
  const router = useRouter();
  const { country } = router.query; // Get country slug from the URL
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (country) {
      // Fetch posts based on continent and country slug
      getPostsByContinentAndCountry('Europe', country as string).then((data) => {
        setPosts(data);
      });
    }
  }, [country]);

  return (
    <div>
      <h1>Posts about {country}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <a href={`${country}/${post.title}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryPage;
