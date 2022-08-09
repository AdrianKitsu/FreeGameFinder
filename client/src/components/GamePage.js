import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoRefresh } from "react-icons/io5";
import ReactCrop from "react-image-crop";

const GamePage = () => {
  //hardcoded userName
  // const user = "Marie";

  //Id is from path="/item/:item"
  const gameId = useParams();
  console.log(gameId);

  const [game, setGame] = useState(null);

  const navigate = useNavigate();

  //when itemPage is opened, fetch get getItem
  useEffect(() => {
    if (gameId) {
      fetch(`/api/game/${gameId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setGame(data.data);
            console.log("asas", data.data);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [gameId]);

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
          <Img key={game.id} src={game.thumbnail} alt={game.title} />
          <Name>{game.title}</Name>
        </Game>
      </Wrapper>
    </>
  );
};

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
  max-width: 1000px;
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
