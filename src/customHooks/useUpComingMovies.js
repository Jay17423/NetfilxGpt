import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUpComingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const useUpComingMovies = () => {
  const UpComingMovies = useSelector(
    (store) => store.movies.UpComingMovies
  );
  const dispatch = useDispatch();
  const getUpComingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS)
    const json = await data.json();
    // console.log(json.results);
    dispatch(addUpComingMovies(json.results));
  };

  useEffect(() => {
    if(!UpComingMovies)
    getUpComingMovies();
  }, []);
};

export default useUpComingMovies;
