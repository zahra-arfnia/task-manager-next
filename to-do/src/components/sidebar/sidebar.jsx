import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
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

export const Mysidebar = () => {
  const [dirname, setdirname] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isopen, setisopen] = useState(false);
  const [hoveredDirId, setHoveredDirId] = useState(null);
const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768);
  const pathname = usePathname();

  async function fetchdir() {
    try {
      const res = await fetch("/api/directories");
      if (!res.ok) throw new Error("Failed to fetch directories");
      const data = await res.json();
      setdirname(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchdir();
  }, []);

  return (

<SidebarProvider>
      <Sidebar className="w-64 bg-slate-100 min-h-screen pt-12 flex flex-col gap-7 border-none">
        <SidebarContent className="flex flex-col items-center flex-1 gap-6">
          <h1 className="text-black font-bold text-lg">TO-DO-LIST</h1>

          <AddNewTask w="w-11/12" />

          <SidebarGroup>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.href;
                return (
                  <SidebarMenuItem
                    key={item.name}
                    className={`py-2 pl-2 font-medium text-sm delay-100 ${
                      active
                        ? "text-red-500 border-r-2 border-red-500"
                        : "text-slate-500 hover:text-red-500"
                    }`}
                  >
                    <a href={item.href}>{item.name}</a>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            <SidebarMenu className="text-slate-500 font-medium text-sm pt-2">
              <SidebarMenu className="border-none">
                <div
                  className="flex hover:text-red-500 delay-100 cursor-pointer"
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
                        a.name.toLowerCase() === "main"
                          ? -1
                          : b.name.toLowerCase() === "main"
                          ? 1
                          : 0
                      )
                      .map((dir, i) => {
                        const active = pathname === `/directories/${dir.name}`;
                        const isMain = dir.name.toLowerCase() === "main";

                        return (
                          <SidebarMenuItem
                            key={dir.id ?? i}
                            className={`px-6 py-1 flex justify-between items-center ${
                              active
                                ? "text-red-500 border-r-2 border-red-500"
                                : "text-slate-500"
                            }`}
                            onMouseEnter={() => setHoveredDirId(dir.id ?? i)}
                            onMouseLeave={() => setHoveredDirId(null)}
                          >
                            <a
                              href={`/directories/${dir.name}`}
                              className="hover:text-red-500"
                            >
                              {dir.name}
                            </a>

                            {!isMain && hoveredDirId === (dir.id ?? i) && (
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
                      btnname={" + new"}
                      className="hover:text-red-500 hover:border-red-500 delay-100 ml-8 my-2 px-2 py-1 border-dashed border-gray-300 border-2 rounded-sm text-xs"
                    />
                  </div>
                )}
              </SidebarMenu>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};
