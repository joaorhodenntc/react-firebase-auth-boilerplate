import React, { useState } from 'react';
import '../styles/UserMenu.css'; 
import defaultAvatar from '../assets/default-avatar.png';

interface UserMenuProps {
  photoURL: string | null; 
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ photoURL, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-menu">
      <img 
        src={photoURL || defaultAvatar} 
        className="user-avatar" 
        onClick={toggleMenu} // Alterna o menu ao clicar na imagem
      />
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>Meu Perfil</li>
            <li onClick={onLogout}>Sair</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
