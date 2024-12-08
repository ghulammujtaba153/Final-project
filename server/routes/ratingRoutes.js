import express from 'express';
import { addRating, getRatingsByAppointmentId, getRatingsByDoctorId } from '../controllers/ratingController.js';


const ratingRouter = express.Router();

// POST /api/ratings
ratingRouter.post('/create', addRating);

ratingRouter.get('/appointment/:appointmentId', getRatingsByAppointmentId);

ratingRouter.get('/doctor/:doctorId', getRatingsByDoctorId);

export default ratingRouter;
