// components/StarRating.js
import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const StarRating = ({ num }) => {
  console.log(num)
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="read-only"
        value={num}
        precision={0.5} // Allows for half-star ratings if needed
        readOnly
      />
      <Box sx={{ ml: 2 }}>{num}</Box> {/* Display the numeric value next to the stars */}
    </Box>
  );
};

export default StarRating;
