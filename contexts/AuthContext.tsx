import React, { createContext, useContext, type PropsWithChildren, useEffect, useState } from "react";
import { auth } from "@/firebase/initializeFirebase";
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";

interface AuthContextType {
  logOut: () => void,
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  logOut: () => null,
  session: null,
  isLoading: false,
})

export function useSession(): AuthContextType {
  const value = useContext(AuthContext);
  //allows usage of methods defined in said context (i.e. signout, etc.)

  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [isLoading, setLoading] = useState(true);
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    //user is signed in until signed out
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setSession(user ? user.uid : null);
          setLoading(false);
        });

        return () => {
          unsubscribe();
        };
      })
      .catch((error) => {
        console.error("Error setting persistence", error);
        setLoading(false);
      });
  }, []);

  const logOut = async () => { 
    try {
      await auth.signOut(); 
      setSession(null); 
    } catch (error) {
      console.error("Error during logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logOut,
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  )
} 