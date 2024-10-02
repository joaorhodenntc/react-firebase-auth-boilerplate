import { createContext, useEffect, useState, ReactNode } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { app } from '../services/firebaseConfig';
import { Navigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

// Tipagem do contexto
interface AuthGoogleContextProps {
  user: User | null;
  signed: boolean;
  signInGoogle: () => Promise<void>; 
  signOut: () => void;
}

// Criação do contexto com tipagem inicial
export const AuthGoogleContext = createContext<AuthGoogleContextProps | null>(null);

interface AuthGoogleProviderProps {
  children: ReactNode;
}

export const AuthGoogleProvider = ({ children }: AuthGoogleProviderProps) => {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null); // Tipagem do `user`

  useEffect(() => {
    const loadStoreAuth = () => {
      const sessionToken = sessionStorage.getItem("@AuthFireBase:token");
      const sessionUser = sessionStorage.getItem("@AuthFireBase:user");

      if (sessionToken && sessionUser) {
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

  return (
    <AuthGoogleContext.Provider value={{ signInGoogle, signed: !!user, user, signOut }}>
      {children}
    </AuthGoogleContext.Provider>
  );
};
