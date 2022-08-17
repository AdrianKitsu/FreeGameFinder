import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { SearchBarContext } from "../context/SearchBarContext";
import { UserContext } from "../context/UserContext";

const UserFavs = () => {
  const { isAuthenticated } = useAuth0();
  const { currentUser } = useContext(UserContext);
  const { search, setSearch } = useContext(SearchBarContext);
  const clearSearch = () => {
    setSearch("");
  };

  if (isAuthenticated) {
    return (
      <>
        <Wrapper>
          <Container>Favorites</Container>
          <Div />
          {currentUser?.favorites?.map((favs) => {
            return (
              <li onClick={clearSearch}>
                <LinkGame to={`/game/${favs?.id}`}>{favs?.title}</LinkGame>
              </li>
            );
          })}
        </Wrapper>
      </>
    );
  } else {
    return <></>;
  }
};

export default UserFavs;

const LinkGame = styled(NavLink)`
  text-decoration: none;
  color: white;
  transition: transform 250ms, box-shadow 0.25s ease-in-out;
  :hover {
    cursor: pointer;
  }
`;

const Div = styled.div`
  border-bottom: solid 1px var(--color-titles);
  margin: 10px;
  width: auto;
  max-width: 140px;
`;

const Wrapper = styled.div`
  height: fit-content;
  padding-bottom: 10px;
  max-width: 190px;
  width: 160px;
  position: absolute;
  right: 0px;
  margin-left: 30px;
  color: white;
  background-color: var(--color-headers-background);
  font-family: var(--font-family-jost);
  li {
    margin-top: 4px;
    line-height: 25px;
    text-align: center;
    font-size: 12px;
    font-family: var(--font-family-jost);
    list-style: none;
    color: var(--color-titles);
    transition: transform 250ms, text-shadow 0.25s;
    :hover {
      transform: scale(1.1);
      text-shadow: 0 0 1px #fff, 0px 0px 4px rgba(255, 255, 255, 0.3);
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
