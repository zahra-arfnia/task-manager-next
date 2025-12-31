import { AddNewTask } from "@/components/dialogs/addnewtask";
import { Input } from "@/components/ui/input";
export const Header = ({
  onAdded,
  searchTerm,
  setSearchTerm,
  isLeftOpen,
  setIsLeftOpen,
}) => {
  const today = new Date();

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const year = today.getFullYear();
  const monthName = months[today.getMonth()];
  const day = today.getDate();

  return (
    <header className="flex items-center gap-3 py-5 justify-between">
      
      {!isLeftOpen && (
        <button
          onClick={() => setIsLeftOpen(true)}
          className="
            md:hidden
            bg-violet-500 text-white
            p-3 rounded-lg
            shadow
            flex-shrink-0
          "
        >
          ☰
        </button>
      )}

      <Input
        placeholder="Search task"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
            w-full
    md:w-72
          bg-slate-100 font-medium text-slate-400
          border-none px-4 py-6 
          dark:bg-gray-800
        "
      />

      
      <div className="text-slate-500 font-medium hidden md:block">
        {`${year}, ${monthName} ${day}`}
      </div>

      
      <AddNewTask
        classname="hidden lg:block w-[140px] bg-violet-700 text-slate-50"
        onAdded={onAdded}
      />
    </header>
  );
};
