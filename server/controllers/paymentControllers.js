import Payment from "../models/paymentSchema.js";

export const createPayment = async (req, res) => {
  const { doctorId, patientId, amount } = req.body;
  console.log("create",req.body)
  try {
    const newPayment = new Payment({
      doctorId,
      patientId,
      amount,
    });

    await newPayment.save();

    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error });
  }
};


export const createTestPayment = async (req, res) => {
  const { testId, patientId, amount } = req.body;
  console.log("create",req.body)
  try {
    const newPayment = new Payment({
      testId,
      patientId,
      amount,
    });

    await newPayment.save();

    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error });
  }
};





export const getPaymentsByPatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    const payments = await Payment.find({ patientId });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error });
  }
};

export const getPaymentsByDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const payments = await Payment.find({ doctorId });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error });
  }
};