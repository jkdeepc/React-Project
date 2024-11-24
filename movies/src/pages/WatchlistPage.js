import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext"; // 导入 MoviesContext
import RemoveFromWatchlistIcon from "../components/cardIcons/removeFromWatchlist"; // 导入移除观影清单的图标组件
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { useQueries } from "react-query";

const WatchlistPage = () => {
  const { watchlist: movieIds, removeFromWatchlist } = useContext(MoviesContext); // 获取 watchlist 和 removeFromWatchlist 函数
  console.log(movieIds)

const watchListMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["watchlist", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  console.log(watchListMovieQueries)

  const isLoading = watchListMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = watchListMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });


  return (
    <PageTemplate
      title="My Watchlist"
      movies={movies} // 使用上下文中的观影清单电影列表
      action={(movie) => {
        return (
          <RemoveFromWatchlistIcon
            movie={movie}
            onClick={() => removeFromWatchlist(movie)} // 点击移除按钮时，从观影清单中移除电影
          />
        );
      }}
    />
  );
};

export default WatchlistPage;
