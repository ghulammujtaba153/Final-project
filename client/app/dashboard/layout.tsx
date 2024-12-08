"use client";

import Sidebar, { SidebarContext } from '@/components/dashboard/Sidebar';  // Import SidebarContext
import { SidebarItem } from '@/components/dashboard/SidebarItem';
import { BellIcon, Bot, Home, LogOut, MessageCircleMore, MessagesSquare, NotebookText, Settings, Star, TestTubeDiagonal } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { HiUser } from 'react-icons/hi';
import { useRouter, usePathname } from 'next/navigation';
import { UserContext } from '@/context/UserContext';
import DashNavBar from '@/components/dashboard/DashNavBar';

// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import { FaBlog } from 'react-icons/fa6';

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [expanded, setExpanded] = useState(false);  // State for sidebar expansion
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
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
      setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
    }
  }, [pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item);

    if (item === "Appointments") {
      setIsSubMenuVisible(!isSubMenuVisible);  // Toggle sub-menu visibility
    } else {
      setIsSubMenuVisible(false);
      if (item === "Dashboard") {
        router.push(`/dashboard`);
      } else {
        router.push(`/dashboard/${item.toLowerCase()}`);
      }
    }
  };

  const handleSubItemClick = (subItem) => {
    if (subItem === 'Doctor') {
      router.push(`/dashboard/appointments`);
    } else if (subItem === 'Lab') {
      router.push(`/dashboard/testAppointments`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div className='flex bg-primary text-white'>
        <div className={`transition-all duration-300 ${expanded ? 'w-64' : 'w-16'}`}>
          <Sidebar>
            <SidebarItem
              icon={<Home size={24}/>}
              text="Dashboard"
              href="/dashboard"
              active={activeItem === 'Dashboard'}
              onClick={() => handleItemClick('Dashboard')}
            />
            <SidebarItem
              icon={<HiUser size={24}/>}
              text="Profile"
              href="/dashboard/profile"
              active={activeItem === 'Profile'}
              onClick={() => handleItemClick('Profile')}
            />
            <SidebarItem
              icon={<FontAwesomeIcon icon={faUserMd} size={24} />}
              text="Doctors"
              href="/dashboard/doctors"
              active={activeItem === 'Doctors'}
              onClick={() => handleItemClick('Doctors')}
            />
            <SidebarItem
              icon={<NotebookText size={24}/>}
              text="Appointments"
              href="/dashboard/"
              active={activeItem === 'Appointments'}
              onClick={() => handleItemClick('Appointments')}
            />
            {isSubMenuVisible && (
              <div className="ml-6">
                <SidebarItem
                  icon={<FontAwesomeIcon icon={faUserMd} size="lg" />}
                  text="Doctor"
                  href="/dashboard/appointments"
                  active={pathname.includes('/appointments')}
                  onClick={() => handleSubItemClick('Doctor')}
                />
                <SidebarItem
                  icon={<TestTubeDiagonal size={24} />}
                  text="Lab"
                  href="/dashboard/testAppointments"
                  active={pathname.includes('/testAppointments')}
                  onClick={() => handleSubItemClick('Lab')}
                />
              </div>
            )}
            <SidebarItem
              icon={<MessageCircleMore size={24}/>}
              text="Chats"
              href="/dashboard/chats"
              active={activeItem === 'Chats'}
              onClick={() => handleItemClick('Chats')}
            />
            <SidebarItem
              icon={<TestTubeDiagonal size={24}/>}
              text="Lab Tests"
              href="/dashboard/labtests"
              active={activeItem === 'Labtests'}
              onClick={() => handleItemClick('Labtests')}
            />

            <SidebarItem
              icon={<Bot size={24}/>}
              text="Bot"
              href="/dashboard/bot"
              active={activeItem === 'Bot'}
              onClick={() => handleItemClick('Bot')}
            />

            <SidebarItem
              icon={<FaBlog size={24}/>}
              text="Blogs"
              href="/dashboard/blogs"
              active={activeItem === 'Blogs'}
              onClick={() => handleItemClick('Blogs')}
            />
            
            <SidebarItem
              icon={<MessagesSquare size={24}/>}
              text="Feedback"
              href="/dashboard/feedback"
              active={activeItem === 'Feedback'}
              onClick={() => handleItemClick('Feedback')}
            />

            
            
            {/* <SidebarItem
              icon={<LogOut size={24}/>}
              text="Logout"
              href="/"
              active={activeItem === 'Logout'}
              onClick={() => handleLogout()}
            /> */}
          </Sidebar>
        </div>

        {/* Main content */}
        <div className={`transition-all duration-300 flex-1 ${expanded ? 'ml-10' : 'ml-2'} bg`}>
          <DashNavBar />
          <div className="p-4">{children}</div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Layout;
