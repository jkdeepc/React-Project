import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api"; 
import PageTemplate from "../components/templateMovieListPage";
import Spinner from '../components/spinner';
import { MoviesContext } from "../contexts/moviesContext"; // 导入 MoviesContext
import AddToWatchlistIcon from "../components/cardIcons/AddToWatchlist"; // 导入添加到“必看”列表的图标组件

const UpcomingMoviesPage = () => {
  const { addToWatchlist } = useContext(MoviesContext); // 获取 addToWatchlist 函数

  // 使用 react-query 获取即将上映的电影
  const { data, error, isLoading } = useQuery(
    "upcomingMovies",
    getUpcomingMovies,
    {
      staleTime: 60 * 60 * 1000, // 缓存数据 1 小时
      cacheTime: 24 * 60 * 60 * 1000, // 缓存保留 24 小时
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
          <AddToWatchlistIcon movie={movie} onClick={() => addToWatchlist(movie)} />
        );
      }}
    />
  );
};

export default UpcomingMoviesPage;
