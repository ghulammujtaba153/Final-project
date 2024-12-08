import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

// Define the Doctor Schema
const doctorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true 
  },
  specialization: {
    type: String,
    required: true
  },
  doctor_qualification: [],
  experience: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  availability: {
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },

}, {
  timestamps: true 
});

// Create the Doctor Model
const Doctor = model('Doctor', doctorSchema);

export default Doctor;
