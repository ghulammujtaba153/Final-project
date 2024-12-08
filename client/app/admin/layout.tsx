"use client";

import Sidebar, { SidebarContext } from '@/components/dashboard/Sidebar';  // Import SidebarContext
import { SidebarItem } from '@/components/dashboard/SidebarItem';
import { Home, LucideLogOut, MessagesSquare, NotebookText } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { HiUser } from 'react-icons/hi';
import { useRouter, usePathname } from 'next/navigation';
import { UserContext } from "@/context/UserContext";
import DashNavBar from '@/components/dashboard/DashNavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faBedPulse, faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { FaBlog } from 'react-icons/fa';

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [expanded, setExpanded] = useState(false); // State to track sidebar expansion
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);  // To handle submenu visibility
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useContext(UserContext);

  // Set active menu item based on the current pathname
  useEffect(() => {
    const pathSegments = pathname.split('/');
    if (pathSegments.length > 3) {
      const lastSegment = pathSegments[2] || 'admin';
      setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
    } else {
      const lastSegment = pathSegments.pop() || 'admin';
      if (lastSegment === 'admin') {
        setActiveItem('Home');
      } else {
        setActiveItem(lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));
      }
    }
  }, [pathname]);

  // Handle sidebar item clicks
  const handleItemClick = (item) => {
    setActiveItem(item);

    if (item === "Appointments") {
      setIsSubMenuVisible(!isSubMenuVisible);  // Toggle sub-menu visibility
    } else {
      setIsSubMenuVisible(false);  // Hide submenu if another item is clicked
      if (item === "Home") {
        router.push(`/admin`);
      } else {
        router.push(`/admin/${item.toLowerCase()}`);
      }
    }
  };

  // Handle submenu item clicks
  const handleSubItemClick = (subItem) => {
    if (subItem === 'Doctor') {
      router.push(`/admin/appointments`);
    } else if (subItem === 'Lab') {
      router.push(`/admin/testAppointments`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div className='flex bg-primary text-white'>
        {/* Sidebar Section */}
        <div className={`transition-all duration-300 ${expanded ? 'w-64' : 'w-16'}`}>
          <Sidebar>
            <SidebarItem
              icon={<Home />}
              text="Home"
              href="/admin"
              active={activeItem === 'Home'}
              onClick={() => handleItemClick('Home')}
            />
            <SidebarItem
              icon={<FontAwesomeIcon icon={faHospitalUser} />}
              text="Users"
              href="/admin/users"
              active={activeItem === 'Users'}
              onClick={() => handleItemClick('Users')}
            />
            <SidebarItem
              icon={<FontAwesomeIcon icon={faUserMd} />}
              text="Doctors"
              href="/admin/doctors"
              active={activeItem === 'Doctors'}
              onClick={() => handleItemClick('Doctors')}
            />
            <SidebarItem
              icon={<FontAwesomeIcon icon={faBedPulse} />}
              text="Patients"
              href="/admin/patients"
              active={activeItem === 'Patients'}
              onClick={() => handleItemClick('Patients')}
            />
            <SidebarItem
              icon={<NotebookText size={24}/>}
              text="Appointments"
              href="/admin/appointments"
              active={activeItem === 'Appointments'}
              onClick={() => handleItemClick('Appointments')}
            />
            
            {/* Submenu for Appointments */}
            {isSubMenuVisible && (
              <div className="ml-6">
                <SidebarItem
                  icon={<FontAwesomeIcon icon={faUserMd} size="lg" />}
                  text="Doctor"
                  href="/admin/appointments"
                  active={pathname.includes('/appointments')}
                  onClick={() => handleSubItemClick('Doctor')}
                />
                <SidebarItem
                  icon={<FontAwesomeIcon icon={faBedPulse} />}
                  text="Lab"
                  href="/admin/testAppointments"
                  active={pathname.includes('/testAppointments')}
                  onClick={() => handleSubItemClick('Lab')}
                />
              </div>
            )}

            <SidebarItem
              icon={<FaBlog size={24} />}
              text="Blogs"
              href="/admin/blogs"
              active={activeItem === 'Blogs'}
              onClick={() => handleItemClick('Blogs')}
            />

            <SidebarItem
              icon={<MessagesSquare />}
              text="Feedback"
              href="/admin/feedback"
              active={activeItem === 'Feedback'}
              onClick={() => handleItemClick('Feedback')}
            />
            {/* <SidebarItem
              icon={<LucideLogOut />}
              text="Logout"
              href="/"
              active={activeItem === 'Logout'}
              onClick={handleLogout}
            /> */}
          </Sidebar>
        </div>

        {/* Main Content Section */}
        <div className={`transition-all duration-300 flex-1 ${expanded ? 'pl-11' : 'pl-2'}`}>
          <DashNavBar />
          <div className="">
            {children}
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Layout;
