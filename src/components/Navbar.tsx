"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NavigationContent } from "../constants/navigation";

export default function Navbar() {
  const [visible, setVisible] = useState(false); // Tracks visibility
  const [hovered, setHovered] = useState(false); // Tracks hover state
  const lastScrollY = useRef(0);

  // Show navbar when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-[30%] left-0 transform -translate-y-1/2 transition-all duration-300 z-50
        ${visible || hovered ? "translate-x-0 opacity-100" : "-translate-x-28 opacity-20"}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Main navigation"
    >
      <div className="flex flex-col gap-4 bg-white dark:bg-gray-900 shadow-lg rounded-r-xl p-3 border border-gray-200 dark:border-gray-700">
        {NavigationContent.menu.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary-300 dark:hover:bg-accent-800 transition-colors"
            >
              <IconComponent className="h-5 w-5" />
              <span className="hidden md:block text-gray-700 dark:text-white font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}