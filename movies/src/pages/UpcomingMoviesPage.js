import React, { useEffect, useState, useContext } from "react";
import { getUpcomingMovies } from "../api/tmdb-api"; 
import PageTemplate from "../components/templateMovieListPage";
import Spinner from '../components/spinner';
import { MoviesContext } from "../contexts/moviesContext"; // 导入 MoviesContext
import AddToWatchlistIcon from "../components/cardIcons/AddToWatchlist"; // 导入添加到“必看”列表的图标组件



const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToWatchlist } = useContext(MoviesContext); // 获取 addToWatchlist 函数

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const upcomingMovies = await getUpcomingMovies();
        setMovies(upcomingMovies.results); // 根据返回的数据结构调整
      } catch (error) {
        console.error("Failed to get upcoming movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingMovies();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

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
