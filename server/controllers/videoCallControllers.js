import VideoCall from "../models/videoCallSchema.js";


export const createVideoCall = async (req, res) => {
  const { startedBy, participants, link } = req.body;
  console.log("create",req.body)

  try {
    const res=await VideoCall.find({link})
    if (res.length > 0) {
      return res.status(400).json({ message: 'Video call already exists' });
    }
    const newVideoCall = new VideoCall({
      startedBy,
      participants,
      link,
    });

    await newVideoCall.save();

    res.status(201).json(newVideoCall);
  } catch (error) {
    res.status(500).json({ message: 'Error creating video call', error });
  }
};




export const getVideoCallOnLink = async (req, res) => {
  const { link } = req.params;


  try {
    const videoCall = await VideoCall.findOne({ link });

    res.status(200).json(videoCall);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video call', error });
  }
};

export const updateVideoCallStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedVideoCall = await VideoCall.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedVideoCall) {
      return res.status(404).json({ message: 'Video call not found' });
    }
    const link=updatedVideoCall.link;

    const completedCalls = await VideoCall.updateMany(
      { link }, // Filter by link
      { status: "completed" } 
    );


    res.status(200).json(updatedVideoCall);
  } catch (error) {
    res.status(500).json({ message: 'Error updating video call status', error });
  }
};




export const getActiveVideoCallsForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const activeVideoCalls = await VideoCall.find({
      participants: userId,
      status: 'active',
    }).populate('startedBy participants');

    // console.log(activeVideoCalls)

    res.status(200).json(activeVideoCalls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching active video calls', error });
  }
};
