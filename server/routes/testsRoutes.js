import { Router } from 'express';
import { createTest, deleteTest, getAllTests, updateTest } from '../controllers/testsControllers.js';


const testsRouter = Router();

testsRouter.post('/create', createTest);


testsRouter.get('/all', getAllTests);

testsRouter.put('/update', updateTest);

testsRouter.delete('/:id', deleteTest);

export default testsRouter;
