import { Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import '../../styles/Login.css';
import { AuthGoogleContext } from '../../context/authGoogle';

export const Login = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthGoogleContext); 

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

  if (!authContext?.signed) {
    return (
      <div className="container">
        <div className="login">
          <h1 className='title'>Back to your digital life</h1>
          <p className='sub-title'>Choose one of the options to go</p>
          <div className="login-inputs">
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </div>
          <p className="continue">Or continue with</p>
          <button className="google-btn" onClick={handleGoogleLogin}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google Logo" />
          </button>
          <div className="btn-login">
            <button>
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
