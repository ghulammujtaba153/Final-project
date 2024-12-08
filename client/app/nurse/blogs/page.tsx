"use client";

import API_BASE_URL from "@/utils/apiConfig";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogList from "@/components/dashboard/blogsList";


const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blogs`);
        setBlogs(response.data);
        setFilteredBlogs(response.data); // Initialize with all blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter blogs by title
    const filtered = blogs.filter((blog) =>
      blog?.title?.toLowerCase().includes(query)
    );
    setFilteredBlogs(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 p-4">
      <h1 className="text-2xl font-bold">Blogs</h1>
      <div className="flex items-center justify-between w-full max-w-4xl gap-4">
        <input
          className="w-full md:w-1/2 text-lg p-2 outline-none rounded-md text-black shadow-md"
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleSearch}
        />
        
      </div>

      {/* Blog list */}
      <BlogList blogs={filteredBlogs} />
    </div>
  );
};

export default BlogPage;
