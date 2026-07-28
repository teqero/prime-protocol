import { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
  className?: string;
}

export default function Typewriter({ texts, speed = 80, deleteSpeed = 40, pause = 2000, className = '' }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentText = texts[currentIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        timeout = setTimeout(() => {}, 300);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        }, deleteSpeed);
      }
    } else {
      if (displayText === currentText) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, speed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, speed, deleteSpeed, pause]);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span
        className="text-[#c9956b]"
        style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
      >
        |
      </span>
    </span>
  );
}
