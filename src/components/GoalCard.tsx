
import React from 'react';
import { cn } from '@/lib/utils';

interface GoalCardProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
  onLongPress?: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ 
  title, 
  isActive, 
  onClick, 
  onLongPress 
}) => {
  const [pressTimer, setPressTimer] = React.useState<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    if (onLongPress) {
      const timer = setTimeout(() => {
        onLongPress();
      }, 800); // Long press threshold of 800ms
      setPressTimer(timer);
    }
  };

  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  return (
    <div
      className={cn(
        'goal-card',
        isActive && 'active'
      )}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {title}
    </div>
  );
};

export default GoalCard;
