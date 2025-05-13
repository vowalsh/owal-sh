import { useState, useEffect } from 'react';

// Universal color options that work well in both dark and light themes
const colorOptions = [
  // Reds/Oranges
  "4 79% 55%",    // Crimson
  "14 100% 63%",  // Coral
  "36 100% 50%",  // Orange
  "45 100% 50%",  // Amber
  "50 98% 60%",   // Yellow
  
  // Greens/Teals
  "66 70% 50%",   // Lime
  "122 42% 45%",  // Green
  "174 100% 29%", // Teal
  "187 100% 38%", // Cyan
  "199 98% 48%",  // Light Blue
  
  // Blues/Purples
  "207 90% 46%",  // Blue
  "231 45% 56%",  // Indigo
  "262 53% 55%",  // Purple
  "340 82% 59%",  // Pink
  "340 82% 52%",  // Red
];

export function useTerminalColor() {
  const [terminalColor, setTerminalColor] = useState<string>(() => {
    // Check if there's a color in localStorage
    const savedColor = localStorage.getItem('terminalColor');
    
    // If a saved color exists, use it
    if (savedColor) return savedColor;
    
    // Otherwise select a random color
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  });

  useEffect(() => {
    // Set the CSS variable when the terminal color changes
    document.documentElement.style.setProperty('--terminal-accent', terminalColor);
    localStorage.setItem('terminalColor', terminalColor);
  }, [terminalColor]);

  return { terminalColor, setTerminalColor };
}
