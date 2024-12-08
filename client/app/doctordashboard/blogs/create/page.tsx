"use client";

import React, { useContext, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import toast from "react-hot-toast";
import API_BASE_URL from "@/utils/apiConfig";
import { UserContext } from "@/context/UserContext";

Quill.register("modules/imageUploader", ImageUploader);

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
  imageUploader: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);

        fetch(
          "https://api.imgbb.com/1/upload?key=055aee72cc2132ca184d425fba12b72a",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((result) => resolve(result.data.url))
          .catch(() => reject("Upload failed"));
      });
    },
  },
};

const CreateBlog = () => {
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const {user} = useContext(UserContext);

  const handleContentChange = (value) => setContent(value);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("No file selected!");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=055aee72cc2132ca184d425fba12b72a",
        { method: "POST", body: formData }
      );
      const result = await response.json();
      if (result.success) {
        setCoverImage(result.data.url);
        toast.success("Cover image uploaded successfully!");
      } else throw new Error(result.error.message);
    } catch (error) {
      toast.error("Failed to upload cover image. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage) return toast.error("Please upload a cover image!");

    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      content,
      coverImage,
      author: user._id,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/blogs`, formData);
      toast.success("Blog created successfully!");
    } catch (error) {
      toast.error("Error creating blog.");
    }
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "indent",
    "link",
    "image",
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 max-w-4xl max-h-screen mx-auto">
      <h1 className="text-2xl font-bold">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="cover-image"
          onChange={handleImageUpload}
        />
        <div className="flex items-center gap-4">
          <label
            htmlFor="cover-image"
            className="p-2 bg-secondary text-white rounded-md shadow-md cursor-pointer hover:bg-secondary-dark"
          >
            {coverImage ? "Change Cover Image" : "Add Cover Image"}
          </label>
          {coverImage && (
            <img
              src={coverImage}
              alt="Cover Preview"
              className="max-w-[300px] h-24 object-cover rounded-md border border-gray-300"
            />
          )}
        </div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 text-lg text-black rounded-md border border-gray-300 shadow-sm outline-none"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Short Description"
          className="w-full p-2 text-lg text-black rounded-md border border-gray-300 shadow-sm outline-none"
          required
        />
        <div className="w-full bg-white shadow-md h-[300px] text-black">
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            className="editor h-64"
            theme="snow"
            placeholder="Write your blog content here..."
            modules={modules}
            formats={formats}
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
