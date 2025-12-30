"use client";

import { useTasks, useTheme } from "@/context/TaskContext";
import { Sun, Moon, X } from "lucide-react";

export const Rightsidebar = ({ isOpen, onClose }) => {
  const { tasks } = useTasks();
  const { theme, toggleTheme } = useTheme();

  const completedCount = tasks.filter((task) => task.completed).length;
  const value = tasks.length
    ? (completedCount * 100) / tasks.length
    : 0;

  return (
    <>
      
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}


      <div
        className={`
          bg-slate-100 dark:bg-gray-800
          h-full p-4 pt-8
          flex flex-col gap-6
          w-56

          fixed top-0 right-0 z-40
          transform transition-transform duration-300 ease-in-out

          ${isOpen ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
      
        <button
          onClick={onClose}
          className="absolute top-3 right-3 lg:hidden text-slate-500"
        >
          <X />
        </button>

        <h2 className="font-bold flex justify-center items-center gap-2 dark:text-slate-400">
          hi, user
          <img
            src="./download.jpg"
            alt="user"
            className="w-10 h-10 rounded-full"
          />
        </h2>

        <div className="flex justify-between items-center">
          <p className="text-slate-500 font-medium text-sm">Dark mode</p>
          <button
            onClick={toggleTheme}
            className="
              px-3 p-2 rounded-lg flex
              bg-slate-50 border-2 border-slate-200
              dark:border-slate-400
              text-slate-500
              dark:bg-gray-800 dark:text-white
            "
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-slate-500 font-medium text-sm">
            <p>All tasks</p>
            <p>
              {completedCount}/{tasks.length}
            </p>
          </div>

          <div className="bg-gray-200 h-2 rounded-full w-full">
            <div
              className="bg-violet-500 h-2 rounded-full transition-all"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
