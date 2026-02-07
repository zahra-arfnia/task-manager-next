import { CalendarRange, Star } from "lucide-react";
import { DeleTask } from "../buttons/deletedtasks";
import { EditTask } from "../buttons/edittask";
import { AddNewTask } from "@/components/buttons/addnewtask";
export const Cards = ({ tasks, onDeleted, sortOption, onAdded }) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    switch (sortOption) {
      case "Earlier-first":
        return new Date(a.deadline) - new Date(b.deadline);

      case "Later-first":
        return new Date(b.deadline) - new Date(a.deadline);

      case "Completed-first":
        return b.completed - a.completed;

      case "Uncompleted-first":
        return a.completed - b.completed;

      case "Order-added":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  async function toggleImportant(id, currentValue) {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ important: !currentValue }),
      });

      if (res.ok) {
        onDeleted?.();
      }
    } catch (err) {
      console.error(err);
    }
  }
  async function toggleCompleted(id, currentValue) {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentValue }),
      });

      if (res.ok) {
        onDeleted?.();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-wrap w-full gap-5 justify-center  mt-5 items-center">
      {sortedTasks.map((itams, i) => {
        const date = new Date(itams.deadline);
        const formatted = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;

        return (
          <div
            key={itams._id}
            className={`shadow-xl w-64 h-56 rounded-md relative my-6 p-3 ${
              i === 0 ? "bg-violet-600" : "bg-slate-100 dark:bg-gray-800"
            }`}
          >
            <a
              href={`/directories/${itams.directory.name}`}
              className="dark:bg-slate-700 dark:text-slate-300 absolute top-2 right-2 text-xs bg-red-200 text-red-400 font-bold p-2 rounded-md -translate-y-9"
            >
              {itams.directory.name}
            </a>
            <div className="pb-6 flex flex-col justify-between h-3/4 border-b-2 dark:border-slate-400 border-dashed border-gray-200">
              <div className="flex flex-col gap-2">
                <p
                  className={` truncate font-medium text-sm ${
                    i === 0
                      ? "text-white"
                      : "text-slate-500 dark:text-slate-100"
                  }`}
                >
                  {itams.title}
                </p>
                <p
                  className={`break-words line-clamp-3 font-medium text-xs  ${
                    i === 0 ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {itams.description}
                </p>
              </div>
              <p
                className={`flex gap-3 items-center font-medium text-sm  ${
                  i === 0 ? "text-white" : "text-slate-500"
                }`}
              >
                <CalendarRange className="w-4 h-4" />
                {formatted}
              </p>
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                className={`font-semibold rounded-full py-1 px-2 ${
                  itams.completed
                    ? "bg-green-400 text-green-700"
                    : "bg-yellow-300 text-yellow-600"
                }`}
                onClick={() => toggleCompleted(itams._id, itams.completed)}
              >
                {itams.completed ? "completed" : "uncompleted"}
              </button>

              <div className="flex gap-1 justify-end ">
                <Star
                  className={`w-5 h-5 cursor-pointer ${
                    itams.important ? "text-red-500" : "text-gray-300"
                  }`}
                  onClick={() => toggleImportant(itams._id, itams.important)}
                  fill={itams.important ? "red" : "none"}
                />
                <DeleTask task={itams} onDeleted={onDeleted} i={i} />
                <EditTask task={itams} onUpdated={onDeleted} i={i} />
              </div>
            </div>
          </div>
        );
      })}

      <AddNewTask
        onAdded={onAdded}
        classname={` dark:bg-slate-900 bg-slate-200 text-slate-600  py-3 font-semibold rounded-lg border-dashed border-2 border-slate-300 dark:border-slate-500  text-sm w-64 h-56`}
      />
    </div>
  );
};
