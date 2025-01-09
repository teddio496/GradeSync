import React, { useState, useEffect } from "react";

interface MovablePopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MovablePopup: React.FC<MovablePopupProps> = ({ isOpen, onClose, children }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(1000);
  const [dragOffset, setDragOffset] = useState({ offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const handleDrag = (event: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: event.clientX - dragOffset.offsetX,
          y: event.clientY - dragOffset.offsetY,
        });
      }
    };



    const stopDrag = () => {
      setIsDragging(false);
      document.body.style.userSelect = ""; // Restore user select
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", stopDrag);
      document.body.style.userSelect = "none"; // Disable text selection
    }

    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", stopDrag);
    };
  }, [isDragging, dragOffset]);

  useEffect(() => {
    setPosition({ x: 100, y:100})
  }, [isOpen])

  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault(); // Prevent text selection on mouse down
    setIsDragging(true);
    setZIndex((prev) => prev + 1);
    setDragOffset({
      offsetX: e.clientX - position.x,
      offsetY: e.clientY - position.y,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      style={{ top: position.y, left: position.x, zIndex }}
      className="absolute bg-skin-fore rounded-lg shadow-lg"
    >
      {/* Header */}
      <div
        onMouseDown={startDrag}
        className="cursor-move flex justify-between items-center bg-skin-highlight px-4 py-2 rounded-t-lg"
      >
        <div className="text-sm font-semibold">UofT</div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          ×
        </button>
      </div>

      <div className="p-4">{children}</div>
    </div>
  );
};

export default MovablePopup;
