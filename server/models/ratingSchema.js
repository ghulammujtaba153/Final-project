import mongoose from 'mongoose';
const { Schema } = mongoose;

const RatingSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor', // Assuming you have a Doctor model
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model where patients are stored
    required: true,
  },
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment', // Assuming you have an Appointment model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Minimum rating value (e.g., 1 star)
    max: 5, // Maximum rating value (e.g., 5 stars)
  },
  comment: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

// Optionally, create an index to ensure a user can only rate a doctor once per appointment
RatingSchema.index({ doctorId: 1, patientId: 1, appointmentId: 1 }, { unique: true });

const Rating = mongoose.model('Rating', RatingSchema);

export default Rating;
