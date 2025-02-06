import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BG_URL } from '../utils/constant'

const GptSearch = () => {
  return (
    <div>
      <div className="absolute inset-0 -z-10">
        <img
          src={BG_URL}
          className="w-full h-full object-cover"
          alt="Background"
        />
      </div>
      <GptSearchBar></GptSearchBar>
      <GptMovieSuggestion></GptMovieSuggestion>
    </div>
  )
}

export default GptSearch