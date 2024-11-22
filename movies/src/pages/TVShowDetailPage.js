import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  
import { getTVShowDetails, getTVShowRecommendations, getTVShowCredits } from "../api/tmdb-api";  

const TVShowDetailPage = () => {
  const { id } = useParams();  
  const [tvShow, setTVShow] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div>
      <h2>{tvShow.name}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
        alt={tvShow.name}
        width={200}
      />
      <p>{tvShow.overview}</p>

      <h3>Recommendations</h3>
      <div className="recommendations">
        {recommendations.length > 0 ? (
          recommendations.map((show) => (
            <div key={show.id}>
              <h4>{show.name}</h4>
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                width={100}
              />
            </div>
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>

      <h3>Cast</h3>
      <div className="cast">
        {credits.length > 0 ? (
          credits.map((actor) => (
            <div key={actor.id}>
              <h4>{actor.name}</h4>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                width={100}
              />
            </div>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </div>
    </div>
  );
};

export default TVShowDetailPage;
