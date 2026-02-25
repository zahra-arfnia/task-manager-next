"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Directory = {
  _id: string;
  name: string;
};

export type Task = {
  _id: string;
  title: string;
  description: string;
  important: boolean;
  completed: boolean;
  deadline: string;
  directory?: Directory;
  createdAt: string;
  updatedAt: string;
  __v: number;
};



type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
};


const TaskContext = createContext<TaskContextType | null>(null);


export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchTasks(): Promise<void> {
    try {
      setLoading(true);
      const res = await fetch("/api/tasks");
      const data: Task[] = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};


export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }
  return context;
};

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null); // ابتدا null
  const [mounted, setMounted] = useState(false); // برای جلوگیری از فلش

  // خواندن theme از localStorage
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light";
    setTheme(savedTheme);
    setMounted(true); // hydration تموم شد
  }, []);

  // اعمال کلاس dark
  useEffect(() => {
    if (!theme) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // تا وقتی mounted نیست، هیچ چیزی رندر نشه
  if (!mounted || !theme) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}