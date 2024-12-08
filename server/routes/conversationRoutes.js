// routes/conversationRoutes.js
import express from 'express';
import { createConversation, existingRoomOfBothParticipants, getConversationById, getUserConversations, sendMessage } from '../controllers/conversationController/conversationController.js';
import Conversation from '../models/conversationSchema.js';


const conversationRouter = express.Router();

// Create a new conversation
conversationRouter.post('/create', createConversation);


conversationRouter.get('/doctor/:doctorId/patient/:patientId', async (req, res) => {
  const { doctorId, patientId } = req.params;

  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [doctorId, patientId] }
    });

    // If conversation is found, return it
    return res.status(200).json(conversation);

  } catch (error) {
    // Catch any internal server error and return 500
    console.error('Error checking conversation:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Get all conversations for a user
conversationRouter.get('/user/:userId', getUserConversations);

// Get conversation by ID
conversationRouter.get('/:id', getConversationById);

conversationRouter.post('/:conversationId/messages', sendMessage);

conversationRouter.get('/existingRoomOfBothParticipants', existingRoomOfBothParticipants);

export default conversationRouter;
