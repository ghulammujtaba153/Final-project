import express from "express";
import { createBlog, getAllBlogs, getBlog } from "../controllers/blogControllers.js";

const blogRouter = express.Router();

blogRouter.post("/", createBlog);

blogRouter.get("/", getAllBlogs);

blogRouter.get("/:id", getBlog);

export default blogRouter;