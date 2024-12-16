'use client';

import { HtmlHTMLAttributes, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import WebHeader from './components/header';

interface Task {
  title: string;
  id: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const inputReference = useRef<HTMLInputElement>(null);

  const handleAddTask = () => {
    const inputValue = inputReference?.current?.value;
    if (inputValue) {
      setTasks([{ title: inputValue, id: nanoid() }, ...tasks]);
      inputReference.current.value = '';
    }
  };

  const onEnterPressed = (key: React.KeyboardEvent<HTMLInputElement>) => {
    if (key.key === "Enter") {
      handleAddTask();
    }

  }


  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className=''>
      <WebHeader />
      <div className='flex gap-2 m-3'>
        <div>Add your Tasks</div>
        <input
          onKeyDown={onEnterPressed}
          ref={inputReference}
          className='border-2 border-gray-700 rounded'
          type='text'
          placeholder='Enter a task'
        />
        <button
          onClick={handleAddTask}
          className='bg-blue-600 text-white rounded px-3'
        >
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? <div>No Tasks</div> :
        <ul className="">
          {tasks.map((task, index) => (
            <li className='m-3 bg-gray-200 text-black text-xl w-auto' key={task.id}>{index + 1} - {task.title}
              <button>Delete</button>
            </li>

          ))}
        </ul>}
    </div>
  );
}
