import {
  createContext,
  useContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { auth } from '@/firebase/initializeFirebase';
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  logOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  logOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession(): AuthContextType {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [isLoading, setLoading] = useState(true);
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('userSession')
      .then((session) => {
        if (session) {
          setSession(session);
        }

        return setPersistence(auth, browserLocalPersistence);
      })
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          const newSession = user ? user.uid : null;

          if (newSession) {
            AsyncStorage.setItem('userSession', newSession).catch((error) => {
              console.error('Error saving session:', error);
            });
          } else {
            AsyncStorage.removeItem('userSession').catch((error) => {
              console.error('Error removing session:', error);
            });
          }

          setSession(newSession);
          setLoading(false);
        });

        return () => {
          unsubscribe();
        };
      })
      .catch((error) => {
        console.error('Error setting session:', error);
        setLoading(false);
      });
  }, []);

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        setSession(null);
        return AsyncStorage.removeItem('userSession');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        logOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
