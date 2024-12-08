"use client";
import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { cn } from "@/utils/cn";
import { UserContext } from "@/context/UserContext";
import { Sun, Moon } from "lucide-react"; // For theme icons
import { Contact, Stethoscope, TestTube, LogIn } from "lucide-react"; // Add other icons here

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { user, logout } = useContext(UserContext);
  const [visible, setVisible] = useState(true);
  const [theme, setTheme] = useState("light"); // State to handle theme
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

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
    if (
      pathname.startsWith("/doctordashboard") ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/conversation") ||
      pathname.startsWith("/conference") ||
      pathname.startsWith("/room") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/nurse")
    ) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [pathname]);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setDropdownVisible(false);
  };

  const handleDashboardClick = () => {
    setDropdownVisible(false);
    if (user) {
      if (user.role === "doctor") {
        router.push("/doctordashboard");
      } else if (user.role === "patient") {
        router.push("/dashboard");
      } else if (user.role === "admin") {
        router.push("/admin");
      } else if (user.role === "nurse") {
        router.push("/nurse");
      }
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  if (!visible) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex w-full fixed z-[5000] inset-x-0 mx-auto px-10 py-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-between space-x-4",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          // backgroundColor: "#191d2b", // Transparent background
          borderRadius: "0px", // Removed rounded corners
          height: "60px", // Adjust the height of the navbar
          padding: "10px 20px", // Adjust padding for a smaller navbar
        }}
      >
        <div className="flex items-center space-x-2">
          <Link href="/">
            <img
              src="Laboratory.png"
              alt="Laboratory Image"
              className="w-[40px] h-[40px]"
            />
          </Link>
          <Link href="/">
            <span className="text-lg text-white font-semibold md:block hidden">
              Cardio Hema Hub
            </span>
          </Link>
        </div>

        

        <div className="flex items-center justify-center space-x-4 text-white">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center px-2 py-1 hover:text-secondary "
          >
            {!isLightMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link
            href="/"
            className={cn(
              "relative items-center flex space-x-1 hover:text-secondary "
            )}
          >
            <span className="text-sm !cursor-pointer">Home</span>
          </Link>

          <Link
            href="/#wobble-card"
            className={cn(
              "relative  items-center flex space-x-1 hover:text-secondary "
            )}
          >
            <span className="text-sm !cursor-pointer">Services</span>
          </Link>

          <Link
            href="/#Testimonials"
            className={cn(
              "relative items-center flex space-x-1 hover:text-secondary "
            )}
          >
            {/* <Contact size={20} /> */}
            <span className="text-sm !cursor-pointer">Testimonials</span>
          </Link>

          <Link
            href="/#faqs"
            className={cn(
              "relative  items-center flex space-x-1 hover:text-secondary "
            )}
          >
            {/* <Contact size={20} /> */}
            <span className="text-sm !cursor-pointer">FAQs</span>
          </Link>

          <Link
            href="/#contact"
            className={cn(
              "relative  items-center flex space-x-1 hover:text-secondary "
            )}
          >
            {/* <Contact size={20} /> */}
            <span className="text-sm !cursor-pointer">Contact Us</span>
          </Link>

          

          {!user && (
            <Link
              href="/login"
              className={cn(
                "relative items-center flex space-x-1 hover:text-secondary"
              )}
            >
              <span className="text-sm !cursor-pointer">Login</span>
            </Link>
          )}

          <div className="relative">
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={toggleDropdown}
            >
              {user && (
                <img
                  className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  src={user.profile}
                  alt="Bordered avatar"
                />
              )}
            </div>
            <AnimatePresence>
              {dropdownVisible && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-lg py-2"
                >
                  <motion.div variants={linkVariants}>
                    <div
                      onClick={handleDashboardClick}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Dashboard
                    </div>
                  </motion.div>
                  {/* Add other dropdown options */}
                  <motion.div variants={linkVariants}>
                    <Link
                      href="/"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
