import axios, { AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = 'https://natalies-next-stop-server.vercel.app/'; // Update with your backend server URL

// Create an Axios instance with custom configurations
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define types for request data and response data
export interface Post {
  _id: string;
  title: string;
  desc: string;
  img: string;
  content: string;
  continent: string;
  country: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PostInput = Omit<Post, '_id' | 'username' | 'createdAt' | 'updatedAt'>;

// API functions

// Create a new post
export const createPost = async (postData: PostInput): Promise<Post> => {
  try {
    const response: AxiosResponse<Post> = await api.post('/post/create', postData);
    return response.data;
  } catch (error) {
    throw error; // Throw the error message from the server
  }
};

// Get a single post by ID
export const getPostById = async (postId: string): Promise<Post | null> => {
  try {
    const response: AxiosResponse<{ post: Post }> = await api.get(`/post/get/${postId}`);
    return response.data.post;
  } catch (error) {
    if (error === 404) {
      return null; 
    }
    throw error; // Throw other errors
  }
};

// Get all posts
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response: AxiosResponse<{ post: Post[] }> = await api.get('/post/get');
    return response.data.post || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Get posts by continent
export const getPostsByContinent = async (continent: string): Promise<Post[]> => {
  try {
    const response: AxiosResponse<{ post: Post[] }> = await api.get(`/post/continent/${continent}`);
    return response.data.post || [];
  } catch (error) {
    console.error('Error fetching posts by continent:', error);
    return [];
  }
};

// Get posts by continent and country
export const getPostsByContinentAndCountry = async (continent: string, country: string): Promise<Post[]> => {
  try {
    const response: AxiosResponse<{ post: Post[] }> = await api.get(`/post/continent/${continent}/country/${country}`);
    return response.data.post || [];
  } catch (error) {
    console.error('Error fetching posts by continent and country:', error);
    return [];
  }
};

// Update a post by ID
export const updatePost = async (postId: string, postData: Post): Promise<Post> => {
  try {
    const response: AxiosResponse<Post> = await api.patch(`/post/update/${postId}`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a post by ID
export const deletePost = async (postId: string): Promise<{ message: string }> => {
  try {
    const response: AxiosResponse<{ post: Post; message: string }> = await api.delete(`/post/delete/${postId}`);
    return { message: response.data.message };
  } catch (error) {
    throw error;
  }
};
