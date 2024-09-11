'use client';

import { createTask } from '@/actions/TasksServerActions/createTask';
import { deleteUserTask } from '@/actions/TasksServerActions/deleteUserTask';
import { updateTask } from '@/actions/TasksServerActions/updateTask';
import { Tasks } from '@prisma/client';
import { Icon } from 'facu-ui';
import { useEffect, useRef, useState } from 'react';

export default function TasksProfile({ tasks }: { tasks: Tasks[] }) {
  const [clientTasks, setClientTasks] = useState<any>(tasks);
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [currentContent, setCurrentContent] = useState<string>('');
  const tasksFormRef = useRef<HTMLFormElement>(null);
  const newTaskInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement[]>([]);

  // This useEffect is used to set the textarea height to the content
  useEffect(() => {
    clientTasks.forEach((task: any, index: number) => {
      const input = textareaRef.current[index];
      if (input) {
        input.style.height = '10px';
        input.style.height = `${input.scrollHeight + 1}px`;
      }
    });

    if (newTaskInputRef.current) {
      newTaskInputRef.current.style.width = `${newTaskInputRef.current.value.length - 1}ch`;
    }
  }, [clientTasks]);

  // This useEffect is used to save the task when the user leaves the page
  // It use the beforeunload event and after it'is called the eventListener is removed
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (currentTask) {
        handleUpdateTaskContent();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentTask, currentContent]);

  const handleDeleteTask = async (id: string) => {
    if (!id) return;
    const response = await deleteUserTask(id);
    if (response?.ok) {
      setClientTasks(clientTasks.filter((task: any) => task.id !== id));
    }
  };

  // This function update the content of a task in the database
  const handleUpdateTaskContent = async () => {
    if (!currentTask) return;
    // Delete task if the content is empty
    if (currentContent.length === 0) {
      await handleDeleteTask(currentTask.id);
      return;
    }
    const updatedTask = {
      ...currentTask,
      content: currentContent.trim(),
    };
    try {
      const result = await updateTask(updatedTask);
      if (result.ok) {
        setClientTasks(
          clientTasks.map((task: any) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // this function update the status of a task (completed or not) when the user click on the checkbox
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

  // this function create a new task with its content and default status to 'todo'
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

  // this function set the current content state and update the textarea height
  const handleInputChange = (e: any, index?: number) => {
    if (typeof index === 'number') {
      const updatedTasks = [...clientTasks];
      updatedTasks[index] = { ...updatedTasks[index], content: e.target.value };
      setClientTasks(updatedTasks);

      const input = textareaRef.current[index];
      if (input) {
        input.style.height = '10px';
        input.style.height = `${input.scrollHeight + 1}px`;
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
      {/* new task form */}
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

      {/* list of tasks */}
      <form ref={tasksFormRef} className="w-full">
        {clientTasks?.map((task: any, index: number) => {
          return (
            <div className="flex gap-3 items-center mt-1" key={task.id}>
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

              <textarea
                rows={1}
                ref={(el) => {
                  if (el) textareaRef.current[index] = el;
                }}
                className="no-scrollbar resize-none w-full h-10px bg-transparent ml-2 my-1 border-b border-dark-bg dark:border-light-grey/50 focus:outline-none peer-checked:line-through decoration-2 decoration-light-red placeholder:text-light-blue placeholder:dark:text-dark-greenLight/50"
                onFocus={(e) => {
                  setCurrentTask(task);
                  setCurrentContent(e.target.value);
                }} // Set task and content on focus on
                onChange={(e) => handleInputChange(e, index)} // Handle content change
                onBlur={handleUpdateTaskContent} // Save task content when user leaves the textarea
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
