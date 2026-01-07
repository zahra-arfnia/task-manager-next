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
import { Trash2 } from 'lucide-react';

export const DeleTask = ({ task, onDeleted ,i}) => {
  const [open, setOpen] = useState(false);

console.log(task.title);

   async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log("Deleted:", data);

      if (res.ok) {
         setOpen(false)
        onDeleted?.(); 
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={`delay-100  ${i === 0 ? `text-white` : `text-slate-500`}`}>
        <Trash2 className="w-5 h-5"/>
      </DialogTrigger>

      <DialogContent className="dark:bg-gray-900 bg-slate-300 border-none">
        <DialogHeader>
          <DialogTitle className="dark:text-slate-100 text-slate-700 font-semibold text-lg">
            Are you sure you want to delete this task {task.title}?
          </DialogTitle>
        
        </DialogHeader>

        <form onSubmit={handleSubmit}>

          <DialogFooter>
            <div className="w-full flex justify-start py-4 gap-4">
              <button
                type="submit"
                className="text-white font-semibold bg-violet-600 py-2 px-4 rounded-md"
              >
                yes
              </button>
              <DialogClose asChild>
                <button onClick={() => setOpen(false)} className="dark:bg-slate-400 bg-slate-200 p-2 rounded-md">cancel</button>
              </DialogClose>
              
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
