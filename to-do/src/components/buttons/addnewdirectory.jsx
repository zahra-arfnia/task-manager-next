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

export const Addnewdirectoy = ({ btnname, onAdded, className }) => {
  const [name, setname] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); 


  
  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Directory name cannot be empty");
      return;
    }

    const res = await fetch("/api/directories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setname("");
      setError("");
     onAdded?.();
     setOpen(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className={className}>{btnname}</DialogTrigger>

      <DialogContent className={"dark:bg-gray-900 bg-slate-300 border-none"}>
        <DialogHeader>
          <DialogTitle className="dark:text-slate-100 text-slate-700 font-semibold text-lg">
            Creat new directory
          </DialogTitle>
        </DialogHeader>

        <div className="dark:text-slate-100 text-slate-700 font-semibold text">Title</div>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Enter name directory"
            className="dark:bg-gray-700 dark:text-slate-100 bg-slate-100 border-none text-slate-500 px-4 py-6 font-semibold delay-100 "
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <DialogFooter>
            <div className="w-full flex justify-start py-4">
              <DialogClose asChild>
                <button
                  type="submit"
                  className="text-white font-semibold bg-violet-600 py-2 px-4 rounded-md"
                >
                  Create
                </button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
