import express from 'express';
import { createPayment, createTestPayment, getAllPayments, getPaymentsByDoctor, getPaymentsByPatient } from '../controllers/paymentControllers.js';

const paymentRouter = express.Router();

paymentRouter.post('/create', createPayment);
paymentRouter.post('/test/create', createTestPayment);
paymentRouter.get('/patient/:patientId', getPaymentsByPatient);

paymentRouter.get('/doctor/:doctorId', getPaymentsByDoctor);
paymentRouter.get('/', getAllPayments);

export default paymentRouter;