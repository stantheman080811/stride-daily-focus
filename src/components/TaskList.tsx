
import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  goalTitle: string;
  tasks: Task[];
  onTaskComplete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ goalTitle, tasks, onTaskComplete }) => {
  // Calculate the current date to display
  const today = new Date();
  const formattedDate = today.toLocaleString('default', { month: 'long' }) + '/' + today.getDate();

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">To achieve {goalTitle}</h1>
      <h2 className="text-5xl font-black mb-6">HERE IS WHAT YOU NEED TO DO</h2>
      <p className="text-stride-secondary text-xl mb-8">{formattedDate}</p>
      
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <TaskItem 
            key={task.id}
            task={task}
            index={index}
            onComplete={onTaskComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
