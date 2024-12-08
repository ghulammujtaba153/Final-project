import Appointment from "../models/appointmentSchema.js";
import User from "../models/userSchema.js";
import Doctor from './../models/doctorSchema.js';
import moment from 'moment';


export const getPatients=async (req,res)=>{
    try{
        const patients=await User.find({role: "patient"});
        res.status(200).json(patients);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

export const homeStats=async (req,res)=>{
    try{
        const totalNurses = await User.countDocuments({ role: 'nurse' });

        const totalDoctors = await User.countDocuments({ role: 'doctor' });

        const totalPatients = await User.countDocuments({ role: 'patient' });

        const totalAppointments = await Appointment.countDocuments({ });


        // Send the counts as response
        res.status(200).json({
        totalNurses,
        totalDoctors,
        totalPatients,
        totalAppointments
        });
        
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


export const getUserGrowth = async (req, res) => {
    try {
      const userGrowthData = [];
  
      // Define the months
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  
      // Loop through each month and calculate the data
      for (let i = 0; i < months.length; i++) {
        // Get the start and end date for the current month
        const startDate = new Date(moment().month(i).startOf('month').toISOString());
        const endDate = new Date(moment().month(i).startOf('month').toISOString());
  
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);

  
        // Count users by role for the month
        const doctorsCount = await User.countDocuments({
          role: 'doctor',
          createdAt: { $gte: startDate, $lte: endDate },
        });
        console.log('Doctors Count:', doctorsCount);
  
        const patientsCount = await User.countDocuments({
          role: 'patient',
          createdAt: { $gte: startDate, $lte: endDate },
        });
  
        const labOperatorsCount = await User.countDocuments({
          role: 'nurse', // Assuming 'nurse' role is used for lab operators
          createdAt: { $gte: startDate, $lte: endDate },
        });
  
        // Push the data for the current month to the array
        userGrowthData.push({
          month: months[i],
          Doctors: doctorsCount,
          Patients: patientsCount,
          LabOperators: labOperatorsCount,
        });
      }
  
      // Return the user growth data as JSON
      res.status(200).json(userGrowthData);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error fetching user growth data', error });
    }
  };




  export const getSpecializationData = async(req, res) => {
    try {
        const data=await Doctor.aggregate([
            {
                $group: {
                    _id: "$specialization",
                    value: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error fetching specialization data', error });
    }
  }


export const getUserGenderDistribution = async(req, res) => {
    try {
        const data=await User.aggregate([
            {
                $group: {
                    _id: "$gender",
                    users: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data);
    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error fetching user gender distribution', error });
    }
};