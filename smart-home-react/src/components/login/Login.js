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
    // Full-screen container with Tailwind CSS
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xs">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-6">Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-xs italic">{emailError}</p>
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-xs italic">{passwordError}</p>
        </div>

        {/* Error Message */}
        <p className="text-red-500 text-xs italic mb-4">{loginError}</p>

        {/* Buttons */}
        <div className="flex items-center justify-between">
        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline" type="button" onClick={onLogin} value={'Log in'} />
        <input className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"  type="button" onClick={onRegister} value={'Register'} />
        </div>
      </div>
    </div>
  );
};

export default Login;