import { useParams } from "react-router-dom";
const TVPage = () => {
  const { id } = useParams();

  return <div>TV page {id}</div>;
};

export default TVPage;
