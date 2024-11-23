import React, { useState } from "react";
import { useQuery } from "react-query";
import { searchTVShows, getGenres, getTVShowsByGenre, getPopularTVShows } from "../api/tmdb-api"; // 导入 getPopularTVShows
import { Link } from "react-router-dom";

const TVPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 搜索关键字
  const [searchResults, setSearchResults] = useState([]); // 保存搜索结果
  const [hoveredTV, setHoveredTV] = useState(null); // 新增状态来追踪悬停的 TV 节目 ID
  const [selectedGenre, setSelectedGenre] = useState(""); // 保存所选的类型

  // 使用 react-query 获取电影类型
  const { data: genres, isLoading: isLoadingGenres } = useQuery("movieGenres", getGenres);

  // 使用 react-query 获取特定类型的 TV 节目
  const { data: tvShowsByGenre, isLoading: isLoadingTVShows } = useQuery(
    ["tvShowsByGenre", selectedGenre],
    () => getTVShowsByGenre(selectedGenre, 3), // 拉取3页数据
    {
      enabled: !!selectedGenre, // 只有在用户选择了类型后才会进行请求
    }
  );

  // 使用 react-query 获取流行的 TV 节目（作为默认内容）
  const { data: popularTVShows } = useQuery(
    "popularTVShows",
    getPopularTVShows
  );

  const handleSearch = async () => {
    try {
      const result = await searchTVShows(searchTerm);
      setSearchResults(result.results);
    } catch (error) {
      console.error("Error searching TV shows:", error);
    }
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  if (isLoadingGenres || (selectedGenre && isLoadingTVShows)) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2>TV Shows</h2>

      {/* 搜索框 */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a TV show..."
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchButton}>
          Search
        </button>
      </div>

      {/* 类型选择下拉菜单 */}
      <div style={styles.genreFilterContainer}>
        <label htmlFor="genreSelect">Filter by Movie Genre: </label>
        <select id="genreSelect" value={selectedGenre} onChange={handleGenreChange} style={styles.genreSelect}>
          <option value="">All</option>
          {genres.genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* 搜索结果展示 */}
      {searchResults.length > 0 ? (
        <div style={styles.searchResults}>
          <h3>Search Results</h3>
          <div style={styles.tvList}>
            {searchResults.map((show) => (
              <div key={show.id} style={styles.tvItem}>
                <Link to={`/tv/${show.id}`} style={styles.tvLink}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    style={{
                      ...styles.tvImage,
                      transform: hoveredTV === show.id ? "scale(1.1)" : "scale(1)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseEnter={() => setHoveredTV(show.id)}
                    onMouseLeave={() => setHoveredTV(null)}
                  />
                  <h4>{show.name}</h4>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : selectedGenre ? (
        // 显示符合类型的 TV 节目或显示默认内容
        <>
          <h3>TV Shows in Selected Genre</h3>
          <div style={styles.tvList}>
            {tvShowsByGenre && tvShowsByGenre.results.length > 0 ? (
              tvShowsByGenre.results.map((show) => (
                <div key={show.id} style={styles.tvItem}>
                  <Link to={`/tv/${show.id}`} style={styles.tvLink}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={show.name}
                      style={{
                        ...styles.tvImage,
                        transform: hoveredTV === show.id ? "scale(1.1)" : "scale(1)",
                        transition: "transform 0.3s ease-in-out",
                      }}
                      onMouseEnter={() => setHoveredTV(show.id)}
                      onMouseLeave={() => setHoveredTV(null)}
                    />
                    <h4>{show.name}</h4>
                  </Link>
                </div>
              ))
            ) : (
              <>
                <p>No TV shows found for this genre. Here are some popular TV shows instead:</p>
                {popularTVShows && (
                  <div style={styles.tvList}>
                    {popularTVShows.results.map((show) => (
                      <div key={show.id} style={styles.tvItem}>
                        <Link to={`/tv/${show.id}`} style={styles.tvLink}>
                          <img
                            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                            alt={show.name}
                            style={{
                              ...styles.tvImage,
                              transform: hoveredTV === show.id ? "scale(1.1)" : "scale(1)",
                              transition: "transform 0.3s ease-in-out",
                            }}
                            onMouseEnter={() => setHoveredTV(show.id)}
                            onMouseLeave={() => setHoveredTV(null)}
                          />
                          <h4>{show.name}</h4>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <h3>Popular TV Shows</h3>
          <div style={styles.tvList}>
            {popularTVShows && popularTVShows.results.map((show) => (
              <div key={show.id} style={styles.tvItem}>
                <Link to={`/tv/${show.id}`} style={styles.tvLink}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    style={{
                      ...styles.tvImage,
                      transform: hoveredTV === show.id ? "scale(1.1)" : "scale(1)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseEnter={() => setHoveredTV(show.id)}
                    onMouseLeave={() => setHoveredTV(null)}
                  />
                  <h4>{show.name}</h4>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// 样式对象
const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "auto",
  },
  searchContainer: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  searchInput: {
    padding: "10px",
    fontSize: "16px",
    flexGrow: 1,
  },
  searchButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  genreFilterContainer: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  genreSelect: {
    padding: "10px",
    fontSize: "16px",
  },
  searchResults: {
    marginTop: "20px",
  },
  tvList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  tvItem: {
    textAlign: "center",
    width: "30%",
    minWidth: "150px",
    cursor: "pointer",
  },
  tvImage: {
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  tvLink: {
    textDecoration: "none",
    color: "inherit",
  },
};

export default TVPage;
