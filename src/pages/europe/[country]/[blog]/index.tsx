import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPostsByContinentAndCountry, Post } from '../../../../app/API'; // Adjust the path as necessary

const BlogIndex = () => {
  const router = useRouter();
  const { country, continent } = router.query; // Get the country and continent from the URL
  
  const [posts, setPosts] = useState<Post[]>([]); // Define the state for storing an array of posts

  useEffect(() => {
    if (country && continent) {
      // Fetch posts when country and continent are available
      getPostsByContinentAndCountry(continent as string, country as string)
        .then((data) => {
          setPosts(data); // Set the state to the posts
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
    }
  }, [country, continent]); // Depend on country and continent

  if (!country || !continent) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <h1>Blogs from {country}</h1>
      {posts.length === 0 ? (
        <p>No blogs found for {country}.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <a href={`/${continent}/${country}/${post._id}`}>{post.title}</a> {/* Link to individual blog */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogIndex;
