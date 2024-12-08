"use client";

import React, { useContext } from 'react';
import { SidebarContext } from './Sidebar';

export const SidebarItem = ({ icon, text, href, active, onClick }) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex justify-center items-center py-2 px-3 my-1
        font-small rounded-full cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-secondary text-black-default"
            : "hover:bg-secondary hover:text-black-default text-white"
        }
      `}
      onClick={onClick}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-agreen text-black-default text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
        >
          {text}
        </div>
      )}
    </li>
  );
};
