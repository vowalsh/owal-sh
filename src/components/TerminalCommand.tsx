
import React, { useState } from "react";
import TypingEffect from "./TypingEffect";

interface TerminalCommandProps {
  command: string;
  output: React.ReactNode;
  delay?: number;
  typingSpeed?: number;
  showCursor?: boolean;
  onComplete?: () => void;
}

const TerminalCommand: React.FC<TerminalCommandProps> = ({
  command,
  output,
  delay = 0,
  typingSpeed = 28,
  showCursor = false,
  onComplete,
}) => {
  const [showOutput, setShowOutput] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  const handleTypingComplete = () => {
    setTypingComplete(true);
    setShowOutput(true);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <>
      <div className="terminal-line mb-1">
        <span className="terminal-prompt text-terminal-accent">$</span>
        {!typingComplete ? (
          <TypingEffect 
            text={command}
            speed={typingSpeed}
            delay={delay}
            onComplete={handleTypingComplete} 
            keepCursorAfterComplete={showCursor}
          />
        ) : (
          <span className="pl-2 whitespace-pre-wrap">
            {command}
            {showCursor && <span className="cursor-fade">&nbsp;</span>}
          </span>
        )}
      </div>
      {showOutput && (
        <div className="terminal-output mb-4 mt-8 pl-4">
          {output}
        </div>
      )}
    </>
  );
};

export default TerminalCommand;
