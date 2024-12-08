import TestAppointment from "../models/TestAppointmentSchema.js";
import Appointment from "../models/appointmentSchema.js";


export const getAppointments = async (req, res) => {
  const { patientId } = req.params;

  try {
    const totalApointments=await Appointment.find({patientId});


    res.status(200).json(totalApointments);
  } catch (error) {
    console.error('Error retrieving patient stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTestAppointments = async (req, res) => {
  const {patientId} = req.params;
  console.log(patientId);
  try {
    const totalApointments = await TestAppointment.find({ patientId });
    res.status(200).json(totalApointments);
  } catch (error) {
    console.error('Error retrieving patient stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}