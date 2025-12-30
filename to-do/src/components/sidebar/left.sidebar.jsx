

"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Addnewdirectoy } from "../dialogs/addnewdirectory";
import { EditDirectory } from "../dialogs/editdirectory";
import { DeletDirectory } from "../dialogs/deletedirectory";
import { AddNewTask } from "../dialogs/addnewtask";

const items = [
  { name: "All tasks", href: "/" },
  { name: "Important tasks", href: "/important" },
  { name: "Completed tasks", href: "/completed" },
  { name: "Uncompleted tasks", href: "/uncompleted" },
];

export const Mysidebar = ({ isOpen, onClose }) => {
  const [dirname, setdirname] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isopen, setisopen] = useState(false);
  const [hoveredDirId, setHoveredDirId] = useState(null);
  const pathname = usePathname();

  async function fetchdir() {
    try {
      const res = await fetch("/api/directories");
      const data = await res.json();
      setdirname(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchdir();
  }, []);

  return (
    <>
      {/* Backdrop موبایل */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        className={`
           !block md:!block
          bg-slate-100 dark:bg-gray-800
          h-full pt-12
          border-none

          fixed top-0 left-0 z-40
          transform transition-transform duration-300 ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        {/* Close button موبایل */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden text-slate-500"
        >
          <X />
        </button>

        <SidebarContent className="flex flex-col items-center flex-1 gap-6">
          <h1 className="font-bold text-lg dark:text-slate-400">
            TO-DO-LIST
          </h1>

          <AddNewTask classname="w-11/12" onAdded={fetchdir} />

          <SidebarGroup>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.href;
                return (
                  <SidebarMenuItem
                    key={item.name}
                    className={`py-2 pl-2 font-medium text-sm ${
                      active
                        ? "text-red-500 border-r-2 border-red-500 dark:text-slate-300 dark:border-slate-300"
                        : "text-slate-500 hover:text-red-500 dark:hover:text-slate-300"
                    }`}
                  >
                    <a href={item.href}>{item.name}</a>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            <SidebarMenu className="text-slate-500 font-medium text-sm pt-2">
              <div
                className="flex items-center gap-1 cursor-pointer hover:text-red-500 dark:hover:text-slate-300"
                onClick={() => setisopen(!isopen)}
              >
                {isopen ? <ChevronDown /> : <ChevronRight />}
                Directories
              </div>

              {loading && <div className="pl-6 py-1">Loading...</div>}

              {isopen && (
                <div>
                  {[...dirname]
                    .sort((a, b) =>
                      a.name.toLowerCase() === "main" ? -1 : 1
                    )
                    .map((dir, i) => {
                      const active =
                        pathname === `/directories/${dir.name}`;
                      const isMain =
                        dir.name.toLowerCase() === "main";

                      return (
                        <SidebarMenuItem
                          key={dir.id ?? i}
                          className={`px-6 py-1 flex justify-between ${
                            active
                              ? "text-red-500 border-r-2 border-red-500 dark:text-slate-300 dark:border-slate-300"
                              : "text-slate-500"
                          }`}
                          onMouseEnter={() =>
                            setHoveredDirId(dir.id ?? i)
                          }
                          onMouseLeave={() =>
                            setHoveredDirId(null)
                          }
                        >
                          <a
                            href={`/directories/${dir.name}`}
                            className="hover:text-red-500 dark:hover:text-slate-300"
                          >
                            {dir.name}
                          </a>

                          {!isMain &&
                            hoveredDirId === (dir.id ?? i) && (
                              <div className="flex gap-2">
                                <EditDirectory
                                  directory={dir}
                                  onEdited={fetchdir}
                                />
                                <DeletDirectory
                                  directory={dir}
                                  onDeleted={fetchdir}
                                />
                              </div>
                            )}
                        </SidebarMenuItem>
                      );
                    })}

                  <Addnewdirectoy
                    onAdded={fetchdir}
                    btnname="+ new"
                    className="ml-8 my-2 px-2 py-1 text-xs border-2 border-dashed border-gray-300 rounded-sm hover:text-red-500 hover:border-red-500 dark:hover:text-slate-300 dark:hover:border-slate-300"
                  />
                </div>
              )}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};
