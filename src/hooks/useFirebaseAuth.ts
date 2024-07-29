// src/hooks/useFirebaseAuth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Cambiamos la importación a next/navigation
import { auth, signOut } from '../lib/firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';

const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return { user, logout };
};

export default useFirebaseAuth;
