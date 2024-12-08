import express from "express";
import { getNurseStats, getTestAppointments } from "../controllers/nurseStatsController.js";

const nurseStatsRouter = express.Router();

nurseStatsRouter.get("/", getNurseStats);

nurseStatsRouter.get("/test-appointments", getTestAppointments);



export default nurseStatsRouter;