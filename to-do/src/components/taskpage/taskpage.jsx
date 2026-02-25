"use client";
import { Mysidebar } from "@/components/sidebar/left.sidebar";
import { Header } from "@/components/header/header";
import { Cards } from "@/components/cards/cards";
import { SelectDemo } from "@/components/sort/sort";
import { useTasks } from "@/context/TaskContext";
import { Rightsidebar } from "@/components/sidebar/right.sidbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { useParams } from "next/navigation";
import { MoveLeft } from "lucide-react";
export const TasksPage = ({ filterType = "all" }) => {
  const { tasks, loading, fetchTasks } = useTasks();
  const [sortOption, setSortOption] = useState("Order-added");
  const [searchTerm, setSearchTerm] = useState("");
  const [openSidebar, setOpenSidebar] = useState(null);

  const params = useParams();
  const directoryName = params && params.name;


let filteredTasks = tasks;


if (filterType === "important") {
  filteredTasks = tasks.filter(task => task.important);

} else if (filterType === "completed") {
  filteredTasks = tasks.filter(task => task.completed);

} else if (filterType === "uncompleted") {
  filteredTasks = tasks.filter(task => !task.completed);


} else if (directoryName) {
  filteredTasks = tasks.filter(
    task =>
      task.directory?.name?.toLowerCase() ===
      directoryName.toLowerCase()
  );
}
  
  const pageTitle = directoryName
  ? directoryName
  : filterType;




  filteredTasks = searchTerm.trim()
    ? filteredTasks.filter((task) =>
        task.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    : filteredTasks;

  return (
    <SidebarProvider style={{ "--sidebar-width": "14rem" }}>
      <main className="flex min-h-screen w-full">
        <Mysidebar
          isOpen={openSidebar === "left"}
          onClose={() => setOpenSidebar(null)}
        />

        <div className="flex-1 px-8 pt-5 flex flex-col gap-10 dark:bg-gray-900">
          <Header
            isLeftOpen={openSidebar === "left"}
            setIsLeftOpen={() => setOpenSidebar("left")}
            onAdded={fetchTasks}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <div className="flex justify-between items-center">
            {loading ? (
              <div className="text-slate-700 font-medium text-lg">
                Loading...
              </div>
            ) : (
              <div className="dark:text-slate-100 text-slate-700 font-medium text-lg">
                {pageTitle} Tasks ( {filteredTasks.length} tasks )
              </div>
            )}

            <SelectDemo value={sortOption} onChange={setSortOption} />
          </div>

          {filteredTasks.length > 0 && (
            <Cards
              tasks={filteredTasks}
              sortOption={sortOption}
              onDeleted={fetchTasks}
              onAdded={fetchTasks}
            />
          )}
        </div>

        <Rightsidebar
          isOpen={openSidebar === "right"}
          onClose={() => setOpenSidebar(null)}
        />

        <button
          onClick={() => setOpenSidebar("right")}
          className="fixed bottom-6 right-6 z-40 lg:hidden bg-violet-500 text-white p-4 rounded-full shadow-lg"
        >
          <MoveLeft />
        </button>
      </main>
    </SidebarProvider>
  );
};
