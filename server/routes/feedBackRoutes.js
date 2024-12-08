import exporess from "express";
import { createFeedBack, getFeedBack, getFeedBackById } from "../controllers/feedbackController.js";

const feedBackRouter = exporess.Router();

feedBackRouter.post("/create", createFeedBack);
feedBackRouter.get("/", getFeedBack);
feedBackRouter.get("/:id", getFeedBackById);

export default feedBackRouter;