import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from '../components/spinner';
import { MoviesContext } from "../contexts/moviesContext";
import AddToWatchlistIcon from "../components/cardIcons/AddToWatchlist";

const UpcomingMoviesPage = () => {
  const { addToWatchlist } = useContext(MoviesContext);

  // 使用 react-query 获取即将上映的电影
  const { data, error, isLoading } = useQuery(
    "upcomingMovies",
    getUpcomingMovies,
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: 24 * 60 * 60 * 1000,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const movies = data?.results || [];

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return (
          <AddToWatchlistIcon
            movie={movie}
            onClick={() => {
              console.log("Adding movie to watchlist:", movie);
              addToWatchlist(movie);
            }}
          />
        );
      }}
    />
  );
};

export default UpcomingMoviesPage;
