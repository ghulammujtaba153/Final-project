import express from "express";
import { getPatients, getSpecializationData, getUserGenderDistribution, getUserGrowth, homeStats } from "../controllers/adminControllers.js";


const adminRouter = express.Router();

adminRouter.get("/patients", getPatients);

//total users, doctors, patients, appointments
adminRouter.get("/stats", homeStats);

adminRouter.get("/user-growth", getUserGrowth);

adminRouter.get("/specialization-data", getSpecializationData);

adminRouter.get("/gender-distribution", getUserGenderDistribution);

export default adminRouter;