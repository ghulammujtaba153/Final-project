import Blog from "../models/blogSchema.js";
import { mongoose } from 'mongoose';


// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { coverImage, title, description, content, author } = req.body;


    const blog = new Blog({
      title,
      description,
      content,
      coverImage,
      author, 
    });

    await blog.save();
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the blog.' });
  }
};


export const getAllBlogs = async (req, res) => {
  try {
    // Fetch blogs and populate the author's information
    const blogs = await Blog.find().populate('author', 'firstName lastName profile');
    console.log(blogs);
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'An error occurred while retrieving blogs.' });
  }
};


export const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch blogs and populate the author's information
    const blog = await Blog.findById(id).populate('author', 'firstName lastName profile');
    console.log(blog);
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'An error occurred while retrieving blogs.' });
  }
};
