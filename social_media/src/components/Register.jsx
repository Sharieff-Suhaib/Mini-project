import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ email, password });
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      setError('Error registering user. Please try again.');
    }
  };

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="flex items-center justify-center [&>div]:w-full">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <form onSubmit={handleSubmit} className="flex flex-col p-6 space-y-1">
              <h3 className="font-semibold tracking-tight text-2xl text-white">Create an account</h3>
              <p className="text-sm text-muted-foreground text-white">Enter your email below to create your account</p>
              <div className="p-6 pt-0 grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-white text-sm font-medium leading-none">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="text-white flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="password" className="text-white text-sm font-medium leading-none">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="text-white flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <button type="submit" className="text-white bg-primary h-9 w-full rounded-md">
                Create account
              </button>
            </form>
            <div className="flex justify-center items-center p-6 pt-0">
                <p className="text-sm text-muted-foreground text-white">Already have an account?</p>
            </div>
            <div className="flex items-center p-6 pt-0">
            
              <button onClick={handleClick} className="text-white bg-primary h-9 w-full rounded-md">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
