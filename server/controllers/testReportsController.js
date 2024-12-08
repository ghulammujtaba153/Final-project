import ECGTestReport from "../models/ECGReportSchema.js";
import TestAppointment from "../models/TestAppointmentSchema.js";
import CBCReport from "../models/cbcReportSchema.js";



export const createECGReport = async (req, res) => {
    console.log(req.body);
    
    try {
        const { testId, prediction, ecg } = req.body;
        

        const newReport = new ECGTestReport({
            testId,
            prediction,
            ecg,
        });

        await newReport.save();

        res.status(201).json({ message: 'ECG Report created successfully', report: newReport });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create ECG Report', error });
    }
};

export const getECGReportById = async (req, res) => {
    try {
        const report = await ECGTestReport.find({testId: req.params.id});

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving report' });
    }
};


export const createCBCReport= async (req, res) => {
    console.log(req.body);
    
    try {
        const { testId, gender, hemoglobin, MCH, MCHC, MCV, result } = req.body;
        
        const newReport = new CBCReport({
            testId,
            gender,
            hemoglobin,
            MCH,
            MCHC,
            MCV,
            result,
        });
        
        await newReport.save();
        
        res.status(201).json({ message: 'CBC Report created successfully', report: newReport });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create CBC Report', error });
    }
};

export const getCBCReportById = async (req, res) => {
    try {
        const report = await CBCReport.find({testId: req.params.id});
        
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving report' });
    }
};


export const getTotalTestReports = async (req, res) => {
    try {
        const ecgReports = await ECGTestReport.countDocuments();
        const cbcReports = await CBCReport.countDocuments();

        res.status(200).json({ ecgReports, cbcReports });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reports' });
    }
};




export const getGenderWiseData = async (req, res) => {
  try {
    // Fetch all test appointments with populated patientId to get gender
    const appointments = await TestAppointment.find().populate({
      path: "patientId",
      select: "gender", // Only retrieve the gender field
    });

    // Initialize counters
    let maleAppointments = 0;
    let femaleAppointments = 0;
    let malePopulation = new Set();
    let femalePopulation = new Set();

    // Process appointments
    appointments.forEach((appointment) => {
      const gender = appointment.patientId?.gender;

      if (gender === "Male") {
        maleAppointments++;
        malePopulation.add(appointment.patientId._id.toString());
      } else if (gender === "Female") {
        femaleAppointments++;
        femalePopulation.add(appointment.patientId._id.toString());
      }
    });

    // Send the response
    res.status(200).json({
      male: malePopulation.size, 
      female: femalePopulation.size 
    });
  } catch (error) {
    console.error("Error fetching gender-wise data:", error);
    res.status(500).json({ message: "Error fetching data", error });
  }
};


