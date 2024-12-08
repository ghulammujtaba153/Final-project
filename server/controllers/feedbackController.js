import FeedBack from "../models/feedBackSchema.js";

export const createFeedBack = async (req, res) => {
    try {
        const { userId, role, rating, liked, disliked, suggestion } = req.body;
        const newFeedBack = new FeedBack({
            userId,
            role,
            rating,
            liked,
            disliked,
            suggestion,
        });
        await newFeedBack.save();
        res.status(201).json(newFeedBack);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getFeedBack = async (req, res) => {
    try {
        const feedBack = await FeedBack.find({ }).populate("userId");
        res.status(200).json(feedBack);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getFeedBackById = async (req, res) => {
    try {
        const { id } = req.params;
        const feedBack = await FeedBack.findById(id).populate("userId");
        res.status(200).json(feedBack);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};