import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = 'https://natalies-next-stop-server.vercel.app/'; // Update with your backend server URL

// Create an Axios instance with custom configurations
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface IContentBlock {
  type: 'text' | 'image' | 'subheader' | 'list'; // Types of content blocks
  content: string; // The actual content
  subContent?: string[]; // Optional array for subcontent, like bullet points

  [key: string]: any; // Allows any other properties
}

export interface ISubsection {
  header: string; // Subsection header
  text: string; // Text content for the subsection
  images: string[]; // Array of image URLs
  contentBlocks: IContentBlock[]; // Array of content blocks for each subsection

  [key: string]: any; // Allows any other properties
}

export interface Post {
  _id: string;
  countryImage: string;
  title: string;
  desc: string;
  introText: string; // New field for intro text
  introImage: string; // New field for intro image
  previewImage: string;
  subsections: ISubsection[]; // Updated to include subsections
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
    console.log(`Fetching post with ID: ${postId}`);
    const response: AxiosResponse<Post> = await api.get(`/post/get/${postId}`);
    return response.data; // Return the post directly
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error fetching post:', axiosError);

    // Check for 404 error
    if (axiosError.response && axiosError.response.status === 404) {
      return null; 
    }
    throw error; // Rethrow other errors
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
  console.log(`Fetching posts for continent: ${continent}`);
  try {
    const response: AxiosResponse<Post[]> = await api.get(`/post/continent/${continent}`);
    console.log('Response from API:', response.data); // Log the response from the API
    return response.data; // Change this line to return response.data directly
  } catch (error) {
    console.error('Error fetching posts by continent:', error);
    return [];
  }
};

// Get posts by continent and country
export const getPostsByContinentAndCountry = async (continent: string, country: string): Promise<Post[]> => {
  try {
    const response: AxiosResponse<Post[]> = await api.get(`/post/continent/${continent}/country/${country}`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching posts by continent and country:', error);
    return [];
  }
};

// Update a post by ID
export const updatePost = async (postId: string, postData: Partial<PostInput>): Promise<Post> => {
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
