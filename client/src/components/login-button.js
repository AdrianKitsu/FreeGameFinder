import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      className="btn btn-primary btn-block"
      onClick={() => loginWithRedirect()}
    >
      <P>Sign In</P>
    </Button>
  );
};

export default LoginButton;

const Button = styled.button`
  background-color: var(--color-headers-background);
  color: white;
  border-color: white;
  border: solid 1px;
  border-radius: 4px;
  transition: transform 250ms, box-shadow 0.25s;
  :hover {
    cursor: pointer;
    box-shadow: 0px 0px 7px 1px rgba(255, 255, 255, 0.2);
    transform: scale(1.06);
  }
`;

const P = styled.div`
  padding: 4px;
  font-family: var(--font-family-jost);
`;
