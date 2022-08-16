import React, { useContext } from "react";
import styled from "styled-components";
import { SearchBarContext } from "../context/SearchBarContext";
import { Link } from "react-router-dom";

const GenresHeader = () => {
  const { setSearch } = useContext(SearchBarContext);
  const clearSearch = () => {
    setSearch("");
  };

  return (
    <Header>
      <Filter>
        <Grid>
          <LinkFit to={`/games/MMORPG`} onClick={clearSearch}>
            <button>MMORPG</button>
          </LinkFit>

          <LinkFit to={`/games/MMO`} onClick={clearSearch}>
            <button>MMO</button>
          </LinkFit>

          <LinkLife to={`/games/Shooter`} onClick={clearSearch}>
            <button>Shooter</button>
          </LinkLife>

          <LinkGame to={`/games/Strategy`} onClick={clearSearch}>
            <button>Strategy</button>
          </LinkGame>

          <LinkEnt to={`/games/Fantasy`} onClick={clearSearch}>
            <button>Fantasy</button>
          </LinkEnt>

          <LinkMed to={`/games/Racing`} onClick={clearSearch}>
            <button>Racing</button>
          </LinkMed>

          <LinkGame to={`/games/Social`} onClick={clearSearch}>
            <button>Social</button>
          </LinkGame>

          <LinkEnt to={`/games/Sports`} onClick={clearSearch}>
            <button>Sports</button>
          </LinkEnt>

          <LinkEnt to={`/games/Fighting`} onClick={clearSearch}>
            <button>Fighting</button>
          </LinkEnt>

          <LinkEnt to={`/games/Card%20Game`} onClick={clearSearch}>
            <button>Card Game</button>
          </LinkEnt>

          <LinkEnt to={`/games/MOBA`} onClick={clearSearch}>
            <button>MOBA</button>
          </LinkEnt>

          <LinkEnt to={`/games/ARPG`} onClick={clearSearch}>
            <button>ARPG</button>
          </LinkEnt>
        </Grid>
      </Filter>
    </Header>
  );
};

export default GenresHeader;

const Header = styled.div`
  height: fit-content;
  padding: 5px;
  background-color: var(--color-headers-background);
`;

const Filter = styled.div`
  font-family: var(--font-poppins);
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const LinkFit = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  transition: transform 250ms;
  :hover {
    transform: translateY(-2px);
  }
`;

const LinkLife = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  transition: transform 250ms;
  :hover {
    transform: translateY(-2px);
  }
`;

const LinkMed = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  transition: transform 250ms;
  :hover {
    transform: translateY(-2px);
  }
`;

const LinkGame = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  transition: transform 250ms;
  :hover {
    transform: translateY(-2px);
  }
`;

const LinkEnt = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  transition: transform 250ms;
  :hover {
    transform: translateY(-2px);
  }
`;

const LinkPets = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  transition: transform 250ms;
  :hover {
    transform: translateY(-2px);
  }
`;

const Grid = styled.div`
  display: inline-block;
  position: relative;
  justify-content: center;
  margin: auto;
  padding-bottom: 3px;
  button {
    font-family: var(--font-family-jost);
    color: var(--color-titles);
    font-size: 15px;
    background-color: var(--color-headers-background);
    border-style: none;
    border-radius: none;

    :hover {
      cursor: pointer;
    }
  }
  button:last-child {
    margin-right: 0;
  }

  button:after {
    content: "";
    display: block;
    margin: auto;
    height: 2px;
    width: 0px;
    background: transparent;
    transition: width 0.5s ease, background-color 0.5s ease,
      box-shadow 0.25s ease-in-out;
  }
  button:hover:after {
    width: 100%;
    background: var(--color-titles);
    box-shadow: 0px 0px 4px 1px rgba(255, 255, 255, 0.2);
  }
`;
