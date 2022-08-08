import styled from "styled-components";
// import LoginButton from "./login-button";
// import LogoutButton from "./logout-button";
// import { NavLink } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  // const AuthNav = () => {
  //   const { isAuthenticated } = useAuth0();

  //   return (
  //     <Nav className="justify-content-end">
  //       {isAuthenticated ? <LogoutButton /> : <LoginButton />}
  //     </Nav>
  //   );
  // };

  return (
    <>
      {/* <AuthNav /> */}
      <Div>Header</Div>
    </>
  );
};

export default Header;

const Div = styled.div`
  height: 70px;
  background-color: var(--color-headers-background);
`;
