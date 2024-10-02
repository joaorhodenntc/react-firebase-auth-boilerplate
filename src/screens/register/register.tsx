import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext, useEffect, useState } from 'react';
import '../../styles/Register.css'

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Novo estado para confirmação
  const [errorMessage, setErrorMessage] = useState(''); // Novo estado para mensagens de erro
  const authContext = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Register - My App';
  }, []);

  const handleLogin = () => {
    navigate('/'); 
  };

  const isValidPassword = (password: string) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }
    
    if (!isValidEmail(email)) {
      setErrorMessage('Por favor, insira um endereço de email válido.');
      return;
    }
  
    if (!isValidPassword(password)) {
      setErrorMessage('A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas e números.');
      return;
    }
  
    if (authContext) {
      try {
        await authContext.signUp(email, password);
        navigate('/');
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error during sign up:", error.message);
          if (error.message.includes('email-already-in-use')) {
            setErrorMessage('Esse email já está em uso. Tente outro.');
          } else if (error.message.includes('invalid-email')) {
            setErrorMessage('O email fornecido é inválido. Tente novamente.');
          } else if (error.message.includes('weak-password')) {
            setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
          } else {
            setErrorMessage('Ocorreu um erro ao registrar. Tente novamente.');
          }
        }
      }
    }
  };

    
  return (
    <div className="container">
      <div className="register">
        <h1 className='title'>Create account</h1>
        <p className='sub-title'>Please enter your details</p>
        <div className="register-inputs">
          <p>Your email</p>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
          <p>Password</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
          <p>Repeat password</p>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat password" />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe a mensagem de erro se existir */}
        <div className="btn-register">
          <button onClick={handleSignUp}>
            Register
          </button>
        </div>
        <p className='have-account'>Have an account?<span onClick={handleLogin}> Login</span></p>
      </div>
    </div>
    
  )
}

export default Register
