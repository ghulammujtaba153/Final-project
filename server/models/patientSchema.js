import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

// Define the Patient Schema
const patientSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  guardianName: {
    type: String
  },
  emergencyContactNumber: {
    type: String
  },
  medicalRecordId: {
    type: Schema.Types.ObjectId,
    ref: 'MedicalRecord'
  },
  currentSymptoms: [{
    type: String
  }],
  currentDiseases: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Patient Model
const Patient = model('Patient', patientSchema);

export default Patient;
