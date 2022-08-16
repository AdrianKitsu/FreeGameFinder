import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams, NavLink } from "react-router-dom";
import { IoGameController } from "react-icons/io5";
import { SearchBarContext } from "../context/SearchBarContext";

const Category = () => {
  const { genre } = useParams();
  const [genres, setGenres] = useState();
  const [status, setStatus] = useState("loading");

  const { search, setSearch } = useContext(SearchBarContext);
  const clearSearch = () => {
    setSearch("");
  };
  // load more games on homepage
  const [noOfElements, setNoOfElements] = useState(4);
  const loadMore = () => {
    setNoOfElements(noOfElements + noOfElements);
  };

  useEffect(() => {
    fetch(`/api/games/${genre}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("genre", data.data);
        setGenres(data.data);
        setStatus("idle");
      });
  }, [genre]);

  if (status === "loading") {
    return (
      <LoadPage>
        <Icon>
          <IoGameController size={"80px"} />
        </Icon>
      </LoadPage>
    );
  }
  const filteredGames = genres.filter((game) => {
    if (game.title.toLowerCase().includes(search)) {
      return game;
    }
  });

  const slice = filteredGames.slice(0, noOfElements);

  return (
    <>
      <Container>
        <Wrapper>
          {
            //if the filteredItems array has no items tell the user
            slice.length === 0 ? (
              <Oops
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: `var(--font-family-jost)`,
                  color: `var(--color-titles)`,
                  fontSize: "26px",
                }}
              >
                Looks like nothing matches your search...
              </Oops>
            ) : (
              //display items based on what is serached in search bar will show everything if nothing is typed
              slice.map((theGames) => {
                return (
                  <Game onClick={clearSearch}>
                    <Linkw to={`/game/${theGames.id}`}>
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
        <LoadBtn onClick={loadMore}>
          <p>Load More</p>
        </LoadBtn>
        <Posts>Posts</Posts>
      </Container>
    </>
  );
};

const LoadBtn = styled.button`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  max-width: 1000px;
  width: auto;
  height: 30px;
  color: var(--color-titles);
  p {
    font-family: var(--font-family-jost);
    font-size: 18px;
    color: var(--color-main-background);
  }
  transition: transform 250ms, box-shadow 0.25s ease-in-out;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 0px 0px 24px 2px rgba(255, 255, 255, 0.2);
  }
`;

const Posts = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-family: var(--font-family-jost);
  color: var(--color-titles);
  font-size: 26px;
`;

const Container = styled.div`
  background-color: var(--color-main-background);
  padding-top: 14px;
  padding-bottom: 14px;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: auto auto auto;
  margin-top: 25px;
  grid-gap: 40px;
  @media (max-width: 1190px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 900px) {
    grid-template-columns: auto;
  }
`;

const Game = styled.div`
  width: fit-content;
  transition: transform 250ms, box-shadow 0.25s ease-in-out,
    background-color 0.25s ease-in-out;
  :hover {
    box-shadow: 0px 0px 24px 2px rgba(255, 255, 255, 0.2);
    transform: translateY(-7px);
    background-color: var(--color-headers-background);
  }
`;

const Linkw = styled(NavLink)`
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
  margin-bottom: 3px;
`;

const Name = styled.p`
  font-family: var(--font-family-jost);
  color: var(--color-titles);
  font-weight: normal;
  text-align: center;
  text-size-adjust: auto;
`;

const LoadPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--color-headers-background);
  background-color: var(--color-main-background);
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

export default Category;
