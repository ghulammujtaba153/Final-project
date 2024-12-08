import { Schema, model } from 'mongoose';

const TestSchema = new Schema({
  testName: {
    type: String,
    required: true,
    trim: true
  },
  picture: {
    type: String, 
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Test = model('Test', TestSchema);
export default Test;
