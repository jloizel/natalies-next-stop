// utils/withAuth.tsx

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Higher-Order Component for authentication
const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const { status } = useSession(); // Only destructure status since session is not used
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Wait for session status to load
      if (status === "unauthenticated") {
        router.push('/admin/login'); // Redirect to login if not authenticated
      }
    }, [status, router]);

    // Show loading state if session is loading
    if (status === "loading") {
      return <p>Loading...</p>;
    }

    // If user is not authenticated, do not render WrappedComponent
    if (status === "unauthenticated") {
      return null; // Or you can return a different loading or redirect component
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  // Set a display name for the authenticated component
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthenticatedComponent;
};

export default withAuth;
