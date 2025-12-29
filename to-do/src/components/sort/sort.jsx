import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function SelectDemo({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[140px] dark:text-slate-100 border-none bg-slate-100 dark:bg-gray-800">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>

      <SelectContent className="border-none w-[150px]">
        <SelectGroup className="text-[13px] dark:text-slate-100 border-none rounded-lg dark:bg-gray-800">
          <SelectLabel>Sort by</SelectLabel>

          <SelectItem value="Order-added" className="dark:hover:bg-gray-700">
            Order added
          </SelectItem>

          <SelectItem value="Earlier-first" className="dark:hover:bg-gray-700">
            Earlier first
          </SelectItem>

          <SelectItem value="Later-first" className="dark:hover:bg-gray-700">
            Later first
          </SelectItem>

          <SelectItem
            value="Completed-first"
            className="dark:hover:bg-gray-700"
          >
            Completed first
          </SelectItem>

          <SelectItem
            value="Uncompleted-first"
            className="dark:hover:bg-gray-700"
          >
            Uncompleted first
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
