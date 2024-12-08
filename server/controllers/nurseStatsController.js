import TestAppointment from "../models/TestAppointmentSchema.js";
import Payment from "../models/paymentSchema.js";
import mongoose from "mongoose";

export const getNurseStats = async (req, res) => {
    try {
        const upcommingAppointments = await TestAppointment.find({ status: "scheduled" });
        console.log(upcommingAppointments.length)
        const totalAppointments = await TestAppointment.countDocuments();

        const earnings = await Payment.aggregate([
            {
                $match: {
                    testId: { $exists: true, $ne: null } // Only include documents where testId exists
                }
            },
            {
                $group: {
                    _id: null, // Group all documents together (no grouping by testId)
                    totalEarnings: { $sum: "$amount" } // Sum the amount field
                }
            }
        ]);

        // Check if the aggregation returned any results
        const totalEarnings = earnings.length > 0 ? earnings[0].totalEarnings : 0;
        console.log(totalEarnings)

        res.status(200).json({
            upcommingAppointments: upcommingAppointments.length,
            totalAppointments,
            earnings: totalEarnings, 
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const getTestAppointments = async (req, res) => {
    try {

        const appointmentData = await TestAppointment.aggregate([
            {
                // Extract month and year from createdAt
                $addFields: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" }
                }
            },
            {
                // Group by month, year, and status
                $group: {
                    _id: {
                        month: "$month",
                        year: "$year",
                        status: "$status"
                    },
                    count: { $sum: 1 } // Count number of appointments
                }
            },
            {
                // Project the data in a structured format
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    year: "$_id.year",
                    status: "$_id.status",
                    count: 1
                }
            },
            {
                // Sort by year and month for correct order
                $sort: { year: 1, month: 1 }
            }
        ]);

        console.log(appointmentData);

        // Define all possible statuses
        const statuses = ['scheduled', 'report-pending', 'completed'];

        // Prepare the data to fit the format
        const formattedData = appointmentData.reduce((acc, curr) => {
            const { month, status, count } = curr;
            const monthName = new Date(0, month - 1).toLocaleString('en', { month: 'short' });
            
            // Check if the month already exists in the accumulator
            let monthData = acc.find(item => item.month === monthName);

            if (!monthData) {
                // Initialize the month with all status counts set to 0
                monthData = {
                    month: monthName,
                    scheduled: 0,
                    'report-pending': 0,
                    completed: 0
                };
                acc.push(monthData);
            }

            // Set the count for the relevant status
            monthData[status] = count;

            return acc;
        }, []);

        // Ensure each month has data for all statuses, even if it's zero
        const completeData = formattedData.map(item => {
            statuses.forEach(status => {
                if (!item.hasOwnProperty(status)) {
                    item[status] = 0;
                }
            });
            return item;
        });

        res.status(200).json(completeData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
  
  
