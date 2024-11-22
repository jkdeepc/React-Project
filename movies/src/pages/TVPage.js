import React, { useEffect, useState } from "react";
import { fetchNowPlayingTV } from "../api/tmdb-api";  
import TVShowCard from "../components/TVShowCard";  

const TVPage = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTVShows = async () => {
      const data = await fetchNowPlayingTV();  
      setTvShows(data);  
      setLoading(false);  
    };

    fetchTVShows();  
  }, []);

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <div>
      <h2>Currently Airing TV Shows</h2>
      <div className="tv-show-list">
        {tvShows.length > 0 ? (
          tvShows.map((show) => (
            <TVShowCard key={show.id} show={show} />  
          ))
        ) : (
          <p>No TV shows found.</p>  
        )}
      </div>
    </div>
  );
};

export default TVPage;
