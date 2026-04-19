import React from "react";
import { createContext } from "react";
export const UserDataContext = createContext();
const serverURL = "http://localhost:8000";
const UserContext = ({ children }) => {
  const value = {
    serverURL,
  };
  return (
    <div>
      <UserDataContext.Provider value={value}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
