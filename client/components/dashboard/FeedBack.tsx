"use client";

import React, { useContext, useState } from 'react';
import { Rating } from '@mui/material';
import { UserContext } from '@/context/UserContext';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const FeedBack: React.FC = () => {
  const [rating, setRating] = useState<number | null>(0);
  const [liked, setLiked] = useState<string>('');
  const [disliked, setDisliked] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');
  const { user } = useContext(UserContext);

  const handleSubmit = async () => {
    const feedbackData = {
      userId: user._id,
      role: user.role,
      rating,
      liked,
      disliked,
      suggestion,
    };

    toast.promise(
      axios.post(`${API_BASE_URL}/feedBack/create`, feedbackData),
      {
        loading: 'Submitting feedback...',
        success: 'Feedback submitted successfully!',
        error: 'Failed to submit feedback. Please try again.',
      }
    );
    setRating(null);
    setLiked('');
    setDisliked('');
    setSuggestion('');
  };

  return (
    <div className="min-w-[600px] mx-auto p-6 bg-white text-primary shadow-md rounded-lg">
      
      {/* Rating Section */}
      <div className="mb-4 flex items-center gap-4">
        <p className="font-medium  mb-2">Give Stars</p>
        <Rating
          name="appointment-rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          precision={0.5}
          size="large"
        />
      </div>

      {/* What You Liked Section */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-4">
        <label htmlFor="liked" className="font-medium  md:w-1/4">
          What you liked
        </label>
        <input
          type="text"
          id="liked"
          value={liked}
          onChange={(e) => setLiked(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="What did you like?"
        />
      </div>

      {/* What You Disliked Section */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-4">
        <label htmlFor="disliked" className="font-medium md:w-1/4">
          What you disliked
        </label>
        <input
          type="text"
          id="disliked"
          value={disliked}
          onChange={(e) => setDisliked(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="What did you dislike?"
        />
      </div>

      {/* Suggestion Section */}
      <div className="mb-4 flex flex-col md:flex-row md:items-start gap-4">
        <label htmlFor="suggestion" className="font-medium md:w-1/4">
          Any suggestion?
        </label>
        <textarea
          id="suggestion"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Any suggestions?"
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-secondary py-2 px-4 rounded-md shadow hover:bg-orange-400 focus:outline-none "
      >
        Submit
      </button>
    </div>
  );
};

export default FeedBack;
