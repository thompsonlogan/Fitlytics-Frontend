import { useDataApis } from "@/services/context";
import { columns, Exercise } from "./data-table/columns";
import { DataTable } from "./data-table/data-table";
import { useEffect, useState } from "react";
import { WorkoutProgramDto, ProgramWeekDto, WorkoutDto } from "@/services/generated/models";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export function Plan() {
  const { programApi } = useDataApis();
  const [programData, setProgramData] = useState<WorkoutProgramDto>();
  const [selectedWeek, setSelectedWeek] = useState<string>("");

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const requestParams = {
          programId: "83f2deca-c973-4184-94b6-0a6df5cc103f",
        };

        const res = await programApi.apiProgramGet(requestParams);
        setProgramData(res);
      } catch (exception) {
        console.error(exception);
      }
    };

    fetchProgramData();
  }, [programApi]);

  useEffect(() => {
    if (programData?.programWeeks?.length) {
      setSelectedWeek(programData.programWeeks[0].weekNumber.toString());
    }
  }, [programData]);

  const handleSelectChange = (value: string) => setSelectedWeek(value);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformData = (workoutExercises: any[]): Exercise[] => {
    return workoutExercises.map((exercise) => ({
      day: "",
      exercise: exercise.exerciseName,
      warmup_sets: 0, // Assuming no warmup_sets from API
      working_sets: exercise.sets,
      reps: exercise.reps,
      load: exercise.weight,
      percent: 0, // Assuming no percent from API
      rpe: 0, // Assuming no RPE from API
      rest_time: 0, // Assuming no rest_time from API
      actual: exercise.weight, // Assuming actual = weight
      notes: "", // Assuming no notes from API
    }));
  };

  const handleAddRow = (workoutId: string) => {
    if (programData?.programWeeks) {
      const updatedProgramData: WorkoutProgramDto = {
        ...programData,
        programWeeks: programData.programWeeks.map((week) => {
          if (week.weekNumber.toString() === selectedWeek) {
            return {
              ...week,
              workouts: week.workouts?.map((workout) => {
                if (workout.workoutId === workoutId) {
                  return {
                    ...workout,
                    workoutExercises: [
                      ...(workout.workoutExercises || []),
                      {
                        exerciseId: "empty",
                        exerciseName: "empty",
                        weight: "100",
                        sets: 2,
                        reps: 10,
                        muclesWorked: [],
                      },
                    ],
                  };
                }
                return workout;
              }) || [],
            };
          }
          return week;
        }),
      };
  
      setProgramData(updatedProgramData);
    }
  };

  const handleAddWorkout = () => {
    if (programData?.programWeeks) {
      const updatedProgramData: WorkoutProgramDto = {
        ...programData,
        programWeeks: programData.programWeeks.map((week) => {
          if (week.weekNumber.toString() === selectedWeek) {
            return {
              ...week,
              workouts: [
                ...(week.workouts || []),
                {
                  workoutId: "id", // Generate a unique ID if needed
                  name: "New Workout",
                  workoutExercises: [],
                },
              ],
            };
          }
          return week;
        }),
      };
  
      setProgramData(updatedProgramData);
    }
  };

  /*const handleRowUpdate = (updatedRow: WorkoutDto, rowIndex: number) => {
    if (programData?.programWeeks) {
      const updatedProgramData: WorkoutProgramDto = {
        ...programData,
        programWeeks: programData.programWeeks.map((week) => {
          // Find the week containing the rowIndex
          if (week.workouts && week.workouts[rowIndex]) {
            return {
              ...week,
              workouts: week.workouts.map((workout, index) => {
                // Update the specific row (workout) based on the rowIndex
                if (index === rowIndex) {
                  return {
                    ...workout,
                    ...updatedRow, // Merge the updated row data
                    workoutExercises: updatedRow.workoutExercises?.map((exercise, idx) => {
                      // Ensure exercises conform to the type
                      const existingExercise = workout.workoutExercises?.[idx];
                      return {
                        ...existingExercise,
                        ...exercise,
                      };
                    }) || [],
                  };
                }
                return workout;
              }),
            };
          }
          return week;
        }),
      };
  
      setProgramData(updatedProgramData);
    }
  };*/

  return (
    <div>
      {/* Dropdown for selecting weeks */}
      <Select value={selectedWeek} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Week" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Weeks</SelectItem>
          {programData?.programWeeks?.map((week: ProgramWeekDto) => (
            <SelectItem key={week.programWeekId} value={week.weekNumber.toString()}>
              Week {week.weekNumber}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Display selected week or all weeks */}
      <div>
        {programData && programData.programWeeks &&
          (selectedWeek === "all" ? (
            programData.programWeeks.map((week: ProgramWeekDto) => (
              <div key={week.programWeekId}>
                {week.workouts && week.workouts.map((workout: WorkoutDto) => (
                  <div key={workout.workoutId}>
                    <h3 className="pt-6 pb-2">{workout.name}</h3>
                    <DataTable
                      columns={columns} // Ensure `columns` is defined
                      data={transformData(workout.workoutExercises ?? [])}
                      onAddRow={() => handleAddRow(workout.workoutId ?? "")} 
                    />
                  </div>
                ))} 
              </div>
            ))
          ) : (
            programData.programWeeks
              .filter((week) => week.weekNumber.toString() === selectedWeek)
              .map((week: ProgramWeekDto) => (
                <div key={week.programWeekId}>
                  {week.workouts && week.workouts.map((workout: WorkoutDto) => (
                    <div key={workout.workoutId}>
                      <h3 className="pt-6 pb-2">{workout.name}</h3>
                      <DataTable
                        columns={columns} // Ensure `columns` is defined
                        data={transformData(workout.workoutExercises ?? [])}
                        onAddRow={() => handleAddRow(workout.workoutId ?? "")}
                      />
                    </div>
                  ))}
                </div>
              ))
          ))}
      </div>
      <div className="flex justify-center pt-3">
      <Button variant="ghost" size="icon" onClick={handleAddWorkout}>
        <CirclePlus />
      </Button>
      </div>
    </div>
  );
}