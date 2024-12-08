import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  doctorId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  patientId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  timing: { 
    type: String, 
    required: true 
  },
  status: {
    type: String,
    enum: ['new', 'completed', 'canceled'],
    default: 'new'
  }
}, {
  timestamps: true
});

const Appointment = model('Appointment', appointmentSchema);

export default Appointment;
