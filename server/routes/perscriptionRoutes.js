import { Router } from 'express';
import { createPrescription, getPrescriptionsByAppointmentId, getPrescriptionsByDoctorId, getPrescriptionsByPatientId } from '../controllers/perscriptionControllers.js';


const perscriptionRouter = Router();

// POST /api/prescriptions
perscriptionRouter.post('/', createPrescription);

perscriptionRouter.get('/:appointmentId', getPrescriptionsByAppointmentId);

perscriptionRouter.get('/patient/:patientId', getPrescriptionsByPatientId);

// GET /api/prescriptions/doctor/:doctorId
perscriptionRouter.get('/doctor/:doctorId', getPrescriptionsByDoctorId);

export default perscriptionRouter;
