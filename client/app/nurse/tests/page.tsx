"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import upload from '@/utils/upload';
import API_BASE_URL from '@/utils/apiConfig';

const TestPage = () => {
  const [testName, setTestName] = useState('');
  const [picture, setPicture] = useState(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handlePictureChange = async (e) => {
    try {
      const res = await upload(e.target.files[0]);
      setPicture(res);
      toast.success('Picture uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload picture.');
    }
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (!testName || !picture || !price || !description) {
      toast.error('Please fill in all fields.');
      return;
    }

    const formData = {
      testName,
      picture,
      price,
      description,
    };
    console.log(formData)

    try {
      const res = await axios.post(`${API_BASE_URL}/tests/create`, formData);
      console.log(res.data)
      toast.success('Test added successfully!');
      // Clear the form fields after successful submission
      setTestName('');
      setPicture(null);
      setPrice('');
      setDescription('');
    } catch (error) {
      toast.error('Failed to add test. Please try again.');
    }
  };

  return (
    <div className="container mx-auto max-w-[500px] bg-white text-primary rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Test</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="testName">
            Test Name
          </label>
          <input
            type="text"
            id="testName"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter test name"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="picture">
            Picture
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="picture"
              className="flex flex-col items-center justify-center w-full h-[100px] border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              {picture ? (
                <p className="text-sm text-gray-500">Selected File: {picture.name}</p>
              ) : (
                <>
                  <svg
                    className="w-12 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16V4a2 2 0 012-2h6a2 2 0 012 2v12m-7 4h8a2 2 0 002-2v-5a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2v5a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="mt-2 text-sm text-gray-500">Click to upload</span>
                </>
              )}
              <input
                type="file"
                id="picture"
                onChange={handlePictureChange}
                className="hidden"
                required
              />
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter price"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
            rows="4"
            required
          />
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="bg-secondary hover:bg-orange-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Add Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestPage;
