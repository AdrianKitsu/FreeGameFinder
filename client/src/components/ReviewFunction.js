import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

const ReviewFunction = ({ game }) => {
  const { isAuthenticated } = useAuth0();
  const { currentUser, updatePosts, setUpdatePosts } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [count, setCount] = useState(30);

  //fetches posts for specified game
  useEffect(() => {
    fetch(`/api/post/${game.id}`)
      .then((res) => res.json())
      .then((response) => {
        setUpdatePosts(response.data);
      });
  }, []);

  const submitFunc = (evt) => {
    evt.preventDefault();
    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: value,
        username: currentUser.username,
        id: game.id,
        url: game.thumbnail,
        title: game.title,
      }),
    }).catch(() => {});
    fetch(`/api/post/${game.id}`)
      .then((res) => res.json())
      .then((response) => {
        setUpdatePosts(response.data);
      });

    evt.target.reset();
    setCount(30);
  };

  if (isAuthenticated) {
    return (
      <>
        <form
          onSubmit={(evt) => submitFunc(evt)}
          style={{ backgroundColor: "var(--color-main-background)" }}
        >
          <Textarea
            placeholder={`How did you find this game?`}
            onChange={(evt) => {
              setValue(evt.target.value);
              setCount(30 - evt.target.value.length);
            }}
          />
          <CountBut>
            <div style={{ marginTop: "15px" }}>{count}</div>
            <Button>Post</Button>
          </CountBut>
        </form>
        <GamePosts>
          {updatePosts?.map((post) => {
            return (
              <PostContainer>
                <GameImg src={post.url}></GameImg>
                <Title>{post.title}</Title>
                <Text>"{post.status}"</Text>
                <Author>-{post.username}</Author>
              </PostContainer>
            );
          })}
        </GamePosts>
      </>
    );
  } else {
    return (
      <>
        <GamePosts>
          {updatePosts?.map((post) => {
            return (
              <PostContainer>
                <Img>
                  <GameImg src={post.url}></GameImg>
                  <Title>{post.title}</Title>
                </Img>

                <Text>"{post.status}"</Text>
                <Author>-{post.username}</Author>
              </PostContainer>
            );
          })}
        </GamePosts>
      </>
    );
  }
};

export default ReviewFunction;

const Img = styled.div`
  max-width: 100px;
  max-height: 57px;
`;

const Author = styled.p`
  font-size: 14px;
  margin-left: 120px;
  margin-top: 2px;
  font-weight: bold;
`;

const Title = styled.p`
  color: white;
  font-size: 10px;
  margin-left: 40px;
  margin-top: -6px;
`;

const GameImg = styled.img`
  width: 100px;
  margin-top: 10px;
  margin-left: 12px;
  box-shadow: 0px 14px 0px 0px var(--color-headers-background);
  border-radius: 5px;
`;

const Text = styled.div`
  display: flex;
  margin-left: 120px;
  margin-top: -40px;
  text-overflow: auto;
  font-size: auto;
  line-height: 14px;
`;

const PostContainer = styled.div`
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  font-family: var(--font-family-jost);
  max-height: 105px;
  height: 90px;
  max-width: 830px;
  width: 800px;
  background-color: white;
  border-radius: 15px;
  @media (max-width: 1190px) {
    width: 500px;
    height: 100px;
  }
  @media (max-width: 900px) {
    width: 185px;
    height: 160px;
  }
`;

const GamePosts = styled.div`
  display: flex column;
  background-color: var(--color-main-background);
`;

const Textarea = styled.input`
  display: block;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  font-family: var(--font-family-jost);
  height: 80px;
  max-width: 830px;
  width: 800px;
  @media (max-width: 1190px) {
    width: 500px;
  }
  @media (max-width: 900px) {
    width: 180px;
  }
  ::placeholder {
    font-size: 18px;
  }
`;

const Button = styled.button`
  color: white;
  font-size: 16px;
  padding: 5px 14px 5px 14px;
  border-style: none;
  border-radius: 10px;
  font-family: var(--font-family-jost);
  margin-top: 10px;
  margin-left: 15px;
  display: inline-flex;
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

const CountBut = styled.div`
  display: flex;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  font-family: var(--font-family-jost);
  color: white;
`;
