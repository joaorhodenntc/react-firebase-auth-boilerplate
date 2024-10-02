import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import '../../styles/Home.css';

export const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Home - My App';
  }, []);

  if (!authContext || !authContext.user) {
    return <div>Loading...</div>; 
  }
  return (
    <div className="container">
      
    </div>
  );
};
