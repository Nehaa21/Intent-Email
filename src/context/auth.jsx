import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("loggedIn")
  );

  useEffect(() => {
    // const loggedIn = localStorage.getItem("loggedIn");
    // setCurrentUser(loggedIn);
    const handleStorageChange = (e) => {
      if (e.key === "loggedIn") {
        setCurrentUser(e.newValue === "true");
      }
    };
    window.addEventListener("loggedIn", handleStorageChange);

    return () => {
      window.removeEventListener("loggedIn", handleStorageChange);
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;