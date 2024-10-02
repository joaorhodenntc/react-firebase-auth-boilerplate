import { useContext } from "react";
import { AuthGoogleContext } from "../../context/authGoogle";
import '../../styles/Home.css';

export const Home = () => {
  const authContext = useContext(AuthGoogleContext);

  if (!authContext || !authContext.user) {
    return <div>Loading...</div>; 
  }
  return (
    <div className="container">
      <p>Home</p>
    </div>
  );
};
