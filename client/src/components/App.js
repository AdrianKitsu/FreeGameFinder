import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import GamePage from "./GamePage";
import Header from "./Header";
import GlobalStyles from "./GlobalStyles";
import FilteringHeader from "./FilteringHeader";
import Profile from "./Profile";
import Category from "./Category";
import PostPage from "./PostPage";
import UserFavs from "./userFavs";
import GenresHeader from "./GenresHeader";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <GenresHeader />
      <FilteringHeader />
      <UserFavs />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:game" element={<GamePage />} />
        <Route path="/games/:genre" element={<Category />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/user/" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
