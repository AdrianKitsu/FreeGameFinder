import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

const AllPosts = () => {
  const { updateFeed, currentUser, updatePosts, setUpdatePosts } =
    useContext(UserContext);
  //grabs all posts
  useEffect(() => {
    fetch(`/api/allposts/`)
      .then((res) => res.json())
      .then((response) => {
        setUpdatePosts(response.data);
      });
  }, []);

  return (
    <>
      <GamePosts>
        {updatePosts?.map((post) => {
          return (
            <PostContainer>
              <LinkGame to={`/game/${post.id}`}>
                <Img>
                  <GameImg src={post.url}></GameImg>
                  <Title>{post.title}</Title>
                </Img>

                <Text>"{post.status}"</Text>
                <Author>-{post.username}</Author>
              </LinkGame>
            </PostContainer>
          );
        })}
      </GamePosts>
    </>
  );
};

const LinkGame = styled(NavLink)`
  text-decoration: none;
  color: black;
  width: max-content;
`;

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
  display: flex;
  justify-content: center;
  color: white;
  font-size: 9px;
  margin-top: -6px;
  margin-left: 21px;
  margin-right: auto;
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
  transition: transform 250ms, box-shadow 0.25s ease-in-out;
  :hover {
    transform: scale(1.07);
    box-shadow: 0px 0px 24px 2px rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`;

const GamePosts = styled.div`
  display: flex column;
  background-color: var(--color-main-background);
`;
export default AllPosts;
