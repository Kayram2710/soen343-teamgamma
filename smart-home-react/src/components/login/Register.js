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
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Register</div>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={email}
          placeholder="Enter your email"
          onChange={(ev) => setEmail(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={username}
          placeholder="Enter your username"
          onChange={(ev) => setUsername(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(ev) => setPassword(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onRegister}
          value="Register"
        />
        <label className="errorLabel">{registrationError}</label>
      </div>
    </div>
  );
};

export default Register;