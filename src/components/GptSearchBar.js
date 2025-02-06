import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai.js";
import { API_OPTIONS } from "../utils/constant.js";
import { addGptMovieResult } from "../utils/gptSlice.js";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  //Search movie in TMDB databse

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    // console.log(searchText);
    // make an api call to GPT API and get movies results
    const gptQuery =
      "Act as a Movies Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ".only give the name of five movies,comma seperate like the example result given ahead. Example Result: Gadar,Sholay,Don,Golmaal,koi mil gaya";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-4o-mini",
    });
    const gptMovies = gptResults.choices[0]?.message?.content.split(",");
    // console.log(gptMovies);

    //for each movie i will search TMBD API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise,Promise,Promise,Promise,Promise] this will be our result beacuse serachMovieTMDB is a asynch function and it will take time and map will exec without waiting

    const tmdbResults = await Promise.all(promiseArray);
    // console.log(tmdbResults);
    dispatch(
      addGptMovieResult({ moviesName: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[10%] flex justify-center ">
      <form
        className=" w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="p-4 m-4 col-span-9 "
          placeholder={lang[langKey].gptSearchPlaceholder}
          ref={searchText}
        ></input>
        <button
          className=" col-span-3 py-2 px-4 m-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
