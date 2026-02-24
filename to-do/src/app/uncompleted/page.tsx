"use client";
import{TasksPage} from "@/src/components/taskpage/taskpage"
export default function UnCompletedPage() {
return(
  <TasksPage filterType="uncompleted" />
)
}
