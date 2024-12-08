import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({
  doctorId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: false 
  },
  testId: {
    type: Schema.Types.ObjectId,
    ref: 'Test', 
    required: false
  },
  patientId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  amount: { 
    type: Number, 
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

const Payment = model('Payment', paymentSchema);

export default Payment;