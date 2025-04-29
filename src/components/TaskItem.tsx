
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface TaskItemProps {
  task: {
    id: string;
    description: string;
    completed: boolean;
  };
  index: number;
  onComplete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index, onComplete }) => {
  const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });
  const [showSparkle, setShowSparkle] = useState(false);
  const { toast } = useToast();

  const handleClick = (e: React.MouseEvent) => {
    if (task.completed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setSparklePosition({
      x: e.clientX - rect.left - 20, // Center the sparkle on cursor
      y: e.clientY - rect.top - 20,
    });
    
    setShowSparkle(true);
    
    // Show toast
    toast({
      title: "Yay!",
      description: "You've completed a task!",
      duration: 2000,
    });
    
    // Mark as complete
    onComplete(task.id);
    
    // Hide sparkle after animation
    setTimeout(() => setShowSparkle(false), 800);
  };

  return (
    <div 
      className="task-item" 
      style={{ '--animation-delay': index } as React.CSSProperties}
      onClick={handleClick}
    >
      <div className={cn('task-checkbox', task.completed && 'checked')}>
        {task.completed && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className={cn('text-lg', task.completed && 'line-through text-stride-secondary')}>
        {task.description}
      </span>
      {showSparkle && (
        <div 
          className="sparkle animate-sparkle" 
          style={{ left: `${sparklePosition.x}px`, top: `${sparklePosition.y}px` }}
        />
      )}
    </div>
  );
};

export default TaskItem;
