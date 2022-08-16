import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Wrapper>
      <ProfileContainer>
        <Top>{currentUser?.username}'s Profile</Top>
      </ProfileContainer>
      <FavTitleContainer>
        <Favs>Favorites</Favs>
      </FavTitleContainer>
      <Divider />

      <Wrap>
        {currentUser?.favorites.map((favs) => {
          return (
            <Game>
              <Linkw to={`/game/${favs.id}`}>
                <Img key={favs} src={favs.url} alt={favs.title} />
                <Name>{favs.title}</Name>
              </Linkw>
            </Game>
          );
        })}
      </Wrap>
    </Wrapper>
  );
};

export default Profile;

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

const Top = styled.div`
  margin-bottom: 50px;
  font-family: var(--font-family-jost);
  font-size: 26px;
  color: var(--color-titles);
`;

const Divider = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: solid 1px var(--color-titles);
  margin: 10px;
  max-width: 550px;
  width: auto;
  margin-right: auto;
  margin-left: auto;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--color-main-background);
`;

const FavTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--color-main-background);
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  background-color: var(--color-main-background);
  padding-top: 14px;
  padding-bottom: 14px;
  min-height: 100vh;
`;

const Wrap = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: auto auto auto;
  margin-top: 25px;
  grid-gap: 40px;
  row-gap: 30px;
  background-color: var(--color-main-background);
  padding-top: 14px;
  margin-top: 0px;
  @media (max-width: 1190px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 900px) {
    grid-template-columns: auto;
  }
`;

const Favs = styled.div`
  font-size: 25px;
  color: #57575b;
  font-family: var(--font-family-jost);
`;
