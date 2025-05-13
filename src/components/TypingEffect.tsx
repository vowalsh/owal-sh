
import React, { useState, useEffect, useCallback } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  keepCursorAfterComplete?: boolean;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 28,
  delay = 0,
  onComplete,
  keepCursorAfterComplete = false,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const startTyping = useCallback(() => {
    setIsTyping(true);
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    }, speed);
    
    return () => clearInterval(typingInterval);
  }, [text, speed, onComplete]);
  
  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      startTyping();
    }, delay);
    
    return () => clearTimeout(delayTimeout);
  }, [delay, startTyping]);
  
  return (
    <span className="pl-2 whitespace-pre-wrap">
      {displayedText}
      {(isTyping || (keepCursorAfterComplete && isComplete)) && <span className="cursor-fade">&nbsp;</span>}
    </span>
  );
};

export default TypingEffect;
