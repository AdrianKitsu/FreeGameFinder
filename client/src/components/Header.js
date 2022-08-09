import styled from "styled-components";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import { useAuth0 } from "@auth0/auth0-react";
import { IoGameController, IoSearch } from "react-icons/io5";

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Banner>
        <Logo>
          <IoGameController size={45} />
        </Logo>
        {/* <SearchContainer>
          <SearchBar
            className="input"
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
            }}
            value={search}
            placeholder={<IoSearch size={15} />}
          ></SearchBar>
        </SearchContainer> */}
        <Login className="justify-content-end">
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Login>
      </Banner>
    </>
  );
};

export default Header;

const Banner = styled.div`
  height: 70px;
  background-color: var(--color-headers-background);
`;

const Logo = styled.div``;

const SearchBar = styled.input`
  height: 30px;
  max-width: 500px;
  width: auto;
  margin-top: 10px;
  border-radius: 10px;
  border-style: none;
  margin-left: 10px;
  padding-left: 10px;
  width: 25vw;
`;

const SearchContainer = styled.div`
  display: flex;
  vertical-align: middle;
  align-items: center;
  margin-left: auto;
`;

const Login = styled.div``;
