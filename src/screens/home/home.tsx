import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import '../../styles/Home.css';

export const Home = () => {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.user) {
    return <div>Loading...</div>; 
  }
  return (
    <div className="container">
      <p>Home</p>
    </div>
  );
};
