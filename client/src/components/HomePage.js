import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoRefresh } from "react-icons/io5";
import { SearchBarContext } from "../context/SearchBarContext";

// Project Completed

const HomePage = () => {
  const [games, setGames] = useState();
  const [status, setStatus] = useState("loading");
  //get search state variable that was set by searchbar from useContext
  const { search } = useContext(SearchBarContext);

  // get all items
  useEffect(() => {
    fetch(`/api/games`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setGames(data.data);
        setStatus("idle");
      });
  }, []);

  if (status === "loading") {
    return (
      <LoadPage>
        <Icon>
          <IoRefresh size={"80px"} />
        </Icon>
      </LoadPage>
    );
  }

  // create a filteredItem variable that will hold the items filtered based on search
  const filteredGames = games.results.filter((game) => {
    if (game.title.toLowerCase().includes(search)) {
      return game;
    }
  });

  return (
    <>
      <Container>
        <Wrapper>
          {
            //if the filteredItems array has no items tell the user
            filteredGames.length === 0 ? (
              <Oops>looks like nothing matches your search...</Oops>
            ) : (
              //display items based on what is serached in search bar will show everything if nothing is typed
              filteredGames.map((theGames) => {
                return (
                  <Game>
                    <Linkw to={`game/${theGames.id}`}>
                      <Img
                        key={theGames}
                        src={theGames.thumbnail}
                        alt={theGames.title}
                      />
                      <Name>{theGames.title}</Name>
                    </Linkw>
                  </Game>
                );
              })
            )
          }
        </Wrapper>
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.div`
  background-color: var(--color-main-background);
  padding-top: 14px;
  padding-bottom: 14px;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 250px 250px 300px;
  row-gap: 10px;
  grid-gap: 20px;
  margin-top: 20px;
`;

const Game = styled.div`
  max-width: fit-content;
  max-height: fit-content;
  transition: transform 250ms, opacity 0.25s ease-in-out;
  :hover {
    transform: translateY(-7px);
  }
`;

const Linkw = styled(Link)`
  text-decoration: none;
  color: black;
  width: max-content;
  :hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  display: flex;
  align-items: center;
  max-width: 250px;
  max-height: 250px;
  width: auto;
  height: auto;
  margin: 30px;
  margin-bottom: 3px;
`;

const Name = styled.p`
  font-family: var(--font-family-jost);
  color: var(--color-titles);
  font-weight: normal;
  text-align: center;
  text-size-adjust: auto;
  max-width: 250px;
  margin-left: 50px;
`;

const LoadPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--color-main-blue);
  background-color: var(--color-main-brown);
`;

const Icon = styled.div`
  animation: rotation 2s infinite linear;
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

const Oops = styled.div`
  font-family: var(--font-poppins);
  width: 100vw;
`;
