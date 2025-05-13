
import React, { useState, useEffect } from "react";
import Terminal from "@/components/Terminal";
import TerminalCommand from "@/components/TerminalCommand";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Links from "@/components/Links";
import { useIsMobile } from "@/hooks/use-mobile";
import TypingEffect from "@/components/TypingEffect";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null);
  const [commandComplete, setCommandComplete] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Show welcome message after a short delay
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleCommandSelect = (command: string) => {
    setSelectedCommand(command);
    setCommandComplete(false);
    
    // Set the active section based on the command
    switch(command) {
      case "cat about.json | jq":
        setActiveSection('about');
        break;
      case "cat experience.log":
        setActiveSection('experience');
        break;
      case "cat skills.md":
        setActiveSection('skills');
        break;
      case "./links.sh":
        setActiveSection('links');
        break;
      default:
        setActiveSection(null);
    }
  };

  const resetPage = () => {
    setActiveSection(null);
    setSelectedCommand(null);
    setCommandComplete(false);
  };

  // Reset command state when switching sections
  const handleSectionChange = (section: string) => {
    setCommandComplete(false);
    setActiveSection(section);
  };

  const availableCommands = [
    "cat about.json | jq",
    "cat experience.log",
    "cat skills.md",
    "./links.sh"
  ];

  // Get the appropriate command for the current section
  const getCommandForSection = (section: string) => {
    switch(section) {
      case 'about': return "cat about.json | jq";
      case 'experience': return "cat experience.log";
      case 'skills': return "cat skills.md";
      case 'links': return "./links.sh";
      default: return "";
    }
  };

  return (
    <div className="h-screen flex flex-col fixed inset-0 p-2 sm:p-3">
      <div className="flex-grow flex items-center justify-center">
        <Terminal className="w-full h-full" onResetPage={resetPage}>
          {showWelcome && (
            <>
              <div className="sticky top-0 bg-card z-10 pb-1">
                <h1 
                  className="text-2xl sm:text-3xl font-bold mb-1 text-terminal-accent cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={resetPage}
                >
                  v. oliver walsh
                </h1>
                <div className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 space-y-1">
                  <p>machine learning engineering</p>
                  <p>distributed systems</p>
                  <p>blockchain engineering</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-0.5">
                  <button 
                    onClick={() => handleSectionChange('about')}
                    className="px-2 sm:px-3 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded"
                  >
                    about
                  </button>
                  <button 
                    onClick={() => handleSectionChange('experience')}
                    className="px-2 sm:px-3 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded"
                  >
                    experience
                  </button>
                  <button 
                    onClick={() => handleSectionChange('skills')}
                    className="px-2 sm:px-3 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded"
                  >
                    skills
                  </button>
                  <button 
                    onClick={() => handleSectionChange('links')}
                    className="px-2 sm:px-3 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded"
                  >
                    links
                  </button>
                </div>
              </div>

              {activeSection === 'about' && (
                <div className="mt-2">
                  <TerminalCommand 
                    command="cat about.json | jq" 
                    output={<About />}
                    showCursor={true}
                    onComplete={() => setCommandComplete(true)}
                  />
                </div>
              )}

              {activeSection === 'experience' && (
                <div className="mt-2">
                  <TerminalCommand 
                    command="cat experience.log" 
                    output={<Experience />}
                    showCursor={true}
                    onComplete={() => setCommandComplete(true)}
                  />
                </div>
              )}

              {activeSection === 'skills' && (
                <div className="mt-2">
                  <TerminalCommand 
                    command="cat skills.md" 
                    output={<Skills />}
                    showCursor={true}
                    onComplete={() => setCommandComplete(true)}
                  />
                </div>
              )}

              {activeSection === 'links' && (
                <div className="mt-2">
                  <TerminalCommand 
                    command="./links.sh" 
                    output={<Links />}
                    showCursor={true}
                    onComplete={() => setCommandComplete(true)}
                  />
                </div>
              )}

              {!activeSection && (
                <div className="mt-2 space-y-3">
                  <p className="text-sm text-muted-foreground mb-2">Available commands:</p>
                  
                  {availableCommands.map((cmd, index) => (
                    <div 
                      key={index} 
                      className="terminal-line cursor-pointer hover:bg-secondary/30 px-2 py-1 rounded-sm transition-colors"
                      onClick={() => handleCommandSelect(cmd)}
                    >
                      <span className="terminal-prompt text-terminal-accent">$</span>
                      <span className="ml-2">{cmd}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </Terminal>
      </div>
      
      <footer className="mt-1 sm:mt-2 text-center text-xs text-muted-foreground px-2">
        © {new Date().getFullYear()} v. oliver walsh. <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="hover:underline">MIT License</a>
      </footer>
    </div>
  );
};

export default Index;
