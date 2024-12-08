import express, { json } from 'express';
import cors from 'cors';

import { connection } from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/patientRoutes/index.js';
import doctorRouter from './routes/doctorRoutes/index.js';
import conversationRouter from './routes/conversationRoutes.js';
import videoCallRouter from './routes/videoCallRoutes.js';
import perscriptionRouter from './routes/perscriptionRoutes.js';
import ratingRouter from './routes/ratingRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import testsRouter from './routes/testsRoutes.js';
import testAppointmentRouter from './routes/testAppointmentRoutes.js';
import testReportRouter from './routes/testReportRoutes.js';
import feedBackRouter from './routes/feedBackRoutes.js';
import notificationRouter from './routes/notificationRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import patientStatsRouter from './routes/patientStatsRoutes.js';
import doctorStatsRouter from './routes/doctorStatsRoutes.js';
import verifyRouter from './controllers/verifyController.js';
import nurseStatsRouter from './routes/nurseStatsRoutes.js';
import blogRouter from './routes/blogRoutes.js';

dotenv.config();



const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(json());

connection();
app.use("/api/", router);
app.use('/api/doctors', doctorRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/videoCalls', videoCallRouter);
app.use('/api/prescriptions', perscriptionRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/tests', testsRouter);
app.use('/api/testappointments', testAppointmentRouter);
app.use('/api/testReports', testReportRouter);
app.use('/api/feedBack', feedBackRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/payments', paymentRouter);
//stats
app.use('/api/patientStats', patientStatsRouter);
app.use('/api/doctorStats', doctorStatsRouter);
app.use('/api/nurseStats', nurseStatsRouter);
app.use('/api/blogs/', blogRouter);

app.use('/api/verify', verifyRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
