// pages/europe/[country]/index.tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostsByContinent, getPostsByContinentAndCountry, Post } from '../../../app/API'; // Adjust the import path based on your file structure

interface CountryPageProps {
  country: string;
  posts: Post[];
}

const CountryPage = ({ country, posts }: CountryPageProps) => {
  return (
    <div>
      <h1>Blog Posts in {country}</h1>
      {posts.length > 0 ? (
        posts.map((blog) => (
          <div key={blog._id}>
            <a href={`/europe/${country}/${blog._id}`}>
              <h3>{blog.title}</h3>
              {/* <img src={blog.image} alt={blog.title} /> */}
              <p>{blog.desc}</p>
            </a>
          </div>
        ))
      ) : (
        <p>No blogs available for {country}.</p>
      )}
    </div>
  );
};

// Fetch posts for the given country
export const getStaticProps: GetStaticProps = async (context) => {
  const { country } = context.params as { country: string };

  // Fetch posts for the specific country
  const posts = await getPostsByContinentAndCountry('Europe', country);

  return {
    props: {
      country,
      posts,
    },
    revalidate: 10, // Optional: Set revalidation for incremental static regeneration
  };
};

// Generate dynamic paths for countries with blogs in Europe
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all posts in Europe to get a list of countries with posts
  const posts = await getPostsByContinent('Europe');

  // Create a set to ensure countries are unique
  const countriesSet = new Set<string>();

  // Loop through each post and add the country to the set
  posts.forEach(post => countriesSet.add(post.country));

  // Convert the set back to an array and create paths
  const paths = Array.from(countriesSet).map(country => ({
    params: { country }
  }));

  return {
    paths,
    fallback: 'blocking', // Use 'blocking' or 'true' for dynamic pages
  };
};

export default CountryPage;
