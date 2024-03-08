import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUserLoggin } from '../../api/apiHelper';
import { User } from '../../bean/User';

const Login = ({ setLoggedInUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const onRegister = () => {
    navigate('/register'); 
  };

  const onLogin = async () => {

    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    const user = new User(email, '', password); 
    try {
      const validationResult = await validateUserLoggin(user);

      if (validationResult) {
        setLoggedInUser(user);
        console.log(validationResult + " AAAAAAA");
        navigate('/'); 
      } else {
        setLoginError('Invalid email or password'); 
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setLoginError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onLogin} value={'Log in'} />
        <input className={'inputButton'} type="button" onClick={onRegister} value={'Register'} />
        <label className="errorLabel">{loginError}</label>
      </div>
    </div>
  );
};

export default Login;