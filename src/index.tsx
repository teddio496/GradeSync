import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found");
const root = ReactDOM.createRoot(rootElement);

const ThemedApp = () => {
  const getInitialTheme = () => {
    return localStorage.getItem('theme') || 'theme-pink';
  };

  const [theme, setTheme] = useState<string>(getInitialTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'theme-pink' ? 'theme-default' : 'theme-pink';
      localStorage.setItem('theme', newTheme); // Save new theme to localStorage
      return newTheme;
    });
  };

  useEffect(() => {
    // Ensure the initial theme is applied to the DOM
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`${theme} bg-skin-back text-skin-main font-sometype`}>
      <App onThemeToggle={toggleTheme} />
      <Toaster />
    </div>
  );
};

export default ThemedApp;

root.render(
  <React.StrictMode>
    <ThemedApp />
  </React.StrictMode>
);
