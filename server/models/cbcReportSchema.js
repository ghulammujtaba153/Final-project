import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const CBCReportSchema = new Schema({
  testId: {
    type: Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  gender: {
    type: Number, // 0 for Male, 1 for Female
    required: true,
  },
  hemoglobin: {
    type: Number,
    required: true,
  },
  MCH: {
    type: Number,
    required: true,
  },
  MCHC: {
    type: Number,
    required: true,
  },
  MCV: {
    type: Number,
    required: true,
  },
  result: {},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CBCReport= model('CBCReport', CBCReportSchema);

export default CBCReport;

