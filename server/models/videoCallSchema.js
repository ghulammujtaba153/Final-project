import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const VideoCallSchema = new Schema({
  startedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  participants: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  ],
  link: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['active', 'completed', 'cancelled'], 
    default: 'active'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const VideoCall = model('VideoCall', VideoCallSchema);

export default VideoCall;
