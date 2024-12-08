import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const PrescriptionSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model where patients are stored
    required: true,
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a Doctor model
    required: true,
  },
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment', // Assuming you have an Appointment model
    required: true,
  },
  medications: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      frequency: { type: String, required: true }, // e.g., "Once a day", "Twice a day"
      duration: { type: String, required: true }, // e.g., "7 days", "2 weeks"
      instructions: { type: String, required: false }, // Additional instructions for the medication
    }
  ],
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Cancelled'],
    default: 'Active',
  },
  nextReviewDate: {
    type: Date,
    required: false,
  }
}, {
  timestamps: true,
});

const Prescription = model('Prescription', PrescriptionSchema);

export default Prescription;
