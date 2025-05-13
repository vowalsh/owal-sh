
import React from "react";
import { Palette, Dice4 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ColorOption {
  name: string;
  value: string;
  hsl: string;
}

interface ColorSelectorProps {
  onColorChange: (hsl: string) => void;
  currentColor: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ onColorChange, currentColor }) => {
  // Universal color palette - 3x5 grid of colors that work well on both light and dark themes
  const colorOptions: ColorOption[] = [
    // Row 1: Reds/Oranges
    { name: "Crimson", value: "#E53935", hsl: "4 79% 55%", },
    { name: "Coral", value: "#FF7043", hsl: "14 100% 63%", },
    { name: "Orange", value: "#FF9800", hsl: "36 100% 50%", },
    { name: "Amber", value: "#FFB300", hsl: "45 100% 50%", },
    { name: "Yellow", value: "#FDD835", hsl: "50 98% 60%", },
    
    // Row 2: Greens/Teals
    { name: "Lime", value: "#C0CA33", hsl: "66 70% 50%", },
    { name: "Green", value: "#43A047", hsl: "122 42% 45%", },
    { name: "Teal", value: "#009688", hsl: "174 100% 29%", },
    { name: "Cyan", value: "#00ACC1", hsl: "187 100% 38%", },
    { name: "Light Blue", value: "#039BE5", hsl: "199 98% 48%", },
    
    // Row 3: Blues/Purples
    { name: "Blue", value: "#1976D2", hsl: "207 90% 46%", },
    { name: "Indigo", value: "#5C6BC0", hsl: "231 45% 56%", },
    { name: "Purple", value: "#7E57C2", hsl: "262 53% 55%", },
    { name: "Pink", value: "#EC407A", hsl: "340 82% 59%", },
    { name: "Red", value: "#E91E63", hsl: "340 82% 52%", },
  ];

  // Function to pick a random color
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    onColorChange(colorOptions[randomIndex].hsl);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full" 
          aria-label="Terminal color"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <div className="grid grid-cols-5 gap-2 max-w-[250px]">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              className={`color-swatch h-8 w-8 rounded-full border ${currentColor === color.hsl ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-110'}`}
              style={{ backgroundColor: color.value }}
              onClick={() => onColorChange(color.hsl)}
              title={color.name}
              aria-label={`Set terminal accent color to ${color.name}`}
            />
          ))}
        </div>
        <div className="flex justify-center mt-3 pt-2 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={getRandomColor}
            className="flex items-center gap-2"
          >
            <Dice4 className="h-4 w-4" />
            <span>Random</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorSelector;
