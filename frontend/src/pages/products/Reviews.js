import React, { useState } from 'react';
import StarRating from './StarRating'; // Assume StarRating component is implemented separately

const AddReviewForm = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewImage, setReviewImage] = useState(null);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setReviewImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare review data to submit
    const reviewData = {
      productId,
      rating,
      reviewText,
      reviewImage
    };

    // Pass review data to parent component for submission
    onReviewSubmit(reviewData);

    // Reset form fields after submission
    setRating(0);
    setReviewText('');
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">Add a Review</h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Review Text</label>
          <textarea
            value={reviewText}
            onChange={handleReviewTextChange}
            className="mt-1 block w-full h-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Write your review..."
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image (Optional)</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReviewForm;
