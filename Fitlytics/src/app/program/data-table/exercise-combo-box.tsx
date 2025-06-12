import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDataApis } from "@/services/context"
import { useEffect, useState } from "react"
import { ExerciseDto } from "@/services/generated/models"

interface ExerciseComboBoxProps {
  selected: string
  onSelect: (selectedExercise: string, exerciseId: string) => void
}

export function ExerciseComboBox(props: ExerciseComboBoxProps) {
  const { selected, onSelect } = props
  const { exerciseApi } = useDataApis();
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(selected)
  const [exercises, setExercises] = useState<ExerciseDto[]>([])

  useEffect(() => {
    const fetchExercises = async () => {
      try { 
        const res = await exerciseApi.apiExerciseExercisesGet()
        setExercises(res);
      } catch (exception) {
        console.error(exception);
      }
    };
  
    fetchExercises();
  }, [exerciseApi]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          id="exercise_name_input"
        >
          {value
            ? exercises.find((exercises) => exercises.name === value)?.name
            : "Select exercise..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search exercise..." />
          <CommandList>
            <CommandEmpty>No exercises found.</CommandEmpty>
            <CommandGroup>
              {exercises.map((exercise) => (
                <CommandItem
                  key={exercise.exerciseId}
                  value={exercise.name ?? ""}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue

                    const selectedExercise = exercises.find(
                      (exercise) => exercise.name === currentValue
                    );

                    setValue(newValue)
                    setOpen(false)
                    onSelect(newValue, selectedExercise?.exerciseId ?? "")
                  }}
                >
                  {exercise.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === exercise.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
