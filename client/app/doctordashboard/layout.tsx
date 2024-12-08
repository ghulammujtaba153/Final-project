"use client";

import Sidebar, { SidebarContext } from '@/components/dashboard/Sidebar';  // Import SidebarContext
import { SidebarItem } from '@/components/dashboard/SidebarItem';
import React, { useEffect, useState, useContext } from 'react';
import { HiUser } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { UserContext } from "@/context/UserContext";
import DashNavBar from '@/components/dashboard/DashNavBar';
import { Bot, Home, LogOut, MessageCircleMore, MessagesSquare, NotebookText } from 'lucide-react';
import { FaBlog } from 'react-icons/fa6';

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [expanded, setExpanded] = useState(false);  // Manage expanded state here
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    const pathSegments = pathname.split('/');
    if (pathSegments.length > 3) {
      const lastSegment = pathSegments[2] || 'dashboard';
      setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
    } else {
      const lastSegment = pathSegments.pop() || 'dashboard';
      if (lastSegment === "doctordashboard") {
        setActiveItem("Dashboard");
      } else {
        setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
      }
    }
  }, [pathname]);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (item === "Dashboard") {
      router.push(`/doctordashboard`);
    } else {
      router.push(`/doctordashboard/${item.toLowerCase()}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}> 
      <div className='flex bg-primary text-white'>
        {/* Sidebar */}
        <div className={`transition-all duration-300 ${expanded ? 'w-64' : 'w-16'}`}>
          <Sidebar>  {/* Sidebar will now use the context value */}
            <SidebarItem
              icon={<Home size={24} />}
              text="Dashboard"
              href="/doctordashboard"
              active={activeItem === 'Dashboard'}
              onClick={() => handleItemClick('Dashboard')}
            />
            <SidebarItem
              icon={<HiUser size={24} />}
              text="Profile"
              href="/doctordashboard/profile"
              active={activeItem === 'Profile'}
              onClick={() => handleItemClick('Profile')}
            />
            <SidebarItem
              icon={<NotebookText size={24} />}
              text="Appointments"
              href="/doctordashboard/appointments"
              active={activeItem === 'Appointments'}
              onClick={() => handleItemClick('Appointments')}
            />
            <SidebarItem
              icon={<MessageCircleMore size={24} />}
              text="Chats"
              href="/doctordashboard/chats"
              active={activeItem === 'Chats'}
              onClick={() => handleItemClick('Chats')}
            />
            
            <SidebarItem
              icon={<Bot size={24} />}
              text="Medicalbot"
              href="/doctordashboard/medicalbot"
              active={activeItem === 'Medicalbot'}
              onClick={() => handleItemClick('Medicalbot')}
            />

            <SidebarItem
              icon={<FaBlog size={24} />}
              text="Blogs"
              href="/doctordashboard/blogs"
              active={activeItem === 'Blogs'}
              onClick={() => handleItemClick('Blogs')}
            />

            <SidebarItem
              icon={<MessagesSquare size={24} />}
              text="Feedback"
              href="/doctordashboard/feedback"
              active={activeItem === 'Feedback'}
              onClick={() => handleItemClick('Feedback')}
            />
            {/* <SidebarItem
              icon={}
              text="Logout"
              href="/"
              active={activeItem === 'Logout'}
              onClick={() => handleLogout()}
            /> */}
          </Sidebar>
          <button onClick={() => handleLogout()}>
            <a href="/">
              <LogOut size={24} />
            </a>
          </button>
        </div>

        {/* Main content */}
        <div
          className={`transition-all duration-300 flex-1 ${expanded ? 'ml-10' : 'ml-2'} bg`}
        >
          <DashNavBar />
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </SidebarContext.Provider>  
  );
};

export default Layout;
