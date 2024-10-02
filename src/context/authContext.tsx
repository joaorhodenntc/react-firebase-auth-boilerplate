import { createContext, useEffect, useState, ReactNode } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { app } from '../services/firebaseConfig';
import { Navigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

// Tipagem do contexto
interface AuthContextProps {
  user: User | null;
  signed: boolean;
  signInGoogle: () => Promise<void>; 
  signOut: () => void;
  signUp: (email: string, password: string) => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
}

// Criação do contexto com tipagem inicial
export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null); // Tipagem do `user`

  useEffect(() => {
    const loadStoreAuth = () => {
      //const sessionToken = sessionStorage.getItem("@AuthFireBase:token");
      const sessionUser = sessionStorage.getItem("@AuthFireBase:user");

      if (sessionUser) {
        setUser(JSON.parse(sessionUser) as User); // Converte o JSON para um objeto `User`
      }
    };
    loadStoreAuth();
  }, []);

  const signInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (credential) {
        const token = credential.accessToken;
        const user = result.user;

        setUser(user);
        sessionStorage.setItem("@AuthFireBase:token", token ?? ""); // Garantir que o token seja uma string
        sessionStorage.setItem("@AuthFireBase:user", JSON.stringify(user));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during Google sign-in:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const signOut = () =>{
    sessionStorage.clear();
    setUser(null);
    return <Navigate to="/" />
  }

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      sessionStorage.setItem("@AuthFireBase:user", JSON.stringify(userCredential.user));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during sign up:", error.message);
        throw error;
      }
    }
  };

  const signInEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      sessionStorage.setItem("@AuthFireBase:user", JSON.stringify(userCredential.user));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during sign in:", error.message);
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider value={{ signInGoogle, signed: !!user, user, signOut, signUp, signInEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
