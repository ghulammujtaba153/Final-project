import Test from "../models/TestsSchema.js";


// Controller to create a new test
export async function createTest(req, res) {
    try {
        const { testName, price, description, picture } = req.body;


        const newTest = new Test({
            testName,
            picture, 
            price,
            description
        });

        await newTest.save();

        res.status(201).json({ message: 'Test created successfully.', test: newTest });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export async function getAllTests(req, res) {
    try {
        const tests = await Test.find();

        res.status(200).json({ message: 'Tests retrieved successfully.', tests });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export async function updateTest(req, res) {
    try {
        const { _id, testName, price, description, picture } = req.body;

        const test = await Test.findByIdAndUpdate(_id, { testName, price, description, picture });

        if (!test) {
            return res.status(404).json({ message: 'Test not found.' });
        }

        res.status(200).json({ message: 'Test updated successfully.', test });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export async function deleteTest(req, res) {
    try {
        const { id } = req.params;

        const test = await Test.findByIdAndDelete(id);

        if (!test) {
            return res.status(404).json({ message: 'Test not found.' });
        }

        res.status(200).json({ message: 'Test deleted successfully.', test });
        
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}