import React from "react";
import { IconButton } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToWatchlistIcon = ({ movie, onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label={`Add ${movie.title} to watchlist`}>
      <PlaylistAddIcon />
    </IconButton>
  );
};

export default AddToWatchlistIcon;
