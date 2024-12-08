import React from "react";
import Link from "next/link";
import moment from "moment";

const BlogList = ({ blogs }) => {
  if (blogs.length === 0) {
    return <p className="text-gray-500">No blogs available.</p>;
  }

  return (
    <>
      {/* First four blogs layout */}
      <div className="flex flex-wrap w-full max-w-4xl gap-4">
        {blogs.slice(0, 4).length > 0 && (
          <div className="flex flex-wrap md:flex-nowrap w-full gap-4">
            {/* First blog */}
            {blogs[0] && (
              <div className="flex flex-col w-full md:w-1/2 bg-white shadow-md rounded-lg p-2">
                <img
                  src={blogs[0].coverImage || "/placeholder-image.png"}
                  alt={blogs[0].title}
                  className="w-full h-[300px] object-cover rounded-md mb-4"
                />
                <Link href={`/doctordashboard/blogs/${blogs[0]._id}`}>
                  <h2 className="text-xl text-black font-semibold hover:cursor-pointer hover:underline">
                    {blogs[0].title}
                  </h2>
                </Link>
                <p className="text-gray-500">
                  Written by:{" "}
                  <span className="font-medium">
                    {blogs[0].author?.firstName +
                      " " +
                      blogs[0].author?.lastName || "Unknown"}
                  </span>{" "}
                  <span>{moment(blogs[0].createdAt).fromNow()}</span>
                </p>
              </div>
            )}

            {/* Next three blogs */}
            <div className="flex flex-col justify-between w-full md:w-1/2 gap-4">
              {blogs.slice(1, 4).map((blog) => (
                <div
                  key={blog._id}
                  className="flex w-full h-[125px] shadow-md rounded-lg bg-white"
                >
                  <div className="w-1/3">
                    <img
                      src={blog.coverImage || "/placeholder-image.png"}
                      alt={blog.title}
                      className="w-full h-full object-cover rounded-l-md"
                    />
                  </div>
                  <div className="flex flex-col justify-between w-2/3 p-4">
                    <Link href={`/doctordashboard/blogs/${blog._id}`}>
                      <h3 className="text-lg text-black font-semibold hover:cursor-pointer hover:underline truncate">
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500">
                      Written by:{" "}
                      <span className="font-medium">
                        {blog.author?.firstName +
                          " " +
                          blog.author?.lastName || "Unknown"}
                      </span>{" "}
                      <span>{moment(blog.createdAt).fromNow()}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Remaining blogs in original layout */}
      <div className="flex flex-col w-full max-w-4xl gap-4">
        {blogs.slice(4).map((blog) => (
          <div
            key={blog._id}
            className="flex w-full gap-2 shadow-md rounded-lg bg-white"
          >
            <div className="max-h-[200px] max-w-[200px]">
              <img
                src={blog.coverImage || "/placeholder-image.png"}
                alt={blog.title}
                className="w-full h-full object-cover rounded-l-md"
              />
            </div>
            <div className="flex flex-col p-4 gap-4">
              <Link href={`/doctordashboard/blogs/${blog._id}`}>
                <h2 className="text-lg text-black font-semibold hover:cursor-pointer hover:underline truncate">
                  {blog.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-500">
                Written by:{" "}
                <span className="font-medium">
                  {blog.author?.firstName + " " + blog.author?.lastName ||
                    "Unknown"}
                </span>{" "}
                <span>{moment(blog.createdAt).fromNow()}</span>
              </p>
              <p className="text-gray-700 truncate-multiline">
                {blog.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogList;
