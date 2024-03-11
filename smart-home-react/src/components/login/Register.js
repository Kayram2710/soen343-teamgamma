import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUserRegistration } from '../../api/apiHelper';
import { User } from '../../bean/User';

const Register = ({ setLoggedInUser }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const navigate = useNavigate();

  const onLogin = () => {
    navigate('/login'); 
  };

  const onRegister = async () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!username) {
      setUsernameError('Username is required');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    const user = new User(email, username, password);

    try {
      const registrationResult = await validateUserRegistration(user);
      if (registrationResult) {
        setLoggedInUser(user);
        navigate('/'); 
      } else {
        setRegistrationError('Registration failed. This User already exists.');
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
      setRegistrationError('An error occurred. Please try again later.');
    }
  };

  return (
    // Full-screen container with Tailwind CSS
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xs">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-6">Register</h2>

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

        {/* Username Input */}
        <div className="mb-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-xs italic">{usernameError}</p>
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
        <p className="text-red-500 text-xs italic mb-4">{registrationError}</p>

        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"  type="button" onClick={onRegister} value={'Register'} />
        <input className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline" type="button" onClick={onLogin} value={'Already have an account? Log in'} />
      </div>
    </div>
  );
};

export default Register;