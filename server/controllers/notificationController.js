import Notification from "../models/notificationSchema.js";



export const createNotification = async (req, res) => {
    try {
        const { receiverId, title, message, link, status, date, read } = req.body;
        const notification = await Notification.create({
            receiverId,
            title,
            message,
            link,
        });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error creating notification' });
    }
};

export const getNotificationsById = async (req, res) => {
    const { userId } = req.params;
    console.log("user id"+userId);

    try {
        const notifications = await Notification.find({ receiverId: userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error getting notifications' });
    }
};

// Controller function to mark notifications as read
export const markNotificationsAsRead = async (req, res) => {
    const { notificationIds } = req.body;
  
    // Check if notificationIds is an array
    if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
      return res.status(400).json({ message: "Invalid input. Array of notification IDs required." });
    }
  
    try {
      // Update the notifications where the _id is in the array
      const result = await Notification.updateMany(
        { _id: { $in: notificationIds } }, // Find notifications with IDs in the provided array
        { $set: { read: true } }            // Set the read field to true
      );
  
      return res.status(200).json({
        message: `${result.modifiedCount} notifications marked as read.`,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while updating notifications.",
        error: error.message,
      });
    }
  };