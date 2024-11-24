import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";

function MovieListPageTemplate({ movies = [], title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => m && m.title && typeof m.title === "string") // 确保电影对象存在并且 title 是字符串（新增检查，避免 undefined 错误）
    .filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids && Array.isArray(m.genre_ids) && m.genre_ids.includes(genreId) : true));

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid container spacing={3} sx={{ padding: "20px" }}>
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          lg={3} 
          xl={2}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9} xl={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* 如果没有电影，显示提示信息 */}
          {displayedMovies.length > 0 ? (
            <MovieList action={action} movies={displayedMovies} />
          ) : (
            <p>No movies found. Please adjust your filter.</p>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
