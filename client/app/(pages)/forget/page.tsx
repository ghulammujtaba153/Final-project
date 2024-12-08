"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import API_BASE_URL from "@/utils/apiConfig";
import toast from "react-hot-toast";

const Page = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger a loading toast while waiting for the response
    const toastId = toast.loading("Submitting your request...");

    try {
      const res = await axios.post(`${API_BASE_URL}/verify/forgot-password`, { email });

      // If the request is successful, show success toast
      toast.success("Password reset email sent!", {
        id: toastId, // update the loading toast
      });
    } catch (err) {
      // Update toast based on different error scenarios
      if (err.response && err.response.status === 404) {
        // Email not found in the database
        toast.error("Email not found. Please try again.", {
          id: toastId,
        });
      } else {
        // Other errors (e.g., network issues or server error)
        toast.error("An error occurred. Please try again later.", {
          id: toastId,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary py-[140px]">
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
        className="max-w-md w-full mx-auto bg-white rounded-lg p-8 shadow-lg border border-gray-200"
      >
        <h2 className="font-bold text-xl text-neutral-800 text-center mb-6">
          Welcome to Cardio Hema Hub
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="border border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:secondary outline-none"
          />

          <button
            type="submit"
            className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Page;
