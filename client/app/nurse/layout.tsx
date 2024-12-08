"use client";

import Sidebar, { SidebarContext } from '@/components/dashboard/Sidebar';  // Import SidebarContext
import { SidebarItem } from '@/components/dashboard/SidebarItem';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { UserContext } from "@/context/UserContext";
import DashNavBar from '@/components/dashboard/DashNavBar';
import { Home, LogOut, NotebookText } from 'lucide-react';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { FaBlog } from 'react-icons/fa';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [activeItem, setActiveItem] = useState('Home');
  const [expanded, setExpanded] = useState(false);  // Manage expanded state here
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    // Split the pathname into segments to determine active sidebar item
    const pathSegments = pathname.split('/').filter(Boolean); // Filter out empty segments
    if (pathSegments.length > 1) {
      const currentPage = pathSegments[1]; // Assuming '/nurse/somePage'
      setActiveItem(currentPage.charAt(0).toUpperCase() + currentPage.slice(1));
    } else {
      setActiveItem('Home');
    }
  }, [pathname]);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (item === "Home") {
      router.push(`/nurse`);
    } else {
      router.push(`/nurse/${item.toLowerCase()}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}> 
      <div className='flex bg-primary text-white min-h-screen'>
        {/* Sidebar */}
        <div className={`transition-all duration-300 ${expanded ? 'w-64' : 'w-16'}`}>
          <Sidebar>
            <SidebarItem
              icon={<Home />}
              text="Home"
              href="/nurse"
              active={activeItem === 'Home'}
              onClick={() => handleItemClick('Home')}
            />
            <SidebarItem
              icon={<PlaylistAddIcon />}
              text="Tests"
              href="/nurse/tests"
              active={activeItem === 'Tests'}
              onClick={() => handleItemClick('Tests')}
            />
            <SidebarItem
              icon={<PlaylistAddCheckCircleIcon />}
              text="List"
              href="/nurse/list"
              active={activeItem === 'List'}
              onClick={() => handleItemClick('List')}
            />
            <SidebarItem
              icon={<NotebookText size={24} />}
              text="Appointments"
              href="/nurse/appointments"
              active={activeItem === 'Appointments'}
              onClick={() => handleItemClick('Appointments')}
            />
            <SidebarItem
              icon={<FaBlog size={24} />}
              text="Blogs"
              href="/nurse/blogs"
              active={activeItem === 'Blogs'}
              onClick={() => handleItemClick('Blogs')}
            />

            {/* <SidebarItem
              icon={<LogOut size={24} />}
              text="Logout"
              onClick={handleLogout}
            /> */}
          </Sidebar>
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
