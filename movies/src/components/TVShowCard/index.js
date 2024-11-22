import React from "react";
import { Link } from "react-router-dom";  

const TVShowCard = ({ show }) => {
  return (
    <div className="tv-show-card">
      <h3>{show.name}</h3>
      <img
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
        width={200}
      />
      <p>{show.overview}</p>
      <Link to={`/tv/${show.id}`}>See details</Link>  
    </div>
  );
};

export default TVShowCard;
