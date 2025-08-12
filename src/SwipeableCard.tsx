import React, { useState, useRef, useEffect, useCallback } from "react";

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  swipeThreshold?: number;
  className?: string;
  disabled?: boolean;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  swipeThreshold = 50,
  className = "",
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const resetCard = () => {
    setTransform({ x: 0, y: 0 });
    setCurrentPos({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleStart = (clientX: number, clientY: number) => {
    if (disabled) return;
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
    setCurrentPos({ x: clientX, y: clientY });
  };

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging || disabled) return;

      const deltaX = clientX - startPos.x;
      const deltaY = clientY - startPos.y;

      setCurrentPos({ x: clientX, y: clientY });
      setTransform({ x: deltaX, y: deltaY });
    },
    [disabled, isDragging, startPos.x, startPos.y],
  );

  const handleEnd = useCallback(() => {
    if (!isDragging || disabled) return;

    const deltaX = currentPos.x - startPos.x;
    const absDeltaX = Math.abs(deltaX);

    // Only trigger swipe if threshold is met
    if (absDeltaX > swipeThreshold) {
      // Determine swipe direction based on horizontal movement
      if (deltaX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }

    resetCard();
  }, [
    currentPos.x,
    disabled,
    isDragging,
    onSwipeLeft,
    onSwipeRight,
    startPos.x,
    swipeThreshold,
  ]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleEnd();
  };

  // Global mouse events for when mouse leaves the card while dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && !disabled) {
        handleMove(e.clientX, e.clientY);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, disabled, startPos, currentPos, handleMove, handleEnd]);

  // Calculate rotation based on horizontal movement
  const rotation = transform.x * 0.1; // Adjust multiplier for more/less rotation

  // Calculate opacity based on distance moved
  const opacity = Math.max(0.7, 1 - Math.abs(transform.x) / 200);

  return (
    <div
      ref={cardRef}
      className={`select-none touch-manipulation transition-transform duration-200 ease-out cursor-grab active:cursor-grabbing ${
        isDragging ? "transition-none" : ""
      } ${className}`}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px) rotate(${rotation}deg)`,
        opacity: isDragging ? opacity : 1,
        willChange: isDragging ? "transform" : "auto",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

export default SwipeableCard;
