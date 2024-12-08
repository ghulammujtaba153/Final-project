import express from 'express';
import { createVideoCall, getActiveVideoCallsForUser, getVideoCallOnLink, updateVideoCallStatus } from '../controllers/videoCallControllers.js';


const videoCallRouter = express.Router();


videoCallRouter.post("/create", createVideoCall);

videoCallRouter.put("/:id/status", updateVideoCallStatus)
videoCallRouter.get("/user/:userId/active", getActiveVideoCallsForUser)

videoCallRouter.get("/:link", getVideoCallOnLink)



export default videoCallRouter;
