import React, { useContext } from 'react';
import UserContext from './UserContext'; // Import the UserContext
import { useRouter } from 'next/router';

const TopBar = () => {
  const { username, setUsername } = useContext(UserContext); // Get the username and setUsername from context
  const router = useRouter();

  const handleLogout = () => {
    // Clear the username from context
    setUsername("");
    // Optionally redirect to the login page
    router.push('/login');
  };

  return (
    <div className="bg-white text-black p-2 my-3 flex justify-between items-center rounded">
      <div>Welcome, {username}</div>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TopBar;
