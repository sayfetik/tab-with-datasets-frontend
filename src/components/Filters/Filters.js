import React, { useState } from 'react';
import {
  InputAdornment,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Filters = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <InputAdornment position="end">
            <IconButton
            aria-controls="filter-menu"
            aria-haspopup="true"
            onClick={handleClick}
            >
            <FilterListIcon />
            </IconButton>
        </InputAdornment>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Filter 1</MenuItem>
        <MenuItem onClick={handleClose}>Filter 2</MenuItem>
        <MenuItem onClick={handleClose}>Filter 3</MenuItem>
      </Menu>
    </div>
  );
};

export default Filters;
