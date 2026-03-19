import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Themes: 'default', 'dark', 'high-contrast-light', 'high-contrast-dark', 'grayscale'
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('app-theme');
        if (savedTheme) return savedTheme;
        
        // System preference as fallback
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'default';
    });

    useEffect(() => {
        // Save to localStorage
        localStorage.setItem('app-theme', theme);
        
        // Apply theme class to root element
        const root = document.documentElement;
        // Remove existing theme classes
        // Remove all theme classes first
        const themeClasses = Array.from(root.classList).filter(c => c.startsWith('theme-'));
        themeClasses.forEach(c => root.classList.remove(c));
        
        // Add new theme class
        root.classList.add(`theme-${theme}`);
    }, [theme]);

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
