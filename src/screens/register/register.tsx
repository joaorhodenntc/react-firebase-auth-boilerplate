import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../../styles/Register.css'

export const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Register - My App';
  }, []);

  const handleLogin = () => {
    navigate('/'); 
  };
    
  return (
    <div className="container">
      <div className="register">
        <h1 className='title'>Create account</h1>
        <p className='sub-title'>Please enter your details</p>
        <div className="register-inputs">
          <p>Your email</p>
          <input type="text" placeholder="Enter your email"/>
          <p>Password</p>
          <input type="password" placeholder="Enter your password" />
          <p>Repeat password</p>
          <input type="password" placeholder="Repeat password" />
        </div>
        <div className="btn-register">
          <button>
            Register
          </button>
        </div>
        <p className='have-account'>Have an account?<span onClick={handleLogin}> Login</span></p>
      </div>
    </div>
    
  )
}

export default Register
