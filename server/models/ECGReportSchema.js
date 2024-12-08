import mongoose, { Schema, model, mongo } from 'mongoose';


const ECGReportSchema = new Schema({
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true,
    },
    ecg:{
        type: String,
        required: true,
    },
    prediction: {
        type: String,
        required: true,
    },
    upLoadedAt: {
        type: Date,
        default: Date.now, 
        required: true,
    },
});

const ECGTestReport = model('ECGTestReport', ECGReportSchema);

export default ECGTestReport;