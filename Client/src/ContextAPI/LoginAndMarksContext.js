import React, { createContext, useContext, useState, useEffect } from "react";

const UserDataContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve from sessionStorage or return null
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [marksData, setMarksData] = useState(() => {
    // Retrieve from sessionStorage or return empty array
    const storedMarksData = sessionStorage.getItem("marksData");
    return storedMarksData ? JSON.parse(storedMarksData) : [];
  });

  useEffect(() => {
    // Store user data in sessionStorage when it changes
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    // Store marksData in sessionStorage when it changes
    if (marksData.length) {
      sessionStorage.setItem("marksData", JSON.stringify(marksData));
    }
  }, [marksData]);

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

export const UseDataContexts = () => useContext(UserDataContext);
