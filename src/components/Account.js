import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  // State to store the current user's data
  const [currentUser, setCurrentUser] = useState(null);
  // State to store the new password entered by the user
  const [newPassword, setNewPassword] = useState('');
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Effect to run on component mount
  useEffect(() => {
    // Retrieve the current user from local storage
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      // If user is found, set the user data in state
      setCurrentUser(user);
    } else {
      // If no user is found, navigate back to the login page
      navigate('/');
    }
  }, [navigate]);

  // Handler for updating the password
  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Retrieve all users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Update the password for the current user
    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? { ...user, password: newPassword } : user
    );
    // Update state and local storage with the new password
    setCurrentUser({ ...currentUser, password: newPassword });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, password: newPassword }));
    // Clear the new password state and show a success message
    setNewPassword('');
    alert('Password updated successfully');
    // Redirect to the home page after updating the password
    navigate('/');
  };

  // Handler for logging out
  const handleLogout = () => {
    // Remove the current user from local storage
    localStorage.removeItem('currentUser');
    // Navigate back to the login page
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Account Information</h2>
        {currentUser && (
          <div>
            <p className="text-center text-gray-700">Email: {currentUser.email}</p>
            <form onSubmit={handlePasswordChange} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="new-password" className="sr-only">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogout}
            className="text-indigo-600 hover:text-indigo-900"
          > 
            Logout
          </button>
        </div>
      </div> 
    </div> 
  );
};

export default Account
