// pages/europe/[country]/index.tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostsByContinentAndCountry, Post } from '../../../app/API'; // Adjust the import path based on your file structure

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
              <img src={blog.img} alt={blog.title} />
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
  const continents = ['Europe'];
  const countries = ['France', 'Germany', 'Italy']; // List all the countries you want to support
  const paths: { params: { country: string } }[] = [];

  // Loop through each country and generate paths
  for (const country of countries) {
    paths.push({ params: { country } });
  }

  return {
    paths,
    fallback: 'blocking', // Use 'blocking' or 'true' for dynamic pages
  };
};

export default CountryPage;
