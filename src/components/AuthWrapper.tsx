"use client";

import { useEffect, useState } from 'react';
import { auth } from '../lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
