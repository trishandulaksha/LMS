import React, { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User login details
  const [marksData, setMarksData] = useState([]); // Marks data from the backend

  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser,
        marksData,
        setMarksData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook to use GlobalContext
export const UseDataContexts = () => useContext(UserDataContext);
