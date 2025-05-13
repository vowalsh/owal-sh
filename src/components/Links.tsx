
import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Links: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full py-8">
      <div className="flex flex-col items-center gap-16 py-4"> {/* Increased gap for more vertical spacing */}
        <a href="https://github.com/vowalsh" className="text-terminal-accent hover:text-primary flex items-center space-x-3 w-full sm:w-auto justify-center" target="_blank" rel="noopener noreferrer">
          <Github className="w-7 h-7" /> {/* Reduced size from w-8 h-8 */}
          <span className="text-sm">github</span> {/* Reduced from text-md */}
        </a>
        <a href="https://linkedin.com/in/vowalsh" className="text-terminal-accent hover:text-primary flex items-center space-x-3 w-full sm:w-auto justify-center" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-7 h-7" /> {/* Reduced size from w-8 h-8 */}
          <span className="text-sm">linkedin</span> {/* Reduced from text-md */}
        </a>
        <a href="https://twitter.com/owalsh2" className="text-terminal-accent hover:text-primary flex items-center space-x-3 w-full sm:w-auto justify-center" target="_blank" rel="noopener noreferrer">
          <Twitter className="w-7 h-7" /> {/* Reduced size from w-8 h-8 */}
          <span className="text-sm">twitter</span> {/* Reduced from text-md */}
        </a>
      </div>
    </div>
  );
};

export default Links;
