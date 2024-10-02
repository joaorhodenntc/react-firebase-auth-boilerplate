import React from 'react';
import { useContext } from 'react';
import '../styles/Navbar.css'; // Estilos da Navbar
import { AuthContext } from '../context/authContext';
import UserMenu from './userMenu';

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.user) {
    return null; 
  }

  const userLogado = authContext.user; 
  const signOut = authContext.signOut;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <UserMenu photoURL={userLogado.photoURL} onLogout={signOut} />
      </div>
    </nav>
  );
};

export default Navbar;
