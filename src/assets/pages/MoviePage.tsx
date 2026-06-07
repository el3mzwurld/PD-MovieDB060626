import { useParams } from "react-router-dom";
const MoviePage = () => {
  const { id } = useParams();

  return <div>Movie {id}</div>;
};

export default MoviePage;
