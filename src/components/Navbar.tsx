"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAnimate } from "motion/react";
import { NavigationContent } from "../constants/navigation";
import Image from "next/image";

export default function Navbar() {
  const [visible, setVisible] = useState(true); // Always visible for top navbar
  const [hovered, setHovered] = useState(false); // Tracks hover state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const [scope, animate] = useAnimate();

  // Animate selected item with wiggle effect
  const animateSelectedItem = useCallback(async (itemLabel: string) => {
    const selectedElement = document.querySelector(`[data-nav-item="${itemLabel}"]`);
    if (selectedElement) {
      await animate(selectedElement, {
        scale: [1, 1.1, 1],
        rotate: [0, -2, 2, -1, 1, 0]
      }, {
        duration: 0.6,
        ease: "easeInOut"
      });
    }
  }, [animate]);

  // Show navbar when scrolling up (but keep it more visible than before)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // For top navbar, we want it to be more persistent
      if (currentScrollY > 100) {
        setVisible(currentScrollY < lastScrollY.current);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set selected item based on current pathname
  useEffect(() => {
    const currentItem = NavigationContent.menu.find(item => item.href === pathname);
    if (currentItem) {
      setSelectedItem(currentItem.label);
      // Animate the selected item
      setTimeout(() => {
        animateSelectedItem(currentItem.label);
      }, 100);
    }
  }, [pathname, animateSelectedItem]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle item click with animation
  const handleItemClick = async (itemLabel: string) => {
    setSelectedItem(itemLabel);
    await animateSelectedItem(itemLabel);
  };

  // Desktop Top Navigation
  const DesktopNav = () => (
    <nav
      ref={scope}
      className={`hidden md:flex fixed top-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 z-50
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Main navigation"
    >
      <div className={`flex items-center gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg rounded-full px-6 py-3 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300
        ${hovered ? "bg-white dark:bg-gray-900 shadow-xl scale-105" : ""}
      `}>
        {NavigationContent.menu.map((item) => {
          const IconComponent = item.icon;
          const isSelected = selectedItem === item.label;
          return (
            <Link
              key={item.label}
              href={item.href}
              data-nav-item={item.label}
              onClick={() => handleItemClick(item.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group relative overflow-hidden
                ${isSelected
                  ? "bg-primary-500 text-white shadow-lg scale-110"
                  : "text-gray-700 dark:text-white hover:bg-primary-100 dark:hover:bg-accent-800"
                }
              `}
            >
              <IconComponent className={`h-4 w-4 flex-shrink-0 transition-all duration-300
                ${isSelected ? "animate-pulse" : "group-hover:scale-110"}
              `} />
              <span className={`text-sm whitespace-nowrap transition-all duration-300
                ${isSelected ? "font-bold" : "font-normal"}
              `}>
                {item.label}
              </span>
              {isSelected && (
                <div className="absolute inset-0 bg-primary-500 rounded-full animate-pulse opacity-20" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );

  // Mobile Navigation
  const MobileNav = () => (
    <>
      {/* Mobile Menu Button with Logo */}
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg rounded-full p-2 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl hover:scale-105"
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        <Image
          src="/images/logo_transparent.png"
          alt="Golden Nest Logo"
          className="w-8 h-8 object-contain"
          width={32}
          height={32}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <button
          type="button"
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close mobile menu overlay"
        />
      )}

      {/* Mobile Menu Panel */}
      <nav
        className={`md:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl z-50 transform transition-transform duration-300 ease-in-out rounded-l-3xl border-l border-gray-200/50 dark:border-gray-700/50 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center">
              <Image
                src="/images/logo_transparent.png"
                alt="Golden Nest Logo"
                className="w-20 h-20 object-contain"
                width={80}
                height={80}
              />
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 space-y-1">
              {NavigationContent.menu.map((item) => {
                const IconComponent = item.icon;
                const isSelected = selectedItem === item.label;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    data-nav-item={item.label}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleItemClick(item.label);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                      ${isSelected
                        ? "bg-primary-500 text-white shadow-lg scale-105"
                        : "text-gray-900 dark:text-white hover:bg-primary-100 dark:hover:bg-accent-800"
                      }
                    `}
                  >
                    <IconComponent className={`h-6 w-6 transition-all duration-300
                      ${isSelected ? "animate-pulse" : ""}
                    `} />
                    <span className={`text-lg transition-all duration-300
                      ${isSelected ? "font-bold" : "font-normal"}
                    `}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );

  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
}