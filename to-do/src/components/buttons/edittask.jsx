"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { EllipsisVertical } from 'lucide-react';
import { useState, useEffect } from "react";

export const EditTask = ({ task, onUpdated ,i}) => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [deadline, setDeadline] = useState(
    task?.deadline ? new Date(task.deadline).toISOString().split("T")[0] : ""
  );
  const [important, setImportant] = useState(task?.important || false);
  const [completed, setCompleted] = useState(task?.completed || false);
  const [error, setError] = useState("");

  const [directories, setDirectories] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState("");

  useEffect(() => {
    async function fetchDirectories() {
      try {
        const res = await fetch("/api/directories");
        const data = await res.json();
        setDirectories(data);
        const mainDir = data.find((d) => d.name.toLowerCase() === "main");
        setSelectedDirectory(mainDir?._id || data[0]?._id || "");
      } catch (err) {
        console.error(err);
      }
    }
    fetchDirectories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }

    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          deadline,
          important,
          completed,
          directory: selectedDirectory,
        }),
      });

      const data = await res.json();
      console.log("Updated:", data);

      if (res.ok) {
        setError("");
        setOpen(false);
        onUpdated?.(); 
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger className={` delay-100  ${i === 0 ? `text-white` : `text-slate-500`}`}>
        <EllipsisVertical className="w-5 h-5" />
      </DialogTrigger>

      <DialogContent className="bg-slate-300 border-none dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="dark:text-slate-100 text-slate-700 font-semibold text-lg">
            Edit Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
        
          <div className="mb-4">
            <div className="dark:text-slate-100 text-slate-700 font-semibold text-sm mb-1">
              Title
            </div>
            <Input
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="dark:bg-gray-700 dark:text-slate-100 bg-slate-100 font-medium text-slate-700 border-none px-4 py-2 w-full"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

    
          <div className="mb-4">
            <div className="dark:text-slate-100 text-slate-700 font-semibold text-sm mb-1">
              Deadline
            </div>
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="dark:bg-gray-700 dark:text-slate-100 bg-slate-100 border-none px-4 py-2 w-full font-medium text-slate-700"
            />
          </div>

     
          <div className="mb-4">
            <div className="dark:text-slate-100 text-slate-700 font-semibold text-sm mb-1">
              Description
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="dark:bg-gray-700 dark:text-slate-100 bg-slate-100 border-none px-4 py-2 w-full h-24 resize-none rounded-md text-slate-700"
              placeholder="Enter description..."
            />
          </div>

       
          <div className="mb-4">
            <div className="dark:text-slate-100 text-slate-700 font-semibold text-sm mb-1">
              Directory
            </div>
            <select
              value={selectedDirectory}
              onChange={(e) => setSelectedDirectory(e.target.value)}
              className="dark:bg-gray-700 dark:text-slate-100 bg-slate-100 border-none px-4 py-2 w-full text-slate-600"
            >
              {directories.map((dir) => (
                <option key={dir._id} value={dir._id}>
                  {dir.name}
                </option>
              ))}
            </select>
          </div>

       
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={important}
              onChange={(e) => setImportant(e.target.checked)}
              className="appearance-none w-4 h-4 rounded border border-gray-500 checked:bg-purple-600 checked:border-purple-600"
            />
            <label className="dark:text-slate-100 text-slate-700 text-sm font-medium">
              Mark as Important
            </label>
          </div>

   
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="appearance-none w-4 h-4 rounded border border-gray-500 checked:bg-purple-600 checked:border-purple-600"
            />
            <label className="dark:text-slate-100 text-slate-700 text-sm font-medium">
              Mark as Completed
            </label>
          </div>

          <DialogFooter>
            <button
              type="submit"
              className="bg-violet-600 text-white px-4 py-2 rounded-md w-full"
            >
              Save
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
