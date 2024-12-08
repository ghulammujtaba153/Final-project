import Payment from "../models/paymentSchema.js";


export const totalEarningOfDoctor = async (req, res) => {
    const doctorId = req.params.doctorId;
    console.log(doctorId);

    try {
        const totalEarning = await Payment.find({doctorId : doctorId});
        res.status(200).json(totalEarning);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

