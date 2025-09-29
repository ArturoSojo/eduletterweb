import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/services/firebase';

interface AuthState {
  user: { uid: string; displayName: string | null } | null;
  loading: boolean;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        setState({
          user: { uid: firebaseUser.uid, displayName: firebaseUser.displayName ?? null },
          loading: false
        });
      } else {
        setState({ user: null, loading: false });
      }
    });

    return unsubscribe;
  }, []);

  return state;
}

