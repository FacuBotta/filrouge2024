'use client';

import { deleteUserTask } from '@/actions/userServerActions/deleteUserTask';
import { Icon } from 'facu-ui';
import { useState } from 'react';

type TasksType = {
  id?: string;
  completed: boolean;
  content: string;
  createdAt?: Date;
};

export default function TasksProfile() {
  const testTasks: TasksType[] = [
    {
      id: '1',
      completed: true,
      content: 'Task 1',
      createdAt: new Date(),
    },
    {
      id: '2',
      completed: false,
      content: 'Task 2',
      createdAt: new Date(),
    },
    {
      id: '3',
      completed: true,
      content: 'Task 3',
      createdAt: new Date(),
    },
    {
      id: '4',
      completed: false,
      content: 'Task 4',
      createdAt: new Date(),
    },
  ];

  const [tasks, setTasks] = useState<TasksType[]>(testTasks);

  const handleDeleteTask = async (id: string) => {
    if (!id) return;
    const response = await deleteUserTask(id);
    if (response?.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 pt-2 items-center sm:!items-start">
      <Icon
        type="add"
        className="hover:text-red-600 dark:hover:text-dark-greenLight hover:scale-110"
        onClick={() => setTasks([{ completed: false, content: '' }, ...tasks])}
      />
      {tasks.map((task, index) => {
        return (
          <div className="flex gap-3 items-center" key={index}>
            <label htmlFor="taskCheck">
              <input
                className="peer"
                name="taskCheck"
                type="checkbox"
                defaultChecked={task.completed ? true : false}
                value={task.id}
                // onChange={() => setTasks([...tasks, task.status = !task.status])}
              />
              <input
                className="bg-transparent ml-2 border-b w-fit focus:outline-none peer-checked:line-through decoration-2 decoration-light-red "
                type="text"
                defaultValue={task.content}
                placeholder="Nouvelle tâche"
              />
            </label>
            <Icon
              onClick={() => handleDeleteTask(task.id as string)}
              type="delete"
            />
          </div>
        );
      })}
    </div>
  );
}
