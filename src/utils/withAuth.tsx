// utils/withAuth.tsx

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Wait for session status to load
      if (status === "unauthenticated") {
        router.push('/admin/login'); // Redirect to login if not authenticated
      }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
      return <p>Loading...</p>; // Optionally show a loading state
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
