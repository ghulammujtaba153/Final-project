import { Router } from "express";
import { totalEarningOfDoctor } from "../controllers/doctorStatsController.js";

const doctorStatsRouter = Router();

doctorStatsRouter.get("/totalEarning/:doctorId", totalEarningOfDoctor);

export default doctorStatsRouter;