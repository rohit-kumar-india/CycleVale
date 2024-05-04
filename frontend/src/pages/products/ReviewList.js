import React from 'react';
import StarRating from './StarRating'; // Assume StarRating component is implemented separately
import { UserIcon, UserCircleIcon } from '@heroicons/react/outline';

const ReviewList = ({ reviews }) => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-xl font-medium mb-4">Product Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-600 px-4">No reviews available.</p>
      ) : (
        <div className="grid gap-4 px-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4 flex items-start">
              {/* Product Photo (if available) */}
              {review.productImage && (
                <img src={review.productImage} alt="Product" className="h-20 w-20 object-contain mr-4" />
              )}


              <div className="flex-3">
                <div className='flex'>
                  <UserCircleIcon className='w-5 h-5 mt-1' />
                  <h2 className='text-lg font-bold ml-2'>
                    {review.name}
                  </h2>
                </div>
                {/* Product Description */}
                <div className="mb-2">
                  <StarRating rating={review.rating} />
                </div>
                <p className="">{review.comment}</p>
                {/* Star Rating */}

                {/* Review Text */}
                <p className="text-gray-600">{review.reviewText}</p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
