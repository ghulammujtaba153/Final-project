// controllers/conversationController.js

import Conversation from "../../models/conversationSchema.js";
import User from "../../models/userSchema.js";


// Create a new conversation
export const createConversation = async (req, res) => {
  try {
    const { participants, appointmentId } = req.body; // Include appointmentId in destructuring
    console.log(req.body);

    if (!participants || participants.length < 2) {
      return res.status(400).json({ message: 'At least two participants are required' });
    }

    const conversation = new Conversation({
      participants,
      appointmentId
    });

    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get all conversations for a user
export const getUserConversations = async (req, res) => {
  try {
    const userId = req.params.userId;

    const conversations = await Conversation.find({
      participants: userId
    }).populate('participants');

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Error retrieving conversations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const getConversationById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const conversation = await Conversation.findById(id)
      .populate('participants', 'firstName lastName profile role')
      .populate('appointmentId');

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error('Error retrieving conversation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const sendMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { sender, content } = req.body;

  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    const newMessage = {
      sender,
      content,
      createdAt: new Date()
    };

    conversation.messages.push(newMessage);
    await conversation.save();


    res.status(200).json({
      message: 'Message sent successfully',
      conversation
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const existingRoomOfBothParticipants = async (req, res) => {
  let { participantIdArray } = req.query;

  console.log(participantIdArray);

  try {
    // Ensure the array exists and contains valid MongoDB
    if (!Array.isArray(participantIdArray) || participantIdArray.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: 'Invalid participant IDs' });
    }

    const conversation = await Conversation.find({
      participants: {
        $all: participantIdArray,
        $size: participantIdArray.length
      }
    }).populate('participants');

    if (!conversation.length) {
      return res.status(404).json({ message: 'No conversation found' });
    }
    res.status(200).json(conversation);
  } catch (error) {
    console.error('Error retrieving conversations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

