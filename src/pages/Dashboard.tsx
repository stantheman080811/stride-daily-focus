
import React, { useState } from 'react';
import GoalCard from '@/components/GoalCard';
import TaskList from '@/components/TaskList';
import ChatButton from '@/components/ChatButton';
import ChatDialog from '@/components/ChatDialog';

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

interface Goal {
  id: string;
  title: string;
  tasks: Task[];
}

const Dashboard = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'goal A',
      tasks: [
        { id: '1-1', description: 'First step for goal A', completed: false },
        { id: '1-2', description: 'Second step for goal A', completed: false },
        { id: '1-3', description: 'Third step for goal A', completed: false },
      ]
    },
    {
      id: '2',
      title: 'goal B',
      tasks: [
        { id: '2-1', description: 'First step for goal B', completed: false },
        { id: '2-2', description: 'Second step for goal B', completed: false },
      ]
    },
    {
      id: '3',
      title: 'goal C',
      tasks: [
        { id: '3-1', description: 'First step for goal C', completed: false },
        { id: '3-2', description: 'Second step for goal C', completed: false },
        { id: '3-3', description: 'Third step for goal C', completed: false },
      ]
    }
  ]);

  const [activeGoalId, setActiveGoalId] = useState<string | null>('1');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleGoalClick = (goalId: string) => {
    setActiveGoalId(goalId);
  };

  const handleTaskComplete = (taskId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === activeGoalId) {
        return {
          ...goal,
          tasks: goal.tasks.map(task => 
            task.id === taskId ? { ...task, completed: true } : task
          )
        };
      }
      return goal;
    }));
  };

  const handleCreateGoal = (newGoal: {
    title: string;
    tasks: Task[];
  }) => {
    const goalId = `${goals.length + 1}`;
    
    setGoals([...goals, {
      id: goalId,
      title: newGoal.title,
      tasks: newGoal.tasks.map((task, i) => ({
        ...task,
        id: `${goalId}-${i+1}`
      }))
    }]);
  };

  const handleLongPress = (goalId: string) => {
    console.log(`Long press on goal ${goalId}`);
    // This would show the full plan view in a production app
  };

  const activeGoal = goals.find(goal => goal.id === activeGoalId);

  return (
    <div className="min-h-screen bg-stride-white p-6 pt-10 flex flex-col">
      {/* Goal Cards */}
      <div className="flex gap-4 overflow-x-auto pb-8 mb-10 -mx-6 px-6">
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            title={goal.title}
            isActive={goal.id === activeGoalId}
            onClick={() => handleGoalClick(goal.id)}
            onLongPress={() => handleLongPress(goal.id)}
          />
        ))}
      </div>

      {/* Task List */}
      <div className="flex-grow">
        {activeGoal && (
          <TaskList
            goalTitle={activeGoal.title}
            tasks={activeGoal.tasks}
            onTaskComplete={handleTaskComplete}
          />
        )}
      </div>

      {/* Chat Button - now positioned at the bottom of the content */}
      <div className="mt-auto pt-10 pb-6">
        <ChatButton onClick={() => setIsChatOpen(true)} />
      </div>
      
      {/* Chat Dialog */}
      <ChatDialog 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onCreateGoal={handleCreateGoal}
      />
    </div>
  );
};

export default Dashboard;
