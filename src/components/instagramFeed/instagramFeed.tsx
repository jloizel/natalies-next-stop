"use client";

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

// Define the shape of each Instagram post
type InstagramPost = {
  display_url: string;
  caption: string;
};

// Styled components
const Card = styled.div`
  justify-self: center;
  width: 300px;
  height: 300px;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CaptionOverlay = styled.div`
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  width: 100%;
  text-align: center;
  padding: 10px;
  font-size: 14px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
`;

// The URL for fetching Instagram data
const url =
  'https://www.instagram.com/graphql/query/?query_hash=42323d64886122307be10013ad2dcc44&variables={"id":47817000,"first":6}';

const InstagramFeed = () => {
  // Define the type of state as an array of InstagramPost
  const [insta, setInsta] = useState<InstagramPost[]>([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // // Safely extract display_url and caption
        // const photosArray = data.data.user.edge_owner_to_timeline_media.edges.map(
        //   (edge: any) => ({
        //     display_url: edge.node.display_url,
        //     caption: edge.node.edge_media_to_caption.edges[0]?.node?.text || "No caption", // Fallback for caption
        //   })
        // );
        setInsta(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(insta)

  return (
    <div>
      {insta.map((photo, index) => (
        <div key={index}>
          <img src={photo.display_url} alt={`Instagram post ${index + 1}`} />
          <CaptionOverlay>{photo.caption}</CaptionOverlay>
        </div>
      ))}
    </div>
  );
};

export default InstagramFeed;
