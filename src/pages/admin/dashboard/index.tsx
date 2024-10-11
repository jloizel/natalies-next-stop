import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If no session, redirect to the sign-in page
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status]);

  // Handle sign-out
  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null;
  }

  // Display the admin dashboard content if the user is logged in
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session.user?.name}!</p>
      <button onClick={handleSignOut}>Sign Out</button>

      {/* Add buttons to create, update, or delete blog posts */}
      <button onClick={() => router.push('/admin/create')}>Create Post</button>
      <button onClick={() => router.push('/admin/manage-posts')}>Manage Posts</button>
    </div>
  );
};

export default Dashboard;
