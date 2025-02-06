import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const useTopRatedMovies = () => {
  const TopRatedMovies = useSelector(
    (store) => store.movies.TopRatedMovies
  );
  const dispatch = useDispatch();
  const getTopRatedMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS)
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
    // console.log(json.results);
  };

  useEffect(() => {
    if(!TopRatedMovies)
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
