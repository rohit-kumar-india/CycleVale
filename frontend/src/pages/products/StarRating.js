import React from 'react';

const StarRating = ({ rating, onRatingChange }) => {
  const handleStarClick = (selectedRating) => {
    onRatingChange(selectedRating);
  };

  const renderStar = (index) => {
    const filled = index < rating ? 'text-yellow-500' : 'text-gray-300';
    return (
      <svg
        key={index}
        onClick={() => handleStarClick(index + 1)}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 cursor-pointer ${filled}  fill-current`}
        viewBox="0 0 24 24"
      >
        <path d="M12 2l2.45 7.55h7.63l-6.17 4.73 2.33 7.48-6.24-4.77-6.24 4.77 2.33-7.48-6.17-4.73h7.63z"  />
      </svg>
    );
  };

  return (
    <div className="flex items-center ">
      {[...Array(5)].map((_, index) => renderStar(index))}
    </div>
  );
};

export default StarRating;
