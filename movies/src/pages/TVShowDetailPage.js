import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTVShowDetails, getTVShowRecommendations, getTVShowCredits } from "../api/tmdb-api";

const TVShowDetailPage = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);  

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        const showDetails = await getTVShowDetails(id);
        setTVShow(showDetails);

        const recommendationsData = await getTVShowRecommendations(id);
        setRecommendations(recommendationsData.results);

        const creditsData = await getTVShowCredits(id);
        setCredits(creditsData.cast);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShowDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
     
      <h2>{tvShow.name}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
        alt={tvShow.name}
        style={styles.image}
      />
      <p>{tvShow.overview}</p>

      
      <h3>Recommendations</h3>
      <div style={styles.recommendations}>
        {recommendations.length > 0 ? (
          <div style={styles.recommendationList}>
            {recommendations.map((show) => (
              <div
                key={show.id}
                style={styles.recommendationItem}
                onMouseEnter={() => setHovered(show.id)}  
                onMouseLeave={() => setHovered(null)}    
              >
                <Link to={`/tv/${show.id}`} style={styles.recommendationLink}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    style={{
                      ...styles.recommendationImage,
                      transform: hovered === show.id ? 'scale(1.1)' : 'scale(1)',
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
