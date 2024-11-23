import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import { getMovie } from "../api/tmdb-api";

const MovieReviewPage = () => {
  const { id } = useParams();
  let location = useLocation();
  const initialMovieData = location.state?.movie;
  const initialReviewData = location.state?.review;

  // 使用 react-query 获取电影数据
  const { data: movie, isLoading, isError, error } = useQuery(
    ["movie", id],
    () => getMovie({ queryKey: ["movie", { id }] }),
    {
      enabled: !!id, // 只有在有 id 的情况下才进行请求
      initialData: initialMovieData, // 如果有传递的电影数据，则使用初始数据，避免再次请求
      staleTime: 60 * 60 * 1000, // 缓存 1 小时
      cacheTime: 24 * 60 * 60 * 1000, // 缓存保留 24 小时
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <PageTemplate movie={movie}>
      <MovieReview review={initialReviewData} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
