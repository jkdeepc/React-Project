import React, { useState, useEffect } from "react";  // 确保同时导入 useEffect


export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
 // 初始化收藏、评论和必看列表，尝试从 localStorage 中获取
 const [favorites, setFavorites] = useState(() => {
  const savedFavorites = localStorage.getItem("favorites");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
});

const [myReviews, setMyReviews] = useState(() => {
  const savedReviews = localStorage.getItem("myReviews");
  return savedReviews ? JSON.parse(savedReviews) : {};
});

const [watchlist, setWatchlist] = useState(() => {
  const savedWatchlist = localStorage.getItem("watchlist");
  return savedWatchlist ? JSON.parse(savedWatchlist) : [];
});

const [Page, setPage] = useState(1); // 新增状态用于分页

const addToFavorites = (movie) => {
  let newFavorites = [];
  if (!favorites.includes(movie.id)) {
    newFavorites = [...favorites, movie.id];
  } else {
    newFavorites = [...favorites];
  }
  setFavorites(newFavorites);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
};

// 从收藏夹移除
const removeFromFavorites = (movie) => {
  const newFavorites = favorites.filter((mId) => mId !== movie.id);
  setFavorites(newFavorites);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
};

 // 添加到必看列表
 const addToWatchlist = (movie) => {
  let newWatchlist = [];
  if (!watchlist.includes(movie.id)) {
    newWatchlist = [...watchlist, movie.id];
  } else {
    newWatchlist = [...watchlist];
  }
  setWatchlist(newWatchlist);
  localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  console.log("Updated Watchlist: ", newWatchlist); // 输出当前必看列表
};

const handlePageChange = (event, value) => {
  setPage(value);
};

// 添加评论
const addReview = (movie, review) => {
  const newReviews = { ...myReviews, [movie.id]: review };
  setMyReviews(newReviews);
  localStorage.setItem("myReviews", JSON.stringify(newReviews));
};

// 使用 useEffect 同步状态和 localStorage
useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

useEffect(() => {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}, [watchlist]);

useEffect(() => {
  localStorage.setItem("myReviews", JSON.stringify(myReviews));
}, [myReviews]);


  

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        myReviews,
        watchlist,
        addToWatchlist,
        Page, 
        handlePageChange,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
