import React from 'react'
import MovieList from "../components/MovieList"
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  // console.log(movies.nowPlayingMovies);
  
  return (
   movies.nowPlayingMovies && ( <div className=' bg-black'>
    <div className='-mt-44 relative z-20 pl-20'>
      <MovieList title = {"Now Playing"} movies = {movies.nowPlayingMovies} />
      <MovieList title = {"Popular"} movies = {movies.PopularMovies} />
      <MovieList title = {"Top Rated"} movies = {movies.TopRatedMovies} />
      <MovieList title = {"UpComing "} movies = {movies.UpComingMovies} />
      </div>
    </div>)
  )
}

export default SecondaryContainer