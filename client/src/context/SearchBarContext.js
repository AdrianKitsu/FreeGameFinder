import { createContext, useState } from "react";

export const SearchBarContext = createContext();

export const SearchBarProvider = ({ children }) => {
  //the input of the search bar will be store in here
  const [search, setSearch] = useState("");
  return (
    <SearchBarContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchBarContext.Provider>
  );
};
