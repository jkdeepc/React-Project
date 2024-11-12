import React from "react";
import { IconButton } from "@mui/material"; // 使用 Material-UI 的 IconButton
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"; // 导入图标

const AddToWatchlistIcon = ({ movie, onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label={`Add ${movie.title} to watchlist`}>
      <PlaylistAddIcon />
    </IconButton>
  );
};

export default AddToWatchlistIcon;
