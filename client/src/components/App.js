import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import GamePage from "./GamePage";
import Favorites from "./Favorites";
import Header from "./Header";
import GlobalStyles from "./GlobalStyles";
import FilteringHeader from "./FilteringHeader";
import Profile from "./Profile";
import Category from "./Category";
import PostPage from "./PostPage";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <FilteringHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:game" element={<GamePage />} />
        <Route path="/games/category/:category" element={<Category />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
