import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getTVShowDetails, getTVShowRecommendations, getTVShowCredits } from "../api/tmdb-api";

const TVShowDetailPage = () => {
  const { id } = useParams();
  const [hovered, setHovered] = useState(null); // 状态追踪悬停的推荐节目 ID

  // 获取 TV 节目详情
  const { data: tvShow, isLoading: isLoadingDetails } = useQuery(
    ["tvShowDetails", id],
    () => getTVShowDetails(id),
    {
      staleTime: 3600000, // 缓存 1 小时
      cacheTime: 86400000, // 缓存 24 小时
    }
  );

  // 获取推荐的 TV 节目
  const { data: recommendationsData, isLoading: isLoadingRecommendations } = useQuery(
    ["tvShowRecommendations", id],
    () => getTVShowRecommendations(id),
    {
      staleTime: 1800000, // 缓存 30 分钟
      cacheTime: 86400000, // 缓存 24 小时
    }
  );

  // 获取 TV 节目的演员信息
  const { data: creditsData, isLoading: isLoadingCredits } = useQuery(
    ["tvShowCredits", id],
    () => getTVShowCredits(id),
    {
      staleTime: 1800000, // 缓存 30 分钟
      cacheTime: 86400000, // 缓存 24 小时
    }
  );

  // 检查是否在加载中
  if (isLoadingDetails || isLoadingRecommendations || isLoadingCredits) {
    return <div>Loading...</div>;
  }

  const recommendations = recommendationsData?.results || [];
  const credits = creditsData?.cast || [];

  return (
    <div style={styles.container}>
      <h2>{tvShow.name}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
        alt={tvShow.name}
        style={styles.image}
      />
      <p>{tvShow.overview}</p>

      {/* Recommendations Section */}
      <h3>Recommendations</h3>
      <div style={styles.recommendations}>
        {recommendations.length > 0 ? (
          <div style={styles.recommendationList}>
            {recommendations.map((show) => (
              <div
                key={show.id}
                style={styles.recommendationItem}
                onMouseEnter={() => setHovered(show.id)} // 鼠标悬停进入
                onMouseLeave={() => setHovered(null)}   // 鼠标悬停离开
              >
                <Link to={`/tv/${show.id}`} style={styles.recommendationLink}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    style={{
                      ...styles.recommendationImage,
                      transform: hovered === show.id ? 'scale(1.1)' : 'scale(1)', // 根据悬停状态调整大小
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  />
                  <h4>{show.name}</h4>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>

      {/* Cast Section */}
      <h3>Cast</h3>
      <div style={styles.cast}>
        {credits.length > 0 ? (
          <div style={styles.castList}>
            {credits.map((actor) => (
              <div key={actor.id} style={styles.castItem}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  style={styles.castImage}
                />
                <h4>{actor.name}</h4>
              </div>
            ))}
          </div>
        ) : (
          <p>No cast information available.</p>
        )}
      </div>
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
  image: {
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  recommendations: {
    marginTop: "20px",
  },
  recommendationList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  recommendationItem: {
    textAlign: "center",
    width: "30%",
    minWidth: "150px",
    cursor: "pointer",
  },
  recommendationImage: {
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  recommendationLink: {
    textDecoration: "none",
    color: "inherit",
  },
  cast: {
    marginTop: "20px",
  },
  castList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  castItem: {
    textAlign: "center",
    width: "30%",
    minWidth: "100px",
  },
  castImage: {
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
};

export default TVShowDetailPage;
