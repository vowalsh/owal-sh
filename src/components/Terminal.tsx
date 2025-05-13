import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Github } from "lucide-react";

interface TerminalProps {
  children: ReactNode;
  className?: string;
  onResetPage?: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ children, className, onResetPage }) => {
  return (
    <div
      className={cn("terminal w-full h-full max-w-full mx-auto relative", className)}
    >
      <div className="terminal-scanlines" />
      <div className="terminal-vignette" />
      <div className="terminal-header flex items-center py-1">
        <div className="flex items-center gap-1.5 flex-1">
          <div className="h-2.5 w-2.5 rounded-full bg-terminal-error opacity-80" />
          <div className="h-2.5 w-2.5 rounded-full bg-terminal-muted opacity-80" />
          <div className="h-2.5 w-2.5 rounded-full bg-terminal-success opacity-80" />
          <div
            className="flex-1 text-center text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            onClick={onResetPage}
          >
            owal.sh
          </div>
        </div>
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/vowalsh/owal-sh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-xs"
          >
            <Github size={14} />
            <span className="hidden sm:inline">source</span>
          </a>
        </div>
      </div>
      <ScrollArea className="terminal-body h-[calc(100%-1.75rem)]">
        {children}
      </ScrollArea>
    </div>
  );
};

export default Terminal;
