
import express from 'express';
import { createCBCReport, createECGReport, getCBCReportById, getECGReportById, getGenderWiseData, getTotalTestReports } from '../controllers/testReportsController.js';


const testReportRouter = express.Router();

testReportRouter.post('/ecg/create', createECGReport);
testReportRouter.get('/test/:id', getECGReportById);

// cbc report routes
testReportRouter.post('/cbc/create', createCBCReport);
testReportRouter.get('/cbc/test/:id', getCBCReportById);

// nurse routes
testReportRouter.get('/total', getTotalTestReports);
testReportRouter.get('/gender', getGenderWiseData);

export default testReportRouter;