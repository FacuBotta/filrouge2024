'use client';

import { createTask } from '@/actions/TasksServerActions/createTask';
import { deleteUserTask } from '@/actions/TasksServerActions/deleteUserTask';
import { updateTask } from '@/actions/TasksServerActions/updateTask';
import { Tasks } from '@prisma/client';
import { Icon } from 'facu-ui';
import { useEffect, useRef, useState } from 'react';
import { Reorder } from 'framer-motion';

export default function TasksProfile({ tasks }: { tasks: Tasks[] }) {
  const [clientTasks, setClientTasks] = useState<any>(tasks);
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [currentContent, setCurrentContent] = useState<string>('');
  const tasksFormRef = useRef<HTMLFormElement>(null);
  const newTaskInputRef = useRef<HTMLTextAreaElement>(null);
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
      newTaskInputRef.current.style.height = '10px';
      newTaskInputRef.current.style.height = `${newTaskInputRef.current.scrollHeight + 1}px`;
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
    // reorder the tasks when the user create a new task
    // like that the new task will be the first task with order 0
    const reorderedTasks = clientTasks.map((task: any, index: number) => {
      task.order = index + 1;
      return task;
    });
    const response = await createTask({ content: content, completed: false });
    if (response?.ok) {
      setClientTasks([response.newTask, ...reorderedTasks]);
      e.target.reset();
      // Adjust the width of the create task input
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
        newTaskInputRef.current.style.height = '10px';
        newTaskInputRef.current.style.height = `${newTaskInputRef.current.scrollHeight + 1}px`;
      }
    }
    setCurrentContent(e.target.value);
  };
  // this function is used to update the order of the tasks when the user drags and drops a task
  const handleDragEnd = async () => {
    try {
      for (let task of clientTasks) {
        await updateTask(task);
      }
    } catch (error) {
      console.error('Error al actualizar el orden de las tareas', error);
    }
  };
  // this function handle the drag visual order of the tasks
  const handleReorderTasks = async (newOrder: any) => {
    const updatedTasks = newOrder.map((task: any, index: number) => ({
      ...task,
      order: index + 1,
    }));
    setClientTasks(updatedTasks);
  };

  // TODO: implementar el ordenamiento de las tareas
  /* const handleOrderBy = (orderBy: string) => () => {
    // Clonar el array para evitar modificar el estado directamente
    const sortedTasks = [...clientTasks].sort((a: Tasks, b: Tasks) => {
      if (orderBy === 'order') {
        return (a.order || 0) - (b.order || 0);
      } else if (orderBy === 'complete') {
        return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
      } else if (orderBy === 'createdAt') {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      return 0; // Fallback en caso de no coincidir con ninguno de los criterios
    });

    // Actualizar el estado con las tareas ordenadas
    setClientTasks(sortedTasks);
  }; */
  return (
    <div className="w-full flex flex-col items-center flex-wrap sm:!items-start">
      {/* <select
        onChange={(e) => handleOrderBy(e.target.value)}
        className="border-b border-dark-bg dark:border-light-grey mb-1"
      >
        <option value="">Trier par</option>
        <option value="order">Ordre</option>
        <option value="complete">Complete</option>
        <option value="createdAt">Date de création</option>
      </select> */}
      {/* new task form */}
      <form
        onSubmit={(e) => handleCreateTask(e)}
        className="flex items-end gap-5 mb-2 w-full"
      >
        <div className="flex w-full gap-5">
          <button aria-label="Ajouter une tâche">
            <Icon
              type="add"
              className="hover:text-red-600 dark:hover:text-dark-greenLight hover:scale-110"
            />
          </button>
          <textarea
            ref={newTaskInputRef}
            name="content"
            placeholder="Nouvelle tâche"
            autoComplete="off"
            className="resize-none no-scrollbar min-w-[90%] bg-transparent ml-2 border-b focus:outline-none border-dark-bg dark:border-light-grey placeholder:text-light-blue placeholder:dark:text-dark-greenLight/50"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </form>

      {/* list of tasks */}
      <form ref={tasksFormRef} className="w-full select-none">
        <Reorder.Group
          axis="y"
          values={clientTasks}
          onReorder={handleReorderTasks}
        >
          {clientTasks?.map((task: any, index: number) => {
            return (
              <Reorder.Item
                value={task}
                onDragEnd={handleDragEnd}
                className="flex gap-2 items-center mt-1"
                key={task.id}
              >
                <Icon
                  onClick={() => handleDeleteTask(task.id as string)}
                  type="delete"
                  className="hover:text-red-600 dark:hover:text-dark-greenLight hover:scale-110"
                />
                {/* TODO: agragar el icono de drag */}
                <Icon type="draggable" />
                <input
                  aria-label="task-checkbox"
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
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </form>
    </div>
  );
}
