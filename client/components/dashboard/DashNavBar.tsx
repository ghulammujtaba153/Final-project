"use client";
import { UserContext } from '@/context/UserContext';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { Sun, Moon } from "lucide-react";

const DashNavBar = () => {
  const { user, logout } = useContext(UserContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0); 
  const [arrivalNotification, setArrivalNotification] = useState<any | null>(null);

  const socket = useRef<any>(null);

  const [isLightMode, setIsLightMode] = useState(false);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isLightMode) {
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
    }
  }, [isLightMode]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    
    socket.current.on("getNotification", (data: any) => {
      setArrivalNotification({
        _id: data._id, 
        receiverId: data.receiverId,
        message: data.message,
        title: data.title,
        link: data.link,
        date: Date.now(),
        read: false,
      });
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users: any) => {
      console.log(users);
    });
  }, [user]);

  // Add new notification to the list if it doesn't already exist and sort
  useEffect(() => {
    if (arrivalNotification && !notifications.find(notification => notification._id === arrivalNotification._id)) {
      setNotifications((prev) => [arrivalNotification, ...prev]);
      setUnreadCount((prev) => prev + 1); // Increase unread count for new notification
    }
  }, [arrivalNotification, notifications]);

  // Fetch notifications when the user is available
  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/notifications/${user._id}`);
        const sortedNotifications = res.data.sort((a: any, b: any) => new Date(b.date) - new Date(a.date));
        setNotifications(sortedNotifications);

        // Count unread notifications
        const unreadNotifications = sortedNotifications.filter((notification: any) => !notification.read);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, [user]);

  // Handle marking notifications as read
  const handleStatusChange = async () => {
    const unreadNotificationIds = notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification._id);

    if (unreadNotificationIds.length === 0) {
      setOpen(false)
      return;
    } 

    try {
      await axios.post(`${API_BASE_URL}/notifications/mark-read`, {
        notificationIds: unreadNotificationIds,
      });

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          unreadNotificationIds.includes(notification._id)
            ? { ...notification, read: true }
            : notification
        )
      );
      setUnreadCount(0); 
      setOpen(false)
    } catch (error) {
      console.error("Error marking notifications as read", error);
    }
  };

  // Handle closing notification modal and marking notifications as read
  const handleNotificationIconClick = () => {
    setOpen(true);
  };

  return (
    <div className="text-white w-full flex gap-5 bg-[#1F1E30] w-full items-center justify-end p-4 rounded-bl-md">
      <button
            onClick={toggleTheme}
            className="flex items-center justify-center px-2 py-1 hover:text-secondary "
          >
            {!isLightMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="relative">
        <Box
          sx={{ color: 'white' }}
          onClick={handleNotificationIconClick} // Use this to mark as read and open the menu
          className="flex items-center justify-center cursor-pointer p-2 hover:bg-gray-100/50 rounded-full"
        >
          <Badge color="secondary" variant="dot" invisible={unreadCount === 0}>
            <NotificationsNoneIcon />
          </Badge>
        </Box>

        {open && (
          <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md text-gray-100 z-10">
            <div className="flex items-center justify-between w-full">
              <p className="p-2 border-b border-gray-500">Notifications</p>

              {/* Cross Icon to close the notification modal */}
              <FontAwesomeIcon 
                icon={faTimes} 
                onClick={handleStatusChange} // Close the modal and mark notifications as read
                className="flex items-center justify-center p-2 cursor-pointer"
              />
            </div>

            <div className="flex flex-col p-2 overflow-y-scroll max-h-60">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification._id} className="flex items-start justify-between p-4 hover:bg-gray-700 cursor-pointer">
                    <div>
                      <p className="font-semibold">{notification.title}</p>
                      <p className="text-sm">{notification.message}</p>
                      <span className="text-xs text-gray-400">{new Date(notification.date).toLocaleString()}</span>
                    </div>
                    <div>
                      {!notification.read && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">New</span>}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center p-4 text-sm">No new notifications</p>
              )}
            </div>
          </div>
        )}
      </div>

      {user && user.profile ? (
        <img src={user.profile} className="w-[40px] h-[40px] rounded-full" alt="Profile" />
      ) : (
        <div className="w-[40px] h-[40px] rounded-full bg-gray-500" />
      )}
    </div>
  );
};

export default DashNavBar;
