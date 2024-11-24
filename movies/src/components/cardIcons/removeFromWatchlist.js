import React from "react";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";

const RemoveFromWatchlistIcon = ({ movie, onClick }) => {
  return (
    <IconButton
      aria-label={`remove ${movie.title} from watchlist`}
      onClick={onClick}
      color="error"
    >
      <RemoveIcon />
    </IconButton>
  );
};

export default RemoveFromWatchlistIcon;
