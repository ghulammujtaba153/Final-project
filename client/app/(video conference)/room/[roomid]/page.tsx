// "use client";
// import React, { useContext, useEffect, useRef } from 'react';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { UserContext } from '@/context/UserContext';

// const RoomPage = ({ params }: { params: { roomid: string } }) => {
//     const { user } = useContext(UserContext);
//     const meetingRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (!user) {
//             // Handle case where user is not available (e.g., redirect, show a message, etc.)
//             console.error("User is null or undefined");
//             return;
//         }

//         const roomID = params.roomid;
//         const userId = user._id;
//         const name = user.firstName;

//         const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_ID!);
//         const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;
//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userId, name, 720);

//         const zp = ZegoUIKitPrebuilt.create(kitToken);

//         if (meetingRef.current) {
//             zp.joinRoom({

//                 container: meetingRef.current,
//                 sharedLinks: [
//                     {
//                         name: 'Personal link',
//                         url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
//                     },
//                 ],
//                 scenario: {
//                     mode: ZegoUIKitPrebuilt.VideoConference,
//                 },
//             });
//         }
//     }, [user, params.roomid]);

//     if (!user) {
//         return <div>Loading...</div>; // Show a loading message or handle the null user case appropriately
//     }

//     return (
//         <div
//             className="myCallContainer"
//             ref={meetingRef}
//             style={{ width: '100vw', height: '100vh' }}
//         ></div>
//     );
// };

// export default RoomPage;



"use client";
import React, { useContext, useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { UserContext } from '@/context/UserContext';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';

const RoomPage = ({ params }: { params: { roomid: string } }) => {
    const { user , videoCallsPariticipants} = useContext(UserContext);
    const meetingRef = useRef<HTMLDivElement>(null);
    console.log("room page", videoCallsPariticipants)


    useEffect(() => {
        if (!user) {
            console.error("User is null or undefined");
            return;
        }
        console.log(videoCallsPariticipants)


        
        const roomID = params.roomid;
        const userId = user._id;
        const name = user.firstName;

        const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_ID!);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userId, name, 720);

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        const joinMeeting = async () => {
            try {
                const res=await axios.get(`${API_BASE_URL}/videoCalls/${roomID}`);
                console.log(res.data)
                if(res.data){
                    console.log("meeting already exists")
                    return;
                }else{
                    console.log(userId);
                    console.log(videoCallsPariticipants)
                    console.log(roomID)
                    

                    await axios.post(`${API_BASE_URL}/videoCalls/create`, {
                        startedBy: userId,
                        participants: videoCallsPariticipants, 
                        link: roomID,
                        status: 'active',
                    });   

                    console.log('Meeting data saved successfully!');
                }
                
            } catch (error) {
                console.error('Error saving meeting data:', error.message);
            }
        };

        if (meetingRef.current) {
            zp.joinRoom({
                container: meetingRef.current,
                sharedLinks: [
                    {
                        name: 'Personal link',
                        url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.VideoConference,
                },
            });

            joinMeeting(); // Save meeting data when the user joins
        }
    }, [user, params.roomid]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div
            className="myCallContainer"
            ref={meetingRef}
            style={{ width: '100vw', height: '100vh' }}
        ></div>
    );
};

export default RoomPage;
