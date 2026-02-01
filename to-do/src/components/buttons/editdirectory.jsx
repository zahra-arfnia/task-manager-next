import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "../ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import { SquarePen } from 'lucide-react';

export const EditDirectory = ({ directory, onEdited }) => {
  const [newname, setnewname] = useState(directory.name);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!newname.trim()) {
      setError("Directory name cannot be empty");
      return;
    }

    try {
      const res = await fetch(`/api/directories/${directory._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newname }),
      });

      const data = await res.json();
      

      if (res.ok) {
        setError("");
        onEdited?.(); 
      } else {
        setError(data.message || "Failed to update");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="dark:hover:text-slate-300 delay-100 hover:text-red-500">
        <SquarePen className="w-4 h-4"/>
      </DialogTrigger>

      <DialogContent className="dark:bg-gray-900 bg-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="dark:text-slate-100 text-slate-700 font-semibold text-lg">
            Edit directory name
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Enter name directory"
            className="dark:bg-gray-700 dark:text-slate-100 bg-slate-100 border-none text-slate-500 px-4 py-6 font-semibold delay-100"
            value={newname}
            onChange={(e) => setnewname(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <DialogFooter>
            <div className="w-full flex justify-start py-4">
               <DialogClose asChild>
                 <button
                type="submit"
                className="text-white font-semibold bg-violet-600 py-2 px-4 rounded-md"
              >
                Save
              </button>
               </DialogClose>
             
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
