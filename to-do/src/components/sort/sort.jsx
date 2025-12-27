import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export function SelectDemo() {
  return (
    <Select >
      <SelectTrigger className="w-[140px] border-none bg-slate-100">
  <SelectValue placeholder="Sort by" />
</SelectTrigger>

      <SelectContent >
        <SelectGroup >
          <SelectLabel className="text-[13px]" >Sort by</SelectLabel>
          <SelectItem  className="text-[13px]" value="Order-added">Order added</SelectItem>
          <SelectItem className="text-[13px]" value="Earlier-first">Earlier first</SelectItem>
          <SelectItem className="text-[13px]" value="Later-first">Later first</SelectItem>
          <SelectItem className="text-[13px]" value="Completed-first">Completed first</SelectItem>
          <SelectItem className="text-[13px]" value="Uncompleted-first">Uncompleted first</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
