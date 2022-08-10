import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoGameController } from "react-icons/io5";
import { HiEmojiHappy, HiEmojiSad } from "react-icons/hi";

const GamePage = () => {
  //hardcoded userName
  // const user = "Marie";

  //Id is from path="/item/:item"
  const gameId = useParams().game;

  const [game, setGame] = useState(null);
  const [status, setStatus] = useState("loading");

  const navigate = useNavigate();

  //when itemPage is opened, fetch get getItem
  useEffect(() => {
    if (gameId) {
      fetch(`/api/game/${gameId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setGame(data.data);
            setStatus("idle");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [gameId]);

  if (status === "loading") {
    return (
      <LoadPage>
        <Icon>
          <IoGameController size={"80px"} />
        </Icon>
      </LoadPage>
    );
  }

  //when pressing the add button
  // const addIntoCart = () => {

  //   // POST request : create cart
  //   fetch(`/api/cart/${user}`, {
  //     method: "POST",
  //     body: JSON.stringify({ ...item, quantity }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status === 200) {
  //         setMessage(true);
  //         setTimeout(() => {
  //           setMessage(false);
  //           navigate("/");
  //         }, 1000);
  //       }
  //     })
  //     .catch((err) => console.log(err.message));
  // };

  return (
    <>
      <Wrapper>
        <Game>
          <TopPart>
            <Img key={game.id} src={game.thumbnail} alt={game.title} />
            <Name>{game.title}</Name>
            {/* <FavLike>
              <li>
                <ul>
                  <HiEmojiHappy size={"23px"} color={`var(--color-titles)`} />
                </ul>
                <ul>
                  <HiEmojiSad size={"23px"} color={`var(--color-titles)`} />
                </ul>
              </li>
            </FavLike> */}
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
        </Game>
      </Wrapper>
    </>
  );
};

const Container = styled.div``;

const TopPart = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const FavLike = styled.div`
  margin-top: 80px;
  margin-left: -245px;
  li {
    list-style: none;
  }
  ul {
    display: inline;
    margin-right: 5px;
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
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-color: var(--color-main-background);

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Game = styled.div`
  max-width: 100%;
  max-height: fit-content;
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
const Label = styled.label``;

const Input = styled.input`
  width: 30px;
  height: 14px;
  margin-left: 10px;
  font-size: 13px;
`;

const CartMessage = styled.div`
  color: var(--color-point-pink);
  background-color: var(--color-main-white);
  font-size: 16px;
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
export default GamePage;
