// models/Message.js
import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Message = model('Message', messageSchema);

export default Message;
