"use client";

import React, { useEffect, useState } from "react";
import Home from "./Home";
import { Toaster } from "react-hot-toast";

// Define all the available themes
const themes = [
  "theme-default",
  "theme-pink",
  "theme-blue",
  "theme-green",
  "theme-orange",
  "theme-purple",
  "theme-yellow",
  "theme-red",
  "theme-teal",
  "theme-gray",
];

export default function Page() {
  const [currentTheme, setCurrentTheme] = useState("theme-default");

  useEffect(() => {
    // Load the saved theme from localStorage when the component mounts
    const savedTheme = localStorage.getItem("theme") || "theme-default";
    setCurrentTheme(savedTheme);
    document.body.className = `${savedTheme} font-sometype`;
  }, []);

  const toggleTheme = () => {
    // Get the next theme in the list, cycling back to the start if needed
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setCurrentTheme(nextTheme);
    document.body.className = `${nextTheme} font-sometype`;
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <>
      <Home onThemeToggle={toggleTheme} />
      <Toaster />
    </>
  );
}
