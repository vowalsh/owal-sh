
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ThemeOption = "dark" | "solarized-dark" | "solarized-light" | "light";

const ThemeToggle: React.FC = () => {
  const themeOptions: ThemeOption[] = ["dark", "solarized-dark", "solarized-light", "light"];
  
  const [themeIndex, setThemeIndex] = useState<number>(() => {
    // Check if there's a saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const index = themeOptions.indexOf(savedTheme as ThemeOption);
      return index >= 0 ? index : 0;
    }
    
    // If no saved theme, check system preferences
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 0; // Dark mode
    }
    
    return 3; // Default to light if no preferences found
  });

  const currentTheme = themeOptions[themeIndex];
  const isDarkMode = themeIndex <= 1;

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("dark", "light", "solarized-dark", "solarized-light");
    
    // Add the current theme class
    root.classList.add(currentTheme);
    
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  // Listen to system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only change if the user hasn't manually selected a theme
      if (!localStorage.getItem("theme")) {
        setThemeIndex(e.matches ? 0 : 3);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleThemeChange = (values: number[]) => {
    setThemeIndex(values[0]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <div className="flex items-center gap-3">
          <Moon className="h-4 w-4 text-muted-foreground" />
          <Slider
            className="w-24"
            defaultValue={[themeIndex]}
            max={3}
            step={1}
            value={[themeIndex]}
            onValueChange={handleThemeChange}
          />
          <Sun className="h-4 w-4 text-muted-foreground" />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeToggle;
