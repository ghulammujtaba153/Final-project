
import Appointment from '../../models/appointmentSchema.js';
import User from '../../models/userSchema.js';
import Doctor from './../../models/doctorSchema.js';

export const bookAppointment = async (req, res) => {
  const { doctorId, patientId, timing, reviews, prescription, diseases, dietPlan } = req.body;

  try {
    // Validate that the doctor and patient exist
    const doctor = await User.findById(doctorId);
    const patient = await User.findById(patientId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      timing,
      reviews,
      prescription,
      diseases,
      dietPlan
    });

    // Save the appointment to the database
    const savedAppointment = await newAppointment.save();

    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    console.log(id);
    console.log(status);
  
    try {
      // Validate status value
      if (!['new', 'completed', 'canceled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
  
      // Update the appointment status
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true } // Return the updated document
      );
  
      if (!updatedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      res.status(200).json(updatedAppointment);
    } catch (error) {
      console.error('Error updating appointment status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



  export const getUpcomingAppointments = async (req, res) => {
    const { patientId } = req.params;
  
    try {
      const currentDate = new Date().toISOString();
      console.log(currentDate);
  
      const appointments = await Appointment.find({
        patientId,
        status: 'new',
        timing: { $gt: currentDate },
      }).populate('doctorId').sort({ timing: 1 });
      console.log(appointments);
  
      if (appointments.length === 0) {
        return res.status(404).json({ message: 'No upcoming appointments found' });
      }
  
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error retrieving upcoming appointments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


  export const getDoctorUpcomingAppointments = async (req, res) => {
    const { doctorId } = req.params;
  
    try {
      const currentDate = new Date().toISOString();
      console.log(currentDate);
  
      const appointments = await Appointment.find({
        doctorId: doctorId,
        status: 'new',
        timing: { $gt: currentDate },
      }).populate('patientId').sort({ timing: 1 });
      console.log(appointments);
  
      if (appointments.length === 0) {
        return res.status(404).json({ message: 'No upcoming appointments found' });
      }
  
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error retrieving upcoming appointments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  export const getAllAppointmentforPatients = async (req, res) => {
    const { patientId } = req.params;
  
    try {
      const now = new Date();
  
      // Find appointments and populate the doctor details
      const appointments = await Appointment.find({ patientId })
      .populate('doctorId')
      .exec();
  
        console.log(appointments);
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error retrieving upcoming appointments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  export const getAllAppointmentforDoctor = async (req, res) => {
    const { DoctorId } = req.params;
  
    try {
      const now = new Date();
  
      const appointments = await Appointment.find({
        DoctorId
      })
        .populate({
          path: 'patientId'
        });
  
      if (!appointments.length) {
        return res.status(404).json({ message: 'No upcoming appointments found' });
      }
  
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error retrieving upcoming appointments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

export const getAllApointment=async(req,res)=>{
  try{
    const appointment=await Appointment.find().populate('doctorId').populate('patientId');
    res.status(200).json(appointment);
  }catch(error){
    res.status(500).json({message:"Internal server error"});
  }
}



export const getPatientGenderCountByDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    // Fetch appointments for the given doctorId and populate patientId to access gender
    const appointments = await Appointment.find({ doctorId })
      .populate({
        path: "patientId",
        select: "gender", // Only populate the gender field
      })
      .exec();

    // Initialize counters
    let maleCount = 0;
    let femaleCount = 0;

    // Count male and female patients
    appointments.forEach((appointment) => {
      if (appointment.patientId?.gender === "male") {
        maleCount++;
      } else if (appointment.patientId?.gender === "female") {
        femaleCount++;
      }
    });
    console.log("gender",maleCount, femaleCount);

    // Send the response
    res.status(200).json({
      male: maleCount,
      female: femaleCount,
    });
  } catch (error) {
    console.error("Error fetching patient gender count:", error);
    res.status(500).json({
      message: "An error occurred while fetching patient gender count",
    });
  }
};