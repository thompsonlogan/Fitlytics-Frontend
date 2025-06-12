import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./data-table-row-actions"
import { NotesButton } from "./notes-button"
import { Input } from "@/components/ui/input"
import { ExerciseComboBox } from "./exercise-combo-box"
import { WorkoutExerciseDto } from "@/services/generated/models"

  
export const columns: ColumnDef<WorkoutExerciseDto>[] = [
  {
    accessorKey: "exercise",
    header: () => <div className="text-left">Exercise</div>,
    cell: ({row, table}) => {
      const selected = row.getIsSelected()
      if (selected) {
        return <ExerciseComboBox selected={row.original.exerciseName ?? ""} onSelect={(selectedExercise, exerciseId) => {
          const updatedRow = {
            ...row.original,
            exerciseName: selectedExercise,
            exerciseId: exerciseId
          };
          table.options.meta?.onRowUpdate(
            updatedRow,
            row.index,
            updatedRow.workoutId
          );
        }}/>
      }
      return <div className="text-left">{row.original.exerciseName}</div>
    }
  },
  {
    accessorKey: "warmup_sets",
    header: () => <div className="text-center">Warm-up Sets</div>,
    cell: ({row, table}) => {
      const selected = row.getIsSelected();
      if (selected) {
        return (
          <div className="flex justify-center items-center h-full">
            <Input type="text" id="warmup_sets_input" defaultValue={row.original.warmupSets} className="w-[5rem] h-8 text-center" onBlur={(e) => {
              const updatedRow = { ...row.original, warmupSets: Number(e.target.value) }
              table.options.meta?.onRowUpdate(updatedRow, row.index, updatedRow.workoutId);
            }}/>
          </div>
        )
      }
      return <div className="text-center">{row.original.warmupSets}</div>
    }
  },
  {
    accessorKey: "working_sets",
    header: () => <div className="text-center">Working Sets</div>,
    cell: ({row, table}) => {
      const selected = row.getIsSelected();
      if (selected) {
        return (
          <div className="flex justify-center items-center h-full">
            <Input type="text" id="working_sets_input" defaultValue={row.original.workingSets} className="w-[5rem] h-8 text-center" onBlur={(e) => {
              const updatedRow = { ...row.original, workingSets: Number(e.target.value) }
              table.options.meta?.onRowUpdate(updatedRow, row.index, updatedRow.workoutId);
            }}/>
          </div>
        )
      }
      return <div className="text-center">{row.original.workingSets}</div>
    }
  },
  {
    accessorKey: "reps",
    header: () => <div className="text-center">Reps</div>,
    cell: ({row, table}) => {
      const selected = row.getIsSelected();
      if (selected) {
        return (
          <div className="flex justify-center items-center h-full">
            <Input type="text" id="reps_input" defaultValue={row.original.reps} className="w-[5rem] h-8 text-center" onBlur={(e) => {
              const updatedRow = { ...row.original, reps: Number(e.target.value) }
              table.options.meta?.onRowUpdate(updatedRow, row.index, updatedRow.workoutId);
            }}/>
          </div>
        )
      }
      return <div className="text-center">{row.original.reps}</div>
    }
  },
  {
    accessorKey: "load",
    header: () => <div className="text-center">Load (lbs)</div>,
    cell: ({row, table}) => {
      const selected = row.getIsSelected();
      if (selected) {
        return (
          <div className="flex justify-center items-center h-full">
            <Input type="text" id="load_input" defaultValue={row.original.weight ?? ""} className="w-[5rem] h-8 text-center" onBlur={(e) => {
              const updatedRow = { ...row.original, weight: e.target.value }
              table.options.meta?.onRowUpdate(updatedRow, row.index, updatedRow.workoutId);
            }}/>
          </div>
        )
      }
      return <div className="text-center">{row.original.weight}</div>
    }
  },
  {
    accessorKey: "percent",
    header: () => <div className="text-center">% 1RM</div>,
    cell: ({row, table}) => {
      const selected = row.getIsSelected();
      const formatted = row.original.trainingPercent;//.toFixed(2)+"%"
      if (selected) {
        return (
          <div className="flex justify-center items-center h-full">
            <Input type="text" id="percent_input" defaultValue={formatted ?? 0} className="w-[5rem] h-8 text-center" onBlur={(e) => {
              const updatedRow = { ...row.original, trainingPercent: Number(e.target.value) }
              table.options.meta?.onRowUpdate(updatedRow, row.index, updatedRow.workoutId);
            }}/>
          </div>
        )
      }
      return <div className="text-center">{formatted}</div>
    }
  },
  {
    accessorKey: "rpe",
    header: () => <div className="text-center">RPE</div>,
    cell: ({row, table}) => {
      const selected = row.getIsSelected();
      if (selected) {
        return (
          <div className="flex justify-center items-center h-full">
            <Input type="text" id="rpe_input" defaultValue={row.original.rpe} className="w-[5rem] h-8 text-center" onBlur={(e) => {
              const updatedRow = { ...row.original, rpe: Number(e.target.value) }
              table.options.meta?.onRowUpdate(updatedRow, row.index, updatedRow.workoutId);
            }}/>
          </div>
        )
      }
      return <div className="text-center">{row.original.rpe}</div>
    }
  },
  {
    accessorKey: "rest_time",
    header: () => <div className="text-center">Rest Time</div>,
    cell: ({row, table}) => {
      const selected = row.getIsSelected();
      if (selected) {
        return (
          <div className="flex justify-center items-center h-full">
            <Input type="text" id="rest_time_input" defaultValue={row.original.restTime ?? ""} className="w-[5rem] h-8 text-center" onBlur={(e) => {
              const updatedRow = { ...row.original, restTime: e.target.value }
              table.options.meta?.onRowUpdate(updatedRow, row.index, updatedRow.workoutId);
            }}/>
          </div>
        )
      }
      return <div className="text-center">{row.original.restTime}</div>
    }
  },
  {
    accessorKey: "actual",
    header: () => <div className="text-center">Actual</div>,
    cell: ({row, table}) => {
      const selected = row.getIsSelected();
      if (selected) {
        return (
          <div className="flex justify-center items-center h-full">
            <Input type="text" id="actual_input" defaultValue={row.original.actualWeight ?? ""} className="w-[5rem] h-8 text-center" onBlur={(e) => {
              const updatedRow = { ...row.original, actualWeight: e.target.value }
              table.options.meta?.onRowUpdate(updatedRow, row.index, updatedRow.workoutId);
            }}/>
          </div>
        )
      }
      return <div className="text-center">{row.original.actualWeight}</div>
    }
  },
  {
    accessorKey: "notes",
    header: () => <div className="text-center">Notes</div>,
    cell: (/*{row}*/) => {
      return <div className="flex justify-center"><NotesButton/></div>/*<div className="text-left">{row.original.notes}</div>*/
    }
  },
  {
    id: "actions",
    cell: ({ table, column, row }) => {
      return <DataTableRowActions table={table} column={column} row={row} />
    }
  },
]