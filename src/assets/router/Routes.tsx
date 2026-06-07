import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MoviePage from "../pages/MoviePage";
import TVPage from "../pages/TVPage";
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MoviePage />} />
      <Route path="/tv/:id" element={<TVPage />} />
    </Routes>
  );
};
