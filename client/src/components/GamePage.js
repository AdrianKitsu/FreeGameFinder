import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoGameController } from "react-icons/io5";
import AddFavorites from "./AddFavorites";
import { UserContext } from "../context/UserContext";
import ReviewFunction from "./ReviewFunction";

const GamePage = () => {
  //gameId is from path="/game/:game"
  const gameId = useParams().game;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [game, setGame] = useState(null);
  const [status, setStatus] = useState("loading");

  const [favorited, setFavorited] = useState(
    currentUser?.favorites.some((fav) => {
      return fav.id === gameId;
    })
  );

  useEffect(() => {
    if (gameId || currentUser) {
      fetch(`/api/game/${gameId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setGame(data.data);
            setStatus("idle");
            setFavorited(
              currentUser?.favorites.some((fav) => {
                return fav.id === gameId;
              })
            );
          }
        })
        .catch((error) => console.log(error));
    }
  }, [currentUser]);

  if (status === "loading") {
    return (
      <LoadPage>
        <Icon>
          <IoGameController size={"80px"} />
        </Icon>
      </LoadPage>
    );
  }

  const addFavs = (gameTitle) => {
    let UserId = currentUser.email;

    fetch(`/api/${UserId}/favorites`, {
      method: "PATCH",
      body: JSON.stringify({
        title: gameTitle,
        id: gameId,
        favorited,
        url: game.thumbnail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setFavorited(!favorited);
          if (!favorited) {
            setCurrentUser({
              ...currentUser,
              favorites: [
                ...currentUser?.favorites,
                //adding url to POST to retrieve it in profile list of favorites
                { title: gameTitle, id: gameId, url: game.thumbnail },
              ],
            });
          } else {
            // copy array of favorites of current user without replacing entire array
            let copyFavorites = [...currentUser?.favorites];
            // filters and removes specified game with same id
            const removedGame = copyFavorites.filter((fav) => {
              return fav.id !== gameId;
            });
            //sets new favorites array with modified contents aka unfavorited game removed
            setCurrentUser({
              ...currentUser,
              favorites: removedGame,
            });
          }
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Wrapper>
        <Game>
          <TopPart>
            <Img key={game.id} src={game.thumbnail} alt={game.title} />
            <Div>
              <Name>{game.title}</Name>
              <FavLike
                style={favorited ? { color: "yellow" } : { color: "black" }}
                onClick={() => {
                  addFavs(game.title);
                }}
              >
                <AddFavorites />
              </FavLike>
            </Div>
          </TopPart>
          <Container>
            <Desc>
              <li>
                <Ab>About</Ab>
                <Des>{game.short_description}</Des>
              </li>
            </Desc>
            <Info>
              <Title>
                <li>
                  <Word>Title</Word>
                  <G>{game.title}</G>
                </li>
              </Title>
              <Dev>
                <li>
                  <Word>Developer</Word>
                  <G>{game.developer}</G>
                </li>
              </Dev>
              <Pub>
                <li>
                  <Word>Publisher</Word>
                  <G>{game.publisher}</G>
                </li>
              </Pub>
              <Genre>
                <li>
                  <Word>Genre</Word>
                  <G>{game.genre}</G>
                </li>
              </Genre>
              <ReleaseDate>
                <li>
                  <Word>Release Date</Word>
                  <G>{game.release_date}</G>
                </li>
              </ReleaseDate>
            </Info>
          </Container>
          <ReviewContainer>
            <P>Write a Review</P>
            <Divider />
            <ReviewFunction game={game} />
          </ReviewContainer>
        </Game>
      </Wrapper>
    </>
  );
};

const ReviewContainer = styled.div`
  margin-top: 20px;
`;

const P = styled.p`
  display: flex;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  font-size: 25px;
  color: #57575b;
  font-family: var(--font-family-jost);
`;

const Divider = styled.div`
  display: flex;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  margin-top: 8px;
  border-bottom: solid 1px var(--color-titles);
  max-width: 830px;
  width: auto;
  @media (max-width: 1190px) {
    max-width: 530px;
  }
  @media (max-width: 900px) {
    max-width: 160px;
  }
`;

const Container = styled.div``;

const TopPart = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
`;

const Div = styled.div`
  display: column;
`;

const FavLike = styled.button`
  display: flex;
  justify-content: center;
  margin-right: auto;
  height: fit-content;
  background-color: var(--color-main-background);
  border-style: none;
  margin-top: 15px;
  margin-left: auto;
  transition: transform 250ms;
  :hover {
    cursor: pointer;
    transform: scale(1.3);
  }
`;

const Info = styled.div`
  display: grid;
  margin-top: 20px;
  row-gap: 10px;
  max-width: 390px;
  grid-template-columns: auto auto auto;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

const Word = styled.ul`
  font-family: var(--font-family-jost);
  color: #57575b;
`;

const Ab = styled.ul`
  font-family: var(--font-family-jost);
  font-size: 25px;
  color: #57575b;
`;

const Des = styled.ul`
  font-family: var(--font-family-jost);
  font-size: 18px;
  text-overflow: auto;
  color: var(--color-titles);
`;

const G = styled.ul`
  font-family: var(--font-family-jost);
  color: var(--color-titles);
  font-size: 14px;
`;

const ReleaseDate = styled.div`
  li {
    list-style: none;
    font-size: 14px;
  }
`;

const Title = styled.div`
  li {
    list-style: none;
    font-size: 14px;
  }
`;

const Pub = styled.div`
  li {
    list-style: none;
    font-size: 14px;
  }
`;

const Genre = styled.div`
  li {
    list-style: none;
    font-size: 14px;
  }
`;

const Dev = styled.div`
  li {
    list-style: none;
    font-size: 14px;
  }
`;

const Desc = styled.div`
  max-width: 500px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  li {
    list-style: none;
    font-size: 14px;
  }
`;

const Wrapper = styled.div`
  background-color: var(--color-main-background);
  height: 100000000px;
`;

const Game = styled.div`
  display: block;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100vh;
  background-color: var(--color-main-background);
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Img = styled.img`
  display: flex;
  align-items: center;
  max-width: 250px;
  max-height: 200px;
  width: auto;
  height: auto;
  margin-top: 40px;
  margin-bottom: 3px;
`;

const Name = styled.p`
  font-family: var(--font-family-jost);
  color: var(--color-titles);
  font-weight: normal;
  text-align: center;
  font-size: 28px;
  margin-top: 40px;
  text-size-adjust: auto;
  max-width: 250px;
  margin-left: 10px;
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
export default GamePage;
