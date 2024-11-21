
import React from "react";
import { useQuery } from "react-query";
import { fetchNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const NowPlayingPage = () => {
  const { data, error, isLoading, isError } = useQuery("nowPlaying", fetchNowPlayingMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <h1>No movies available</h1>; 
  }

  const movies = data;

  return (
    <PageTemplate
      title="Currently Playing Movies"
      movies={movies}  
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default NowPlayingPage;
