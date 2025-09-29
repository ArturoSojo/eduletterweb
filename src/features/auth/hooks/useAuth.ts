import { useEffect, useState } from 'react';

interface AuthState {
  user: { uid: string; displayName: string | null } | null;
  loading: boolean;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  useEffect(() => {
    // TODO: conectar con Firebase Auth
    const timeout = setTimeout(() => {
      setState({ user: null, loading: false });
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return state;
}
