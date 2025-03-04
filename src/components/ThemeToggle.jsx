import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  // Get the saved theme from localStorage or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(savedTheme);

  // Apply the theme to the document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save the selected theme in localStorage
  }, [theme]);

  // Function to handle theme toggle
  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'; // Toggle between light and dark
    setTheme(newTheme);
  };

  return (
    <label className="toggle text-base-content">
      <input
        type="checkbox"
        className="theme-controller"
        value="synthwave"
        checked={theme === 'dark'} // Check if the current theme is dark
        onChange={handleThemeChange} // Handle theme change
      />
      <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
       <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
    </label>
  );
};

export default ThemeToggle;
