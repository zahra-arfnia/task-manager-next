import { CalendarRange } from "lucide-react";
export const Cards = ({ tasks }) => {
  console.log(tasks);

  return (
    <div className="flex flex-wrap gap-6">
      {tasks.map((itams, i) => {
        const date = new Date(itams.deadline);
        const formatted = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;

        return (
          <div
            key={i}
            className={`shadow-xl  w-64 h-56 rounded-md p-3 ${
              i === 0 ? "bg-violet-500" : "bg-slate-100"
            }`}
          >
            <div className="pb-6 flex flex-col justify-between h-3/4 border-b-2 border-dashed border-gray-200">
              <div className="flex flex-col gap-2">
                <p
                  className={` truncate font-medium text-sm ${
                    i === 0 ? "text-white" : "text-slate-500"
                  }`}
                >
                  {itams.title}
                </p>
                <p
                  className={`break-words line-clamp-3 font-medium text-xs ${
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
          </div>
        );
      })}
    </div>
  );
};
