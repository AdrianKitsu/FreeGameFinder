import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  //the input of the search bar will be store in here
  const { user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ email: user.email }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCurrentUser(data.data);
        });
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
