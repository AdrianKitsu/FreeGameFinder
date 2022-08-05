import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <FilterHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:game" element={<GamePage />} />
        <Route path="/games/category/:category" element={<Category />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order/:user" element={<OrderPage />} />
      </Routes>
    </Router>
  );
};

export default App;
