import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createPost } from '../../../app/API'; // Assuming you have a function to create a post

const CreatePost = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [content, setContent] = useState('');
  const [continent, setContinent] = useState('');
  const [country, setCountry] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is authenticated and has admin role
    if (session?.user?.role !== 'admin') {
      alert('You are not authorized to perform this action');
      return;
    }

    try {
      // Include the username from session data
      await createPost({
        title,
        desc,
        img,
        content,
        continent,
        country,
      });
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder="Image URL"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <input
          type="text"
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          placeholder="Continent"
          required
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
