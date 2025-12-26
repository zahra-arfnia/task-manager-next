import { AddNewTask } from "@/components/dialogs/addnewtask";
import { Input } from "@/components/ui/input";

export const Header = () => {
  const today = new Date();

  const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

  const year = today.getFullYear();
  const monthName = months[today.getMonth()];
  const day = today.getDate();

  console.log(`${day} ${monthName} ${year}`);

  return (
    <div className="flex  py-5 items-center justify-between">
      <Input
        placeholder="Serch task"
        className="bg-slate-100 font-medium text-slate-400 border-none px-4 py-6 w-1/3"
      />
      <div className="text-slate-500 font-medium">{`${year} ,${monthName} ${day}`}</div>
      <AddNewTask w="w-32" />
    </div>
  );
};
