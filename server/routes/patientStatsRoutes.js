import express from "express";
import { getAppointments, getTestAppointments } from "../controllers/patientStatsController.js";


const patientStatsRouter = express.Router();

patientStatsRouter.get("/appointments/:patientId", getAppointments);

patientStatsRouter.get("/testAppointments/:patientId", getTestAppointments);

export default patientStatsRouter;