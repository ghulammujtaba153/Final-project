import express from 'express';
import { createNotification, getNotificationsById, markNotificationsAsRead } from '../controllers/notificationController.js';

const notificationRouter = express.Router();

notificationRouter.post('/', createNotification);
notificationRouter.get('/:userId', getNotificationsById);
notificationRouter.post('/mark-read', markNotificationsAsRead);

export default notificationRouter;