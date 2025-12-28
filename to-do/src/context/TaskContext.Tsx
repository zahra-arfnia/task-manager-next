"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


export type Task = {
  id: string;
  title: string;
  completed: boolean;
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
  const [theme, setThem] = useState<Theme>("light");

  // reading saved theme on loading
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setThem(savedTheme);
    }
  }, []);

  // apply dark class + saved theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Change the theme
  const toggleTheme = () => {
    setThem((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
