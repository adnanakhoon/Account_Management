import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State to store email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to store users retrieved from local storage
  const [users, setUsers] = useState([]);
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Effect to run on component mount
  useEffect(() => {
    // Retrieve existing users from local storage or initialize an empty array
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Handler for form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // Find the user matching the entered email and password
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      // If user is found, save the user data in local storage and navigate to the account page
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/account');
    } else {
      // Show an alert if the email or password is incorrect
      alert('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> 
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex justify-center">
           <button
            onClick={() => navigate('/register')}
            className="mt-4 text-indigo-600 hover:text-indigo-900"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
