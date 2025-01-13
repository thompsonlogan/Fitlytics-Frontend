/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Column, Row } from "@tanstack/react-table"
import { MoreHorizontal, Pen, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// import './styles/actionStyle.css';

interface DataTableRowActionsProps<TData> {
  table: Table<TData>
  column: Column<TData>
  row: Row<TData>
}

interface InputElements {
  warmupSets?: HTMLInputElement;
  workingSets?: HTMLInputElement;
  reps?: HTMLInputElement;
  load?: HTMLInputElement;
  percent?: HTMLInputElement;
  rpe?: HTMLInputElement;
  restTime?: HTMLInputElement;
  actual?: HTMLInputElement;
}

function editRow(row: Row<any>, column: Column<any>, table: Table<any>): void {
  let selected = row.getIsSelected();

  if (selected) {
    selected = false;

    const inputElements: InputElements = {
      warmupSets: document.getElementById("warmup_sets_input") as HTMLInputElement,
      workingSets: document.getElementById("working_sets_input") as HTMLInputElement,
      reps: document.getElementById("reps_input") as HTMLInputElement,
      load: document.getElementById("load_input") as HTMLInputElement,
      percent: document.getElementById("percent_input") as HTMLInputElement,
      rpe: document.getElementById("rpe_input") as HTMLInputElement,
      restTime: document.getElementById("rest_time_input") as HTMLInputElement,
      actual: document.getElementById("actual_input") as HTMLInputElement,
    };

    // Update row.original values with input values
    for (const key in inputElements) {
      if (Object.prototype.hasOwnProperty.call(inputElements, key)) {
        const input = inputElements[key as keyof InputElements]; // Type assertion
        if (input instanceof HTMLInputElement) {
          row.original[key as keyof typeof row.original] = input.value;
        }
      }
    }
  } else {
    selected = true;
  }

  row.toggleSelected(selected);
}

function deleteTest(): void {
    console.log("delete test")
}

export function DataTableRowActions<TData>({
  row, column, table
}: DataTableRowActionsProps<TData>) {
  //const task = taskSchema.parse(row.original)
  
  return (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-5 w-8 p-0 data-[state=open]:bg-muted">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="DropdownMenuContent">
        <DropdownMenuItem className="DropdownMenuItem" onClick={() => {editRow(row, column, table)}}>
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="DropdownMenuItem" onClick={deleteTest}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}