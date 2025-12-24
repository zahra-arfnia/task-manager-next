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
import { useState, useEffect, useRef } from "react";

export const AddNewTaskCard = ({  onAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [important, setImportant] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [directories, setDirectories] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState("");
  const [error, setError] = useState("");

  const closeRef = useRef(null);


  useEffect(() => {
    async function fetchDirectories() {
      const res = await fetch("/api/directories");
      const data = await res.json();
      setDirectories(data);


      const mainDir = data.find((d) => d.name.toLowerCase() === "main");
      setSelectedDirectory(mainDir?._id || data[0]?._id || "");
    }
    fetchDirectories();
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }

  
    const directoryToSend =
      selectedDirectory || directories.find(d => d.name.toLowerCase() === "main")?._id || directories[0]?._id;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        deadline,
        important,
        completed,
        directory: directoryToSend,
      }),
    });

    if (res.ok) {
 
      setTitle("");
      setDescription("");
      setDeadline("");
      setImportant(false);
      setCompleted(false);
      setSelectedDirectory(directories.find(d => d.name.toLowerCase() === "main")?._id || directories[0]?._id || "");
      setError("");
      onAdded?.();
      closeRef.current?.click();
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        className={` text-slate-700 py-3 font-semibold rounded-lg border-dashed border-2 border-slate-300 text-sm w-64 h-56`}
      >
        Add New Task
      </DialogTrigger>

      <DialogContent className="bg-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="text-slate-700 font-semibold text-lg">
            Add a Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
      
          <div className="mb-4">
            <div className="text-slate-700 font-semibold text-sm mb-1">Title</div>
            <Input
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-100 font-medium text-slate-400 border-none px-4 py-2 w-full"
            />
            {error && !title.trim() && (
              <p className="text-red-500 text-sm mt-1">Title cannot be empty</p>
            )}
          </div>

         
          <div className="mb-4">
            <div className="text-slate-700 font-semibold text-sm mb-1">Deadline</div>
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="bg-slate-100 border-none px-4 py-2 w-full font-medium text-slate-700"
            />
          </div>

   
          <div className="mb-4">
            <div className="text-slate-700 font-semibold text-sm mb-1">Description</div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-slate-100 border-none px-4 py-2 w-full h-24 resize-none rounded-md text-slate-700"
              placeholder="Enter description..."
            />
          </div>

          <div className="mb-4">
            <div className="text-slate-700 font-semibold text-sm mb-1">Directory</div>
            <select
              value={selectedDirectory}
              onChange={(e) => setSelectedDirectory(e.target.value)}
              className="bg-slate-100 border-none px-4 py-2 w-full text-slate-600"
            >
              {directories.map((dir) => (
                <option key={dir._id} value={dir._id} className="text-slate-400">
                  {dir.name}
                </option>
              ))}
            </select>
          </div>

       
          <div className="mb-4 flex items-center gap-2">
            <input
              className="appearance-none w-4 h-4 rounded-full border border-gray-500 checked:bg-purple-600 checked:border-purple-600"
              type="checkbox"
              checked={important}
              onChange={(e) => setImportant(e.target.checked)}
            />
            <label className="text-slate-700 text-sm font-medium">Mark as Important</label>
          </div>

       
          <div className="mb-4 flex items-center gap-2">
            <input
              className="appearance-none w-4 h-4 rounded-full border border-gray-500 checked:bg-purple-600 checked:border-purple-600"
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            <label className="text-slate-700 text-sm font-medium">Mark as Completed</label>
          </div>

          <DialogFooter>
            <DialogClose ref={closeRef} className="hidden" />
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
