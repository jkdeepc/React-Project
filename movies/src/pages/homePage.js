import React, { useContext } from "react"; 
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { MoviesContext } from "../contexts/moviesContext";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { Link } from 'react-router-dom'; 

const HomePage = () => {
  // 使用 react-query 获取电影数据
  const { Page } = useContext(MoviesContext)
  const { data, error, isLoading, isError } = useQuery(
    ['discoverMovies', { Page }], 
    getMovies,
    {
      staleTime: 60 * 60 * 1000, // 缓存数据 1 小时
      cacheTime: 24 * 60 * 60 * 1000, // 缓存保留 24 小时
    }
  );
  useContext(MoviesContext);
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data?.results || [];

  // 更新收藏夹的逻辑，确保不会导致应用崩溃
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // 定义添加到收藏的函数（只是一个模拟函数）
  const addToFavorites = (movieId) => {
    console.log(`Adding movie with ID ${movieId} to favorites`);
    return true;
  };

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} onClick={() => addToFavorites(movie.id)} />;
        }}
      />

      <div>
        <Link to="/now-playing">Check the now playing movies</Link>
      </div>
    </>
  );
};

export default HomePage;
