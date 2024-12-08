"use client"

import React, { useState } from 'react';
import axios from 'axios';

const BotPage = () => {
  const [question, setQuestion] = useState(''); // To store the input question
  const [response, setResponse] = useState(''); // To store the response from the API
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  // Function to handle form submission and send API request
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Start loading
    setError(null); // Reset errors
    setResponse(''); // Reset previous response

    try {
      // Make API request to the bot
      const res = await axios.post(`http://127.0.0.1:8000/chat`, null, {
        params: { question }, // Send question as a query param
      });
      setResponse(res.data.response); // Set the response from the API
    } catch (err) {
      setError('Error fetching the response from the server.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-3xl font-bold mb-6 text-white">Chat Bot</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            className="p-3 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </form>

      {loading && (
        <div className="mt-6 w-full max-w-md">
          {/* Loading Bar */}
          <div className="w-full bg-gray-300 rounded-md">
            <div className="h-4 bg-blue-500 rounded-md loading-bar animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Show error message if error exists */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Show response if it's available */}
      {response && (
        <div className="mt-6 w-full max-w-md bg-white p-4 rounded-md shadow-md">
          <h3 className="font-bold">Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default BotPage;
