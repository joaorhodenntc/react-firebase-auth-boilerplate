import { Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import '../../styles/Login.css';
import { AuthContext } from '../../context/authContext';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Novo estado para mensagens de erro
  const authContext = useContext(AuthContext); 

  useEffect(() => {
    document.title = 'Login - My App';
  }, []);

  const handleCreateAccount = () => {
    navigate('/register');
  };

  const handleGoogleLogin = async () => {
    if (authContext?.signInGoogle) {
      await authContext.signInGoogle();
    }
  };

  const handleSignIn = async () => {
    if (authContext) {
      try {
        await authContext.signInEmail(email, password);
      } catch (error) {
        console.log(error)
        setErrorMessage('Email ou senha incorretos. Verifique suas credenciais.');
    }
  }
  };

  if (!authContext?.signed) {
    return (
      <div className="container">
        <div className="login">
          <h1 className='title'>Back to your digital life</h1>
          <p className='sub-title'>Choose one of the options to go</p>
          <div className="login-inputs">
            <input type="text" value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </div>
          <p className="continue">Or continue with</p>
          <button className="google-btn" onClick={handleGoogleLogin}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google Logo" />
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe a mensagem de erro se existir */}
          <div className="btn-login">
            <button onClick={handleSignIn}>
              Login
            </button>
          </div>
          <p className='no-account'>No account? <span onClick={handleCreateAccount}>Create one</span></p>
        </div>
      </div>
      
    );
  } else {
    return <Navigate to="/home" />;
  }
};

export default Login;
