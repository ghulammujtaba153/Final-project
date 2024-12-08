import { Schema, model } from 'mongoose';


const conversationSchema = new Schema({
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [{
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    isRead: {type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
  }],
  appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Conversation = model('Conversation', conversationSchema);

export default Conversation;
