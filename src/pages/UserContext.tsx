import React, { createContext, useState } from 'react';

type UserContextType = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext<UserContextType>({
  username: '',
  setUsername: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState<string>('');
  console.log('UserProvider username',username)

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
