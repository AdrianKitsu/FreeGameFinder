import styled from "styled-components";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import { useAuth0 } from "@auth0/auth0-react";
import { IoGameController, IoGameControllerSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SearchBarContext } from "../context/SearchBarContext";

const Header = () => {
  const { isAuthenticated } = useAuth0();

  const { search, setSearch } = useContext(SearchBarContext);

  const clearSearch = () => {
    setSearch("");
  };

  if (!isAuthenticated) {
    return (
      <>
        <Banner>
          <Logo onClick={clearSearch}>
            <LinkHome to="/">
              <IoGameController size={45} />
            </LinkHome>
          </Logo>
          <SearchContainer>
            <SearchBar
              className="input"
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
              value={search}
              placeholder={"Search for a Game"}
            ></SearchBar>
          </SearchContainer>
          <Login className="justify-content-end" onClick={clearSearch}>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </Login>
        </Banner>
      </>
    );
  } else {
    return (
      <>
        <Banner>
          <Logo onClick={clearSearch}>
            <LinkHome to="/">
              <IoGameController size={45} />
            </LinkHome>
          </Logo>
          <SearchContainer>
            <SearchBar
              className="input"
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
              value={search}
              placeholder={"Search for a Game"}
            ></SearchBar>
          </SearchContainer>
          <LinkProfile
            onClick={clearSearch}
            to={`/user/`}
            style={isAuthenticated ? { display: "block" } : { display: "none" }}
          >
            Profile
          </LinkProfile>
          <Login className="justify-content-end">
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </Login>
        </Banner>
      </>
    );
  }
};

export default Header;

const LinkProfile = styled(Link)`
  margin-top: 28px;
  margin-right: 15px;
  text-decoration: none;
  color: white;
  height: fit-content;
  font-family: var(--font-family-jost);
  transition: transform 250ms;
  :hover {
    color: var(--very-light-blue);
    transform: scale(1.1);
  }
`;

const Banner = styled.div`
  display: flex;
  height: 70px;
  width: 100%;
  background-color: var(--color-headers-background);
`;

const Logo = styled.div`
  width: max-content;
  height: max-content;
  margin-top: 12px;
  margin-left: 10px;
  transition: transform 300ms;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const SearchBar = styled.input`
  height: 30px;
  max-width: 500px;
  width: auto;
  margin-top: 10px;
  border-radius: 10px;
  border-style: none;
  padding-left: 10px;
  width: 25vw;
  :focus {
    box-shadow: 0px 0px 24px 2px rgba(255, 255, 255, 0.2);
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: -7px;
`;

const Login = styled.div`
  position: absolute right;
  margin-top: 25px;
  margin-right: 20px;
`;

const LinkHome = styled(Link)`
  text-decoration: none;
  color: white;
  height: fit-content;
  :hover {
    color: var(--very-light-blue);
  }
`;
