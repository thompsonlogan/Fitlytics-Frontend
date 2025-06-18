/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Column, Row } from "@tanstack/react-table"
import { MoreHorizontal, Pen, Trash, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEditWorkoutExerciseMutation } from "@/mutations/workoutMutations"
import { useQueryClient } from "@tanstack/react-query"

interface DataTableRowActionsProps<TData> {
  table: Table<TData>
  column: Column<TData>
  row: Row<TData>
}

interface InputElements {
  exerciseName?: HTMLButtonElement;
  warmupSets?: HTMLInputElement;
  workingSets?: HTMLInputElement;
  reps?: HTMLInputElement;
  weight?: HTMLInputElement;
  trainingPercent?: HTMLInputElement;
  rpe?: HTMLInputElement;
  restTime?: HTMLInputElement;
  actual?: HTMLInputElement;
}

function editRow(row: Row<any>, column: Column<any>, table: Table<any>): void {
  let selected = row.getIsSelected();

  if (selected) {
    selected = false;

    // TODO: remove this for updating the elements. Instead add valiation here and add the call to update the database with the new data here
    const inputElements: InputElements = {
      exerciseName: document.getElementById("exercise_name_input") as HTMLButtonElement,
      //warmupSets: document.getElementById("warmup_sets_input") as HTMLInputElement,
      workingSets: document.getElementById("working_sets_input") as HTMLInputElement,
      reps: document.getElementById("reps_input") as HTMLInputElement,
      weight: document.getElementById("load_input") as HTMLInputElement,
      trainingPercent: document.getElementById("percent_input") as HTMLInputElement,
      rpe: document.getElementById("rpe_input") as HTMLInputElement,
      restTime: document.getElementById("rest_time_input") as HTMLInputElement,
      actual: document.getElementById("actual_input") as HTMLInputElement,
    };

    // Update row.original values with input values
    for (const key in inputElements) {
      if (Object.prototype.hasOwnProperty.call(inputElements, key)) {
        const input = inputElements[key as keyof InputElements];
        if (input instanceof HTMLInputElement) {
          row.original[key as keyof typeof row.original] = input.value;
        }
        if (input instanceof HTMLButtonElement) {
          row.original[key as keyof typeof row.original] = input.textContent;
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
  const { mutate } = useEditWorkoutExerciseMutation();
  const queryClient = useQueryClient();

  const isSelected = row.getIsSelected()

  const handleEditRow = (row: Row<any>, column: Column<any>, table: Table<any>) => {
    let selected = row.getIsSelected();

    // TODO: also check to make sure the data actually changed
    if (selected) {
      selected = false;

      mutate(row.original, {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["program"]}); 
        },
        onError: (error) => {
          console.error('Error updating exercise:', error);
        },
      });
    } else {
      selected = true;
    }

    row.toggleSelected(selected);
  }

  const handleCancleEditRow = (row: Row<any>) => {
    row.toggleSelected()
  }
  
  return (
    isSelected ? (
      <div>
        <Button variant="ghost" size="icon" onClick={() => {handleEditRow(row, column, table)}}>
          <Check className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => {handleCancleEditRow(row)}}>
          <X className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
        </Button>
      </div>
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-5 w-8 p-0 data-[state=open]:bg-muted">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
          </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="DropdownMenuContent">
          <DropdownMenuItem className="DropdownMenuItem" onClick={() => {handleEditRow(row, column, table)}}>
              <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="DropdownMenuItem" onClick={deleteTest}>
              <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>)
  )
}