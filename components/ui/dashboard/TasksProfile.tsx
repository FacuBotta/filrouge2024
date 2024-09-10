'use client';

import { createTask } from '@/actions/TasksServerActions/createTask';
import { deleteUserTask } from '@/actions/TasksServerActions/deleteUserTask';
import { updateTask } from '@/actions/TasksServerActions/updateTask';
import { Tasks } from '@prisma/client';
import { Icon } from 'facu-ui';
import { useEffect, useRef, useState } from 'react';

export default function TasksProfile({ tasks }: { tasks: Tasks[] }) {
  console.log(tasks);
  const [clientTasks, setClientTasks] = useState<any>(tasks);
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [currentContent, setCurrentContent] = useState<any>('');

  const newTaskInputRef = useRef<HTMLInputElement>(null);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    clientTasks.forEach((task: any, index: number) => {
      const input = inputRefs.current[index];
      if (input) {
        input.style.width = `${input.value.length + 1}ch`;
      }
    });

    if (newTaskInputRef.current) {
      newTaskInputRef.current.style.width = `${newTaskInputRef.current.value.length - 1}ch`;
    }
  }, [clientTasks]);

  const handleDeleteTask = async (id: string) => {
    if (!id) return;
    const response = await deleteUserTask(id);
    if (response?.ok) {
      setClientTasks(clientTasks.filter((task: any) => task.id !== id));
    }
  };

  const handleUpdateTaskStatus = async (e?: any, task?: any) => {
    const updatedTask = {
      ...task,
      completed: e.target.checked,
    };
    if (!task) return;
    try {
      await updateTask(updatedTask);
      setClientTasks(
        clientTasks.map((task: any) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTaskContent = async (e: any) => {
    e.preventDefault();
    const updatedTask = {
      ...currentTask,
      content: currentContent,
    };
    const result = await updateTask(updatedTask);
  };

  const handleCreateTask = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get('content') as string;
    if (content.length === 0) return;
    const response = await createTask({ content: content, completed: false });
    if (response?.ok) {
      setClientTasks([response.newTask, ...clientTasks]);
      e.target.reset();
      if (newTaskInputRef.current) {
        newTaskInputRef.current.style.width = '10ch';
      }
    }
  };

  const handleInputChange = (e: any, index?: number) => {
    if (typeof index === 'number') {
      const input = inputRefs.current[index];
      if (input) {
        input.style.width = `${e.target.value.length - 1}ch`;
      }
    } else {
      if (newTaskInputRef.current) {
        newTaskInputRef.current.style.width = `${e.target.value.length - 1}ch`;
      }
    }
    setCurrentContent(e.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-2 pt-2 items-center flex-wrap sm:!items-start">
      <form
        onSubmit={(e) => handleCreateTask(e)}
        className="flex items-end gap-5 mb-2 w-full"
      >
        <input
          ref={newTaskInputRef}
          name="content"
          type="text"
          placeholder="Nouvelle tâche"
          autoComplete="off"
          className="min-w-[200px] max-w-full bg-transparent ml-2 border-b focus:outline-none border-dark-bg dark:border-light-grey placeholder:text-light-blue placeholder:dark:text-dark-greenLight/50"
          onChange={(e) => handleInputChange(e)}
        />
        <button>
          <Icon
            type="add"
            className="hover:text-red-600 dark:hover:text-dark-greenLight hover:scale-110"
          />
        </button>
      </form>

      <form onSubmit={(e) => handleUpdateTaskContent(e)}>
        {clientTasks?.map((task: any, index: number) => {
          return (
            <div className="flex gap-3 items-center mt-1" key={task.id}>
              <input name="currentTask" type="submit" hidden value={task.id} />
              <Icon
                onClick={() => handleDeleteTask(task.id as string)}
                type="delete"
                className="hover:text-red-600 dark:hover:text-dark-greenLight hover:scale-110"
              />
              <input
                autoComplete="off"
                className="peer"
                type="checkbox"
                defaultChecked={task.completed ? true : false}
                onChange={(e) => handleUpdateTaskStatus(e, task)}
              />

              <input
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                className="max-w-full bg-transparent ml-2 border-b border-dark-bg dark:border-light-grey focus:outline-none peer-checked:line-through decoration-2 decoration-light-red placeholder:text-light-blue placeholder:dark:text-dark-greenLight/50"
                type="text"
                onFocus={() => setCurrentTask(task)}
                onChange={(e) => handleInputChange(e, index)}
                defaultValue={task.content}
                placeholder="..."
              />
            </div>
          );
        })}
      </form>
    </div>
  );
}
