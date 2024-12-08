import { Router } from 'express';
import { changeStatus, createTestAppointment, getAllTestAppointments, getTestAppointmentById, getTestAppointmentByTestId, getUpcomingTestAppointments } from '../controllers/testAppointmentControllers.js';


const testAppointmentRouter = Router();

testAppointmentRouter.post('/create', createTestAppointment);

testAppointmentRouter.get('/all', getAllTestAppointments);

testAppointmentRouter.get('/:id', getTestAppointmentById);

//testid
testAppointmentRouter.get('/test/:id', getTestAppointmentByTestId);

testAppointmentRouter.put('/:id', changeStatus);

testAppointmentRouter.get('/upcoming/:patientId', getUpcomingTestAppointments);


export default testAppointmentRouter;